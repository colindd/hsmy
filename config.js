/**
 * 配置信息
 */

var host = "https://travel.shylh1d3.com/wxApi"
const debug = wx.getStorageSync('debug')
if (debug) {
   var host = "https://travel.shylh1d3.com/wxApi"
}
module.exports = {
    host
}
