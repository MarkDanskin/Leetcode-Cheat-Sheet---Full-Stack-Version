import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import { generateToken } from '../utils/authUtils.js';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback',
        },
        async (profile, done) => {
            try {
                let user = await User.findOne({ where: { email: profile.emails[0].value } });

                if (!user) {
                    user = await User.create({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        password: null,
                    });
                }

                return done(null, user);
            } catch (error) {
                console.error('Error in Google Strategy:', error);
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = passport.authenticate('google', { failureRedirect: '/account/login' });

export const googleCallbackRedirect = (req, res) => {
    try {
        const token = generateToken(req.user);
        res.redirect(`http://localhost:3000?token=${token}`);
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ message: 'Error generating token' });
    }
};

export const logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
