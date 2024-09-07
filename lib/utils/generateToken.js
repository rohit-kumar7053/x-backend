import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    try {
        // Generate the JWT token
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '15d',
        });

        // Set the JWT as a cookie
        res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
            httpOnly: true, // Prevent XSS attacks
            sameSite: 'strict', // Prevent CSRF attacks
            secure: process.env.NODE_ENV !== 'development', // Only set secure flag in production
        });

    } catch (error) {
        console.error('Error generating token or setting cookie:', error);
        // Handle the error (e.g., respond with an error message or status)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
