import Services from './services';

const login = async function(api, payload) {
  try {
    const response = await api.postMethod(Services.loginUrl, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  login
};
