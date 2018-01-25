import axios from 'axios'
import {Loading} from 'element-ui';

let loading;
//添加一个请求拦截器
axios.interceptors.request.use(
  function (config) {
    //在请求发出之前进行一些操作
    loading=Loading.service({
      // lock:true,
      text:'数据加载中'
    });
    return config;
  },
  function (error) {
    //Do something with request error
    return Promise.reject(error);
  });
//添加一个响应拦截器
axios.interceptors.response.use(
  function (res) {
    loading.close();
    let result;
    switch (res.status) {
      case 404:
        console.log("请求成功了");
      case 500:
        console.log("服务器出错");
      case 401:
        console.log("请求成功了");
      case 200:
        if (res.data.respCode === '0000') {
          result = res.data.data;
        }
        console.log("请求成功了,请耐心等待数据", res);
    }
    //在这里对返回的数据进行处理
    return result;
  },
  function (error) {
    loading.close();
    return Promise.reject(error);
  })
export default axios
