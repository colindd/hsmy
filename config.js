/**
 * 配置信息
 */

var host = "http://47.114.146.76:9000"
// var host = "http://192.168.1.178:9000"
const debug = wx.getStorageSync('debug')
if (debug) {
   var host = "http://47.114.146.76:9000"
//    var host = "http://192.168.1.178:9000"
}
module.exports = {
    host
}
