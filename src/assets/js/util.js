import $ from 'jquery'

const util = {}

//数据适配方法
util.dataAdapter = function (data, arr1, arr2, flag) {
  var dll = {};
  $.each(arr1, function (i, v1) {
    $.each(arr2, function (k, v2) {
      if (i === k) {
        dll[v1] = v2;
      }
    });
  });
  var str = JSON.stringify(data);
  var reg = eval('/(' + arr1.join('|') + ')/g');
  var result = str.replace(reg, function ($0, $1) {
    return dll[$1];
  });
  var last = '';
  if (flag === false) {
    last = $.extend(true, data, JSON.parse(result));
  } else {
    last = JSON.parse(result);
  }
  return last;
};
//解析表单数据为get请求参数字符串
util.parseToGet=function(data){
  let result=''
  _.keys(data).forEach(value=>{
    result+=`${value}=${data[value]}&`
  })
  return result;
};
/**
 * 获取本地字典表
 * @param name 字典名
 * @param name 字典值
 */
util.getLocalDic=function(name,code){
  return this.localDic[name][code];
};
util.getLocalDicOfList=function(name){
  var list=[];
  $.each(this.localDic[name],function(i,v){
    list.push({
      value:i,
      label:v
    })
  })
  return list;
};
/**
 *本地字典表添加
 */
util.localDic = {
  //FIXME 采购类别字典
  purchaseCategory:[
    {'1': '物资类'},
    {'2': '施工类'},
    {'3': '服务类'}
  ]
}
util.lang={
 alertSelectionNeed:"请选择您要操作的数据!",
  alertSelectionOnlyOne:"此操作只能选择1条数据!"
}
export default util;
