import axios from "axios";
import mockService from '../mockServices';

class serviceClass {
  constructor(config) {
    this.getMethod = this.getMethod.bind(this);
    this.request = this.request(config);
    this.config = config;
    if (config.useMocks) {
      this.mockService = new mockService(config, this.request);
    } 
  }

  request = config => {
    return axios.create({
      baseURL: config.baseUrl
    });
  };

  getMethod = (url, params) => {
    return this.request
      .get(url, params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  };

  postMethod = (url, payload) => {
    return this.request
    .post(url, payload)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error;
    })
  }
}

export default serviceClass;
