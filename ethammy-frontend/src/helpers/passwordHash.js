import crypto from 'crypto-js';

export const hashPassword = (password) => {
    let hash = crypto.SHA3(password);
    return hash;
}