const authorizeAdmin = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user || user.role !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default authorizeAdmin;
