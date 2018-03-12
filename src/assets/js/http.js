import axios from 'axios'
import {Loading} from 'element-ui';
import qs from 'qs'

let loading;
axios.defaults.timeout = 1000 * 15
//添加一个请求拦截器
axios.interceptors.request.use(
  function (config) {
    // console.log(config.url)
    //在请求发出之前进行一些操作
    loading=Loading.service({
      // lock:true,
      text:'数据加载中'
    });
    if (config.method=="post"){
      config.data = qs.stringify(config.data);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  },
  function (error) {
    //Do something with request error
    $alert(error);
    return Promise.reject(error);
  });
//添加一个响应拦截器
axios.interceptors.response.use(
  function (res) {
    loading.close();
    let result=undefined;
    switch (res.status) {
      case 404:
        $alert("404（未找到） 服务器找不到请求的网页");
      case 500:
        $alert("500（服务器内部错误）  服务器遇到错误，无法完成请求。");
      case 400:
        $alert(" 400（错误请求） 服务器不理解请求的语法。");
      case 401:
        $alert(" 401（身份验证错误） 此页要求授权。");
      case 200:
        console.log("请求成功了,请耐心等待数据", res);
        if (res.data.respCode === '0000') {
          result = res.data.data;
        }else{
          $alert(res.data.respDesc,'错误');
        }
    }
    //在这里对返回的数据进行处理
    if(result){
      return result;
    }
    return Promise.reject('');
  },
  function (error) {
    loading.close();
    return Promise.reject(error);
  })
export default axios
