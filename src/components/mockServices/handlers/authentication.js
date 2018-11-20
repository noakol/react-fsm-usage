
const login = (req) => {
    const payload = JSON.parse(req.data);
    const {headers} = req;
    const authorisedHeader = {
        ...headers
    };
    if (payload.username === 'dummyUser' && payload.password === 'admin') {
        authorisedHeader['ERR-errorCode'] = 'securityInvalidUsernamePassword';
        authorisedHeader['ERR-errorUUID'] = '10000013';
        authorisedHeader['ERR-errorMessage'] = 'Username and password dont match';
        return [400, {}, authorisedHeader];
    }
    return [204, {username: 'validUsername', password: 'validPassword'}, authorisedHeader];
};

export default {
    login
};
