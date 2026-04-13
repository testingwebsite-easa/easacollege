import { createContext, useContext, useState, useLayoutEffect } from 'react';

const LoaderContext = createContext();

// Global handlers that can be updated by the React component
let globalStartLoading = () => { };
let globalStopLoading = () => { };

// Safely override window.fetch immediately to catch early requests
if (typeof window !== 'undefined') {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        // Only trigger spinner if we have active listeners (i.e., App is mounted)
        // or just fire it anyway; if not mounted, no UI update happens.
        // We use a try-catch-finally block to ensure stopLoading is always called.
        globalStartLoading();
        try {
            const response = await originalFetch(...args);
            return response;
        } catch (error) {
            throw error;
        } finally {
            globalStopLoading();
        }
    };
}

export const LoaderProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);

    // Sync the global handlers with this component's state
    // We use the function body (render phase) assignment or useLayoutEffect to ensure early binding
    // However, assigning during render is a side-effect. useLayoutEffect is safer but might miss child effects?
    // Child effects run BEFORE parent layout effects.
    // So we assign these directly in the function body but guarded?
    // Actually, setting them in useLayoutEffect might be too late for child useEffects.
    // LET'S ASSIGN THEM DIRECTLY. Ideally, we should use a Ref, but these are module globals.

    // We update them on every render to ensure they capture the latest 'setLoadingCount' closure
    globalStartLoading = () => setLoadingCount(prev => prev + 1);
    globalStopLoading = () => setLoadingCount(prev => Math.max(0, prev - 1));

    // Cleanup not strictly necessary for a singleton app root, but good practice
    /* 
    // We can't really clean up module globals easily if multiple providers exist (rare),
    // but for this app it's fine.
    */

    const startLoading = () => setLoadingCount(prev => prev + 1);
    const stopLoading = () => setLoadingCount(prev => Math.max(0, prev - 1));

    return (
        <LoaderContext.Provider value={{ isLoading: loadingCount > 0, startLoading, stopLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};
