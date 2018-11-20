import {METHOD_TYPE} from '../mockService';
import {authentication} from '../handlers';

const services = [
    {
        methodURL: '/login',
        methodType: METHOD_TYPE.POST,
        response: authentication.login
    }
];

export default services;
