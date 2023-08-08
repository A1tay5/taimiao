import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { showToast } from 'vant';
import { AES_Encrypt, AES_Decrypt } from '@/utils/aes'
function extractSubstring(str) {
  const regex = /^.*\}/;
  const result = str.match(regex);
  return result ? result[0] : '';
}
const service: AxiosInstance = axios.create({
  withCredentials: false,
  baseURL: 'http://testapi.mliveh5.com',
  // baseURL: '/api',
  timeout: 10000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers[ 'Content-Type']='application/x-www-form-urlencoded'
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res:any = response.data;
    
    if (res.data) {
      try{
        const data:any =  JSON.parse(res.data)
        return data
       }catch (error){
        if (typeof res.data === "string") {
          const String:any=AES_Decrypt(res.data)
          try{
            const data:any=JSON.parse(String)
            if (typeof data === "string") {
              const a=JSON.parse(data)
              return a
            }
            return data
    
          }catch (error){
            console.log(String);

            const extractedString = extractSubstring(String);
            console.log(extractedString);
            
            const data:any=JSON.parse(extractedString)
            console.log(data);

            return data 
          }
        }else{
          console.log(res.data);
          
          return res.data
        }
         
       }
    }else{
      return res
    }
   
    // if (res.code !== 200) {
    //   showToast(res.msg);
    //   return Promise.reject(res.msg || 'Error');
    // } else {
      // return res;
    // }
  },
  (error: AxiosError) => {
    console.log('err' + error);
    showToast(error.message);
    return Promise.reject(error.message);
  },
);

export default service;
