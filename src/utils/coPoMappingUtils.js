/**
 * Utility functions for sanitizing and deduplicating CO-PO mapping rows,
 * and sorting curriculum subjects alphabetically (A-Z) by subject code across all sessions.
 */

export function sanitizeCoPoMapping(coPoMapping, outcomes, poCount = 11, psoCount = 3) {
    const normKey = (str) => String(str || '').replace(/\s+/g, '').toUpperCase();

    // 1. Build an existing values lookup map keyed by normalized CO string (e.g. 'CO1', 'CO2')
    const existingValuesMap = new Map();

    if (Array.isArray(coPoMapping)) {
        coPoMapping.forEach((row, idx) => {
            if (!row || typeof row !== 'object') return;
            const key = normKey(row.coNo) || `CO${idx + 1}`;
            const existing = existingValuesMap.get(key) || {};

            // Merge values, prioritizing valid correlation scores ('1', '2', '3') over '-' or empty
            const merged = { ...existing, ...row, coNo: row.coNo || `CO ${idx + 1}` };
            const maxPo = Math.max(poCount || 11, 11);
            for (let i = 1; i <= maxPo; i++) {
                const k = `po${i}`;
                const val = (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') ? String(row[k]).trim() : '-';
                const exVal = existing[k] !== undefined ? String(existing[k]).trim() : '-';
                merged[k] = (val !== '-' && val !== '') ? val : exVal;
            }
            const maxPso = Math.max(psoCount || 3, 3);
            for (let i = 1; i <= maxPso; i++) {
                const k = `pso${i}`;
                const val = (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') ? String(row[k]).trim() : '-';
                const exVal = existing[k] !== undefined ? String(existing[k]).trim() : '-';
                merged[k] = (val !== '-' && val !== '') ? val : exVal;
            }
            existingValuesMap.set(key, merged);
        });
    }

    // 2. Determine target CO identifiers from outcomes if available
    let targetCos = [];
    if (Array.isArray(outcomes) && outcomes.length > 0) {
        targetCos = outcomes
            .filter(co => co && (typeof co === 'string' || (co.outcome && co.outcome.trim() !== '') || co.coNo))
            .map((co, idx) => {
                const raw = typeof co === 'object' ? (co.coNo || `CO ${idx + 1}`) : `CO ${idx + 1}`;
                return String(raw).trim();
            });
    }

    // If no outcomes provided or all empty, fall back to existing unique CO keys or standard CO 1..5
    if (targetCos.length === 0) {
        if (existingValuesMap.size > 0) {
            targetCos = Array.from(existingValuesMap.values()).map((r, idx) => r.coNo || `CO ${idx + 1}`);
        } else {
            targetCos = ['CO 1', 'CO 2', 'CO 3', 'CO 4', 'CO 5'];
        }
    }

    // 3. Deduplicate targetCos by normalized key
    const seen = new Set();
    const uniqueTargetCos = [];
    targetCos.forEach((co, idx) => {
        const key = normKey(co) || `CO${idx + 1}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueTargetCos.push(co);
        }
    });

    // 4. Construct final mapped rows
    const effectivePoCount = poCount || 11;
    const effectivePsoCount = psoCount || 3;
    return uniqueTargetCos.map((coLabel, idx) => {
        const key = normKey(coLabel) || `CO${idx + 1}`;
        const found = existingValuesMap.get(key) || (Array.isArray(coPoMapping) && coPoMapping[idx] ? coPoMapping[idx] : {});
        const mapObj = { coNo: coLabel };
        for (let i = 1; i <= effectivePoCount; i++) {
            const k = `po${i}`;
            const val = found && found[k] !== undefined && found[k] !== null ? String(found[k]).trim() : '-';
            mapObj[k] = val || '-';
        }
        for (let i = 1; i <= effectivePsoCount; i++) {
            const k = `pso${i}`;
            const val = found && found[k] !== undefined && found[k] !== null ? String(found[k]).trim() : '-';
            mapObj[k] = val || '-';
        }
        return mapObj;
    });
}

/**
 * Sorts subjects alphabetically (A-Z) by their subject/course code.
 * Handles alphanumeric codes cleanly (e.g., CS3301 before CS3302, BM23101 before BM23102).
 *
 * @param {Array} subjects - Array of subject objects
 * @returns {Array} Sorted new array of subject objects
 */
export function sortSubjectsByCode(subjects) {
    if (!Array.isArray(subjects)) return [];
    return [...subjects].sort((a, b) => {
        const codeA = String(a?.code || '').trim();
        const codeB = String(b?.code || '').trim();
        return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
    });
}
