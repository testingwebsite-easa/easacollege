const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Client-side cache: Memory Map + SessionStorage (for instant multi-page navigations)
const memoryCache = new Map();
const inFlightRequests = new Map();

const FRESH_TTL_MS = 2 * 60 * 1000;    // 2 minutes fresh (0ms instant return)
const STALE_TTL_MS = 10 * 60 * 1000;   // 10 minutes usable while revalidating

// Determine if a request should use the client-side caching & deduplication layer
function isCacheable(urlStr, options) {
    const method = (options?.method || 'GET').toUpperCase();
    if (method !== 'GET') return false;

    // Must be an API call to our backend
    if (!urlStr.includes('/api/')) return false;

    // Skip authentication, user management, and exports
    if (
        urlStr.includes('/api/auth') ||
        urlStr.includes('/api/users') ||
        urlStr.includes('/export') ||
        urlStr.includes('/api/job-applications') ||
        urlStr.includes('/api/admissions/export')
    ) {
        return false;
    }

    // Skip if explicit cache bypass requested
    if (options?.cache === 'no-store' || options?.cache === 'reload') return false;
    if (urlStr.includes('_t=') || urlStr.includes('noCache=true')) return false;

    // Skip authenticated requests (e.g. admin actions requiring token)
    const headers = options?.headers;
    if (headers) {
        if (headers instanceof Headers && headers.has('Authorization')) return false;
        if (typeof headers === 'object' && (headers['Authorization'] || headers['authorization'])) return false;
    }

    return true;
}

// Invalidate cache for a specific resource path (e.g., '/api/departments')
export function clearApiCache(pathPrefix) {
    if (!pathPrefix) {
        memoryCache.clear();
        try {
            sessionStorage.removeItem('__easa_api_cache__');
        } catch (_) {}
        return;
    }

    for (const key of memoryCache.keys()) {
        if (key.includes(pathPrefix)) {
            memoryCache.delete(key);
        }
    }

    try {
        const raw = sessionStorage.getItem('__easa_api_cache__');
        if (raw) {
            const parsed = JSON.parse(raw);
            let modified = false;
            for (const k of Object.keys(parsed)) {
                if (k.includes(pathPrefix)) {
                    delete parsed[k];
                    modified = true;
                }
            }
            if (modified) {
                sessionStorage.setItem('__easa_api_cache__', JSON.stringify(parsed));
            }
        }
    } catch (_) {}
}

// Read cache entry from memory or sessionStorage
function getCachedEntry(cacheKey) {
    const mem = memoryCache.get(cacheKey);
    if (mem) return mem;

    try {
        const raw = sessionStorage.getItem('__easa_api_cache__');
        if (raw) {
            const parsed = JSON.parse(raw);
            const entry = parsed[cacheKey];
            if (entry && (Date.now() - entry.timestamp < STALE_TTL_MS)) {
                memoryCache.set(cacheKey, entry);
                return entry;
            }
        }
    } catch (_) {}

    return null;
}

// Save cache entry to memory and sessionStorage
function setCachedEntry(cacheKey, data) {
    const entry = {
        data,
        timestamp: Date.now()
    };
    memoryCache.set(cacheKey, entry);

    try {
        const raw = sessionStorage.getItem('__easa_api_cache__');
        const parsed = raw ? JSON.parse(raw) : {};
        parsed[cacheKey] = entry;
        sessionStorage.setItem('__easa_api_cache__', JSON.stringify(parsed));
    } catch (_) {}
}

// Create a synthetic Response instance from cached JSON data
function createCachedResponse(data) {
    return new Response(JSON.stringify(data), {
        status: 200,
        statusText: 'OK',
        headers: new Headers({
            'Content-Type': 'application/json',
            'X-EASA-Cache': 'HIT'
        })
    });
}

// Preload/prefetch an API endpoint into cache in advance
export function preloadApi(url) {
    if (typeof window === 'undefined') return;
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    fetch(fullUrl).catch(() => {});
}

// Enhanced fetch wrapper with caching, SWR, and request deduplication
export async function apiFetch(input, init) {
    const urlStr = typeof input === 'string' ? input : (input?.url || '');
    const method = (init?.method || 'GET').toUpperCase();

    // If this is a mutation (POST, PUT, DELETE, PATCH), invalidate related cache
    if (method !== 'GET' && urlStr.includes('/api/')) {
        const apiPath = urlStr.split('?')[0].replace(API_BASE_URL, '');
        const baseEndpoint = apiPath.split('/').slice(0, 3).join('/'); // e.g. /api/departments
        clearApiCache(baseEndpoint);
        return originalFetch(input, init);
    }

    // Check if eligible for client caching
    if (!isCacheable(urlStr, init)) {
        return originalFetch(input, init);
    }

    const cacheKey = urlStr;
    const cached = getCachedEntry(cacheKey);
    const now = Date.now();

    // If cached and fresh (< 2 mins), return immediately (0ms)
    if (cached && (now - cached.timestamp < FRESH_TTL_MS)) {
        return createCachedResponse(cached.data);
    }

    // Deduplicate in-flight requests (share promise across simultaneous component mounts)
    if (inFlightRequests.has(cacheKey)) {
        try {
            const data = await inFlightRequests.get(cacheKey);
            return createCachedResponse(data);
        } catch (err) {
            // In case the shared request failed, fall through to fresh fetch
        }
    }

    // If cached but slightly stale (2 - 10 mins), serve stale immediately and revalidate in background (SWR)
    if (cached && (now - cached.timestamp < STALE_TTL_MS)) {
        // Trigger background revalidation
        const bgPromise = originalFetch(input, init)
            .then(res => res.ok ? res.clone().json() : null)
            .then(freshData => {
                if (freshData) setCachedEntry(cacheKey, freshData);
            })
            .catch(() => {});
        // Return stale instantly for zero-wait UI
        return createCachedResponse(cached.data);
    }

    // Cold fetch: execute network request with deduplication
    const fetchPromise = (async () => {
        try {
            const response = await originalFetch(input, init);
            if (response.ok) {
                const clone = response.clone();
                const data = await clone.json();
                setCachedEntry(cacheKey, data);
                return data;
            }
            return null;
        } catch (err) {
            // If network fails (e.g., offline or cold start timeout), fallback to any stale cache
            if (cached) {
                return cached.data;
            }
            throw err;
        } finally {
            inFlightRequests.delete(cacheKey);
        }
    })();

    inFlightRequests.set(cacheKey, fetchPromise);

    try {
        const data = await fetchPromise;
        if (data !== null) {
            return createCachedResponse(data);
        }
        return originalFetch(input, init);
    } catch (err) {
        if (cached) {
            return createCachedResponse(cached.data);
        }
        throw err;
    }
}

// Preserve original window.fetch and seamlessly intercept calls
const originalFetch = (typeof window !== 'undefined' && window.fetch)
    ? window.fetch.bind(window)
    : fetch;

if (typeof window !== 'undefined' && !window.__easa_fetch_optimized__) {
    window.__easa_fetch_optimized__ = true;
    window.fetch = function(input, init) {
        const urlStr = typeof input === 'string' ? input : (input?.url || '');
        // Intercept calls targeting our API
        if (urlStr.includes('/api/')) {
            return apiFetch(input, init);
        }
        return originalFetch(input, init);
    };

    // Pre-warm backend dyno on load (Render spins down after idle; this wakes it up early)
    if (API_BASE_URL && API_BASE_URL.startsWith('http')) {
        setTimeout(() => {
            try {
                originalFetch(`${API_BASE_URL}/api/health`, { cache: 'no-store' }).catch(() => {});
            } catch (_) {}
        }, 80);
    }
}

export { API_BASE_URL };
export default API_BASE_URL;
