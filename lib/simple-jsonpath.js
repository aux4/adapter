// Simple JSONPath implementation for basic path queries
function value(obj, path) {
    if (!obj || !path) return undefined;
    
    // Handle simple dot notation like "$.name" or "name"
    if (path.startsWith('$.')) {
        path = path.substring(2);
    } else if (path.startsWith('$')) {
        path = path.substring(1);
    }
    
    if (!path) return obj;
    
    // Split path by dots, handling array indices
    const parts = path.split(/[.\[\]]/).filter(Boolean);
    
    let current = obj;
    for (const part of parts) {
        if (current === null || current === undefined) {
            return undefined;
        }
        
        // Handle array index
        if (/^\d+$/.test(part)) {
            current = current[parseInt(part)];
        } else {
            current = current[part];
        }
    }
    
    return current;
}

module.exports = { value };