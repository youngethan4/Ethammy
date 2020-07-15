import dbCon from '../exports/dbAccess';

const login = (req) => {
    let reqBody = req.body;
    let email = reqBody.email;
    let password = reqBody.password;
    let sqlCondition = 'email = ' + email + ' AND password = ' + password;

    (new Promise(dbCon.dbSelect('Profiles', ['*'], sqlCondition)))
        .then(account => {
            if (account.length != 1) {
                var response = templateGenerator.fillResponseData('/api/auth', undefined);
                response.status = 400;
                response.error = {
                    type: 'Invalid Account Info',
                    message: 'Unable to locate the requested account with the supplied information'
                };
                return (response);
            }
            else {
                var user = templateGenerator.fillUserData(account[0]);
                var response = templateGenerator.fillResponseData('/api/auth', user);
                res.json(response);
            }
        })
        .catch(err => { return (err) });
}

const register = (req) => {
    var reqBody = req.body;
    var emailAccountCheck = dbCon.dbSelect('Profiles', ['email'], 'email = ' + reqBody.email);
    if (emailAccountCheck.length >= 0) {
        var response = templateGenerator.fillResponseData('/api/register', undefined);
        response.status = 400;
        response.error = {
            type: 'Account already registered',
            message: 'The email used has already been registered to an account.'
        };
        res.json(response);
        return;
    }

    var invalidDiscriminators = dbCon.dbSelect('Profiles', ['discriminator'], 'username = ' + reqBody.username);
    var discrim = Math.floor(Math.random() * 10000);
    do {
        discrim = (discrim + 1) % 10000
        var shouldBreak = true;
        for (var i = 0; i < invalidDiscriminators.length; i++)
            if (discrim == invalidDiscriminators[i].discriminator)
                shouldBreak = false;
        if (shouldBreak)
            break;
    } while (true);
    var values = [reqBody.email, reqBody.password, reqBody.username, discrim, reqBody.dob];
    var columns = ['email', 'password', 'username', 'discriminator', 'dob'];
    dbCon.dbInsert('Profiles', columns, values);
    var response = templateGenerator.fillResponseData('/api/register', undefined);
    response.status = 204;
    res.json(response);
}

module.exports = {
    login,
    register
}