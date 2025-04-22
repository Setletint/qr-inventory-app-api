function sanitize(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;

    const clean = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (
            Object.prototype.hasOwnProperty.call(obj, key) &&
            !key.startsWith('$') &&
            !key.includes('.')
        ) {
            clean[key] = sanitize(obj[key]); // Recursively sanitize
        }
    }

    return clean;
}

function sanitizeMiddleware(req, res, next) {
    req.body = sanitize(req.body);
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);
    next();
}

module.exports = { sanitize, sanitizeMiddleware };