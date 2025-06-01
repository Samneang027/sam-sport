// Example middleware for Express.js
function adminRequired(req, res, next) {
    if (req.user.roles.includes('ADMIN')) {
        return next();
    }
    return res.status(403).json({ error: 'Admin access required' });
}