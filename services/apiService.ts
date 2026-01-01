import { defaultError } from "@/constants";
import { getData } from "@/helpers";
import axios from "axios";
// @ts-ignore
import { Alert, Platform } from "react-native";

// doc: http://51.20.117.202:8000/docs

const service = axios.create({
  baseURL: "https://api.taxfixng.com/api",
  // timeout: 15000, // 15 seconds

  headers: {
    Accept: "*/*",
  },
});

// Add a request interceptor
service.interceptors.request.use(
  async function (config) {
    const token = await getData("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (Platform.OS === "ios") {
      config.withCredentials = false;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (config.url?.includes("/login")) {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  function (error) {
    console.log(error, "Error");

    if (error.response) {
      return Promise.reject(error.response);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error.message);
    }
    // return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // config.headers["Accept"] = "*"

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response) {
      return Promise.reject(error.response);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error.message);
    }
  }
);

export const post = async (url: any, payload: any, navigation?: any) => {
  try {
    const data = await service.post(url, payload);
    const resolvedData = await Promise.resolve(data);
    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    if (error.status === 403) {
      // setKey("token", res.data.data.token);
    } else if (error?.status === 0) {
      Alert.alert("Warning", defaultError);
    }

    return error;
  }
};

export const patch = async (url: any, payload: any) => {
  try {
    const data = await service.patch(url, payload);
    const resolvedData = await Promise.resolve(data);
    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    console.log(error);

    if (error?.status === 0) {
      Alert.alert("Warning", defaultError);
    }
    return error;
  }
};

export const put = async (url: any, payload: any) => {
  try {
    const data = await service.put(url, payload);
    const resolvedData = await Promise.resolve(data);
    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    if (error?.status === 0) {
      Alert.alert("Warning", defaultError);
    }
    return error;
  }
};

export const Delete = async (url: any, payload?: any) => {
  try {
    const data = await service.delete(url);
    const resolvedData = await Promise.resolve(data);
    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    if (error?.status === 403) {
      // navigation.replace("LoginScreen");
      // deleteKey("token");
    }
    return error;
  }
};

export const get = async (url: any, navigation?: any) => {
  try {
    const { data } = await service.get(url);
    const resolvedData = await Promise.resolve(data);
    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    if (error?.status === 403) {
      navigation.replace("Login");
    } else if (error.status === 0) {
      Alert.alert("Warning", defaultError);
    }
    return error;
  }
};
