import axios from "axios";
import { stringify } from "querystring";

const DEFAULT_OPTIONS = {
  params: {},
  pathParams: {},
  body: {},
};

const handleParameter = (url, options = DEFAULT_OPTIONS) => {
  const { params, pathParams, body } = options;
  if (params) {
    url += "?" + stringify(params);
  }
  if (pathParams) {
    Object.keys(pathParams).forEach((k) => {
      url = url.replace(":" + k, pathParams[k]);
    });
  }
  if (body) {
    var response = [url, body];
    return response;
  }
  return url;
};
export const api = {
  /**
   *
   * @param {*} url
   * @param {*} options
   * @returns
   */
  async get(url, options) {
    var completedUrl = handleParameter(url, options);
    try {
      const response = await axios.get(completedUrl);
      return response;
    } catch (error) {
      return error;
    }
  },
  async post(url, options) {
    var [completedUrl, params] = handleParameter(url, options);
    try {
      const response = await axios.post(completedUrl, params);
      return response;
    } catch (error) {
      return error;
    }
  },
  async delete(url, options) {
    try {
      var completedUrl = handleParameter(url, options);
      const response = await axios.delete(completedUrl);
      return response;
    } catch (error) {
      alert("Network error refresh and check your network connection");
      return false;
    }
  },
  async put(url, options) {
    var [completedUrl, params] = handleParameter(url, options);
    try {
      const response = await axios.put(completedUrl, params);
      return response;
    } catch (error) {
      alert("Network error refresh and check your network connection");
      return false;
    }
  },
};
