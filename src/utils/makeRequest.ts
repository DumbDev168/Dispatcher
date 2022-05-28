import axios, {AxiosResponse, AxiosError} from 'axios';
import {apiConfig} from '@configs/api';

const makeRequest = axios.create({
  baseURL: apiConfig.baseURLV1,
});

const handleResponseSuccess = (response: AxiosResponse) => {
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const handleResponseError = (error: AxiosError) => {
  return Promise.reject({
    data: error.response?.data,
    status: error.response?.status,
    statusText: error.response?.statusText,
  });
};

const handleResponseInterceter = () => {
  makeRequest.interceptors.response.use(
    handleResponseSuccess,
    handleResponseError,
  );
};

const setDefaultHeaderToken = (token: string) => {
  makeRequest.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeDefaultHeaderToken = () => {
  delete makeRequest.defaults.headers.common.Authorization;
};

handleResponseInterceter();

export {makeRequest, setDefaultHeaderToken, removeDefaultHeaderToken};
