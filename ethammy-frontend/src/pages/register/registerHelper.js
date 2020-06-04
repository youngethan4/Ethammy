const blank = 'blank';
const error = 'error';
const accpeted = '';

export const CheckName = (name) => {
    if(name === '') return blank;
    return error;

}

export const CheckEmail = (email) => {
    if(email === '') return blank;
    if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return accpeted;
    return error;
}

export const CheckUsername = (username) => {
    if(username === '') return blank;
    return error;
}

export const CheckPassword = (password) => {
    if(password === '') return blank;
    return error;
}

export const MatchPasswords = (password, confirmPassword) => {
    if(confirmPassword === '') return blank;
    if (password === confirmPassword) return accpeted;
    else return error;
}

export const HashPassword = (password) => {
    
}