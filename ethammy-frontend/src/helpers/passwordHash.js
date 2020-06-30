import crypto from 'crypto-js';

export const HashPassword = (password) => {
    let hash = crypto.SHA3(password);
    return hash;
}