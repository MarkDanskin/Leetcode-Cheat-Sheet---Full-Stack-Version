import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.sendStatus(403);
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Attach user data to the request object
        next();
    } catch (error) {
        return res.sendStatus(403);
    }
};
