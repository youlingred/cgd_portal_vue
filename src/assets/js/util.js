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
export default util;
