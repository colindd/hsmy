/**
 * 配置信息
 */

var host = "https://api.hsmy.art/wxApi"
// var host = "http://192.168.1.191:9000"
const debug = wx.getStorageSync('debug')
if (debug) {
var host = "https://api.hsmy.art/wxApi"
//    var host = "http://192.168.1.191:9000"
}
module.exports = {
    host
}
