import validator from 'validator';
import HttpError from './errorUtils.js';

export const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9-_]+$/;
    // Checks for usernames with lengths less than 2 or greater than 20
    if (username.length < 2 || username.length > 32) {
        throw new HttpError('Invalid Username Length', 400);
    }
    // Checks that usernames are alphanumeric or the symbols "-" and "_"
    if (!regex.test(username)) {
        throw new HttpError('Invalid Characters In Username', 400);
    }
    return true;
};

export const validatePassword = (password) => {
    const regex = /^[\x21-\x7E]+$/;

    // Checks for passwords with lengths less than 8 or greater than 255
    if (password.length < 8 || password.length > 255) {
        throw new HttpError('Invalid Password Length', 400);
    }
    //  Checks that the password contains only characters within the ASCII range 33 (!) to 126 (~)
    if (!regex.test(password)) {
        throw new HttpError('Invalid Characters In Password', 400);
    }
    return true;
};

export const validateEmail = (email) => {
    // Checks for emails with lengths less than 3 or greater than 255
    if (email.length < 3 || email.length > 255) {
        throw new HttpError('Invalid Email Length', 400);
    }
    if (!validator.isEmail(email)) {
        throw new HttpError('Invalid Email Format', 400);
    }
    return true;
};
