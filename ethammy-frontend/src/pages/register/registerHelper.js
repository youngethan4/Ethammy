import { BLANK, ACCEPTED, ERROR } from '../../constants/register';

const checkName = (name) => {
    if(name === '') return BLANK;
    else if(!/[^a-z| ]+/i.test(name)) return ACCEPTED;
    return ERROR;

}

const checkEmail = (email) => {
    if(email === '') return BLANK;
    if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return ACCEPTED;
    return ERROR;
}

const checkUsername = (username) => {
    if(username === '') return BLANK;
    else if(!/[^a-z|0-9]+/i.test(username)) return ACCEPTED;
    return ERROR;
}

const checkPassword = (password) => {
    let charTypes = false;
    let lowerCase = /[a-z]/.test(password);
    let upperCase = /[A-Z]/.test(password);
    let number = /[0-9]/.test(password);
    let special = /[!@#$%^&*.,]/.test(password);
    if(lowerCase && upperCase) charTypes = true;
    if(lowerCase && number) charTypes = true;
    if(lowerCase && special) charTypes = true;
    if(upperCase && number) charTypes = true;
    if(upperCase && special) charTypes = true;
    if(number && special) charTypes = true;

    if(password === '') return BLANK;
    else if(password.length >= 10 && !/[^a-z|0-9|!@#$%^&*,.]+/i.test(password) && charTypes) return ACCEPTED;
    return ERROR;
}

const matchPasswords = (password, confirmPassword) => {
    if(confirmPassword === '') return BLANK;
    else if (password === confirmPassword) return ACCEPTED;
    else return ERROR;
}

export default {checkName, checkEmail, checkUsername, checkPassword, matchPasswords}