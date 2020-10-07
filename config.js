/**
 * 配置信息
 */

// var host = "http://47.114.146.76:9000"
var host = "https://api.hsmy.art/wxApi/"
// var host = "http://192.168.1.191:9000"
const debug = wx.getStorageSync('debug')
if (debug) {
// var host = "http://47.114.146.76:9000"
var host = "https://api.hsmy.art/wxApi/"
//    var host = "http://192.168.1.191:9000"
}
module.exports = {
    host
}
