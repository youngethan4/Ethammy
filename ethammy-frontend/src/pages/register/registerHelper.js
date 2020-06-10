 export const BLANK =  'BLANK', ERROR = 'ERROR', ACCEPTED = '';

const CheckName = (name) => {
    if(name === '') return BLANK;
    return ERROR;

}

const CheckEmail = (email) => {
    if(email === '') return BLANK;
    if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return ACCEPTED;
    return ERROR;
}

const CheckUsername = (username) => {
    if(username === '') return BLANK;
    return ERROR;
}

const CheckPassword = (password) => {
    if(password === '') return BLANK;
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