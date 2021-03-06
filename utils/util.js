import { host } from '../config';
import dateFormat from './dateformat'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function transTime(unixtime) {
  var dateTime = new Date(parseInt(unixtime))
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  var milliseconds = now_new - dateTime;
  var timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  return timeSpanStr;
}
function transTime2(unixtime) {
  var dateTime = new Date(parseInt(unixtime))
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  var milliseconds = now_new - dateTime;
  var timeSpanStr = year + '-' + month + '-' + day ;
  return timeSpanStr;
}
function transTime3(unixtime) {
  var unixtime = unixtime*1000
  var dateTime = new Date(parseInt(unixtime))
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  var milliseconds = now_new - dateTime;
  var timeSpanStr = year + '-' + month + '-' + day ;
  return timeSpanStr;
}
// 时间格式化yyyy-mm-dd HH:MM:SS
export function datetimeFormat(unix_timestamp) {
  return dateFormat(new Date(unix_timestamp),"yyyy-mm-dd HH:MM:ss")
}
// 时间格式化yyyy-mm-dd
export function datetimeFormat2(unix_timestamp) {
  return dateFormat(new Date(unix_timestamp),"yyyy-mm-dd")
}
// 时间格式化yyyy
export function datetimeFormat3(unix_timestamp) {
  return dateFormat(new Date(unix_timestamp),"yyyy")
}
// 时间格式化yyyy-mm-dd HH:MM
export function datetimeFormat4(unix_timestamp) {
  return dateFormat(new Date(unix_timestamp),"yyyy.mm.dd HH:MM")
}
// 时间格式化HH:MM
export function datetimeFormat5(unix_timestamp) {
  return dateFormat(new Date(unix_timestamp),"HH:MM")
}


export function fetch(options) {
  var session_key = wx.getStorageSync('session_key')
  wx.request({
    url: `${host}/${options.url}`,
    data: options.data,
    method: options.method || 'POST',
    header: {
      'content-type': 'application/json',
      'Authorization':session_key
    },
    success: function (res) {
      const data = res.data
      if (data.code == '1') {
        options.success && options.success(data.data)
      } else if(data.code == '-1'){
        options.error && options.error(data.msg)
        wx.showToast({
          title: data.msg,
          icon:'none',
          duration:1200
        })
        setTimeout(function(){
          wx.clearStorage()
          wx.navigateTo({
            url: '/pages/login/login',
          },1500)
        })
      }else{
        options.error && options.error(data.msg)
      }
      options.complete && options.complete()
    }
  })
}

export function upload(options) {
  var session_key = wx.getStorageSync('session_key')
  wx.uploadFile({
    filePath: options.filePath,
    name: 'images',
    url: `${host}/${options.url}`,
    header: {
      'content-type': 'multipart/form-data;charset=utf-8',
      'Authorization':session_key
    },
    formData: {
               
    },
    success(res){
      var data = JSON.parse(res.data)
      if (data.code == '1') {
        options.success && options.success(data.data.url)
      } else {
        options.error && options.error(data.msg)
      }
      options.complete && options.complete()
    }
  })
}


module.exports = {
  formatTime: formatTime,
  fetch:fetch,
  upload:upload,
  datetimeFormat:datetimeFormat,
  datetimeFormat2:datetimeFormat2,
  datetimeFormat3:datetimeFormat3,
  datetimeFormat4:datetimeFormat4,
  datetimeFormat5:datetimeFormat5,
  transTime:transTime,
  transTime2:transTime2,
  transTime3:transTime3
}
