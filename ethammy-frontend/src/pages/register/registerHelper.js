 export const BLANK =  'BLANK', ERROR = 'ERROR', ACCEPTED = 'ACCEPTED';

const CheckName = (name) => {
    if(name === '') return BLANK;
    else if(!/[^a-z| ]+/i.test(name)) return ACCEPTED;
    return ERROR;

}

const CheckEmail = (email) => {
    if(email === '') return BLANK;
    if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return ACCEPTED;
    return ERROR;
}

const CheckUsername = (username) => {
    if(username === '') return BLANK;
    else if(!/[^a-z|0-9]+/i.test(username)) return ACCEPTED;
    return ERROR;
}

const CheckPassword = (password) => {
    let charTypes = false;
    let lowerCase = /[a-z]/.test(password);
    let upperCase = /[A-Z]/.test(password);
    let number = /[0-9]/.test(password);
    let special = /[!@#$%^&*]/.test(password);
    if(lowerCase && upperCase) charTypes = true;
    if(lowerCase && number) charTypes = true;
    if(lowerCase && special) charTypes = true;
    if(upperCase && number) charTypes = true;
    if(upperCase && special) charTypes = true;
    if(number && special) charTypes = true;

    if(password === '') return BLANK;
    else if(password.length >= 10 && !/[^a-z|0-9|!@#$%^&*]+/i.test(password) && charTypes) return ACCEPTED;
    return ERROR;
}

const MatchPasswords = (password, confirmPassword) => {
    if(confirmPassword === '') return BLANK;
    if (password === confirmPassword) return ACCEPTED;
    else return ERROR;
}

export const HashPassword = (password) => {
    
}

export default {CheckName, CheckEmail, CheckUsername, CheckPassword, MatchPasswords}