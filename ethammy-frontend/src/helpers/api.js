export const APIRegister = (registrationDetails) => {
    return fetch("http://173.22.77.190:3000/api/register", {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(registrationDetails)
    })
    .then(res => res.json())
}

export const APIAuth= (credentials) => {
    return fetch("http://173.22.77.190:3000/api/auth", {
        method: 'POST',
        headers: {
        'content-type' : 'application/json'
        },
        body : JSON.stringify(credentials)
    })
    .then(res => res.json())
}