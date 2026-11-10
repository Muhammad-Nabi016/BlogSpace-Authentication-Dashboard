
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check Authorization Header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Authentication token is required."
            });
        }

        // Extract Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach User Information
        req.user = {
            id: decoded.id
        };

        next();

    } catch (error) {
    console.error("JWT Verification Error:", error.name, error.message);

    return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token."
    });
}
};

module.exports = authMiddleware;
