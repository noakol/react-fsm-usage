import MockAdaptor from 'axios-mock-adapter';

const METHOD_TYPE = {
    GET: 'onGet',
    POST: 'onPost',
    DELETE: 'onDelete',
    PUT: 'onPut',
    HEAD: 'onHead',
    PATCH: 'onPatch'
};

class MockService {

    constructor(config, axios, store) {
        const {services = [], delayResponse = 2000} = config;
        this.mockService = new MockAdaptor(axios, {delayResponse});
        this.store = store;
        this.services = services;
        this.setServices(services);
    }

    setServices = (services) => {
        services.forEach((service) => {
            const {methodType, methodURL, response} = service;
            if (methodType) {
                this.mockService[methodType](methodURL).reply(
                    function(config) {
                        console.log(config);
                        return response(config);

                    }
                );
            }
        });
    }
}

export default MockService;
export {
    METHOD_TYPE
};
