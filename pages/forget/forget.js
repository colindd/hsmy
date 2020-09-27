// pages/forget/forget.js
import{
  getCode,
  resetPwd,
  sendResetPwdSms
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeTxt: '获取验证码',
    hidePsd: true,
    mobile: '',
    showClear: false,
    snsMsgWait: 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =  this;
    getCode({
      success(data){
        var base64Image = data.img
        that.setData({
          uuid:data.uuid,
          imgData:base64Image
        })
      }
    })
  },

  // 输入后显示清除
  showClear: function (e) {
    var val = e.detail.value;
    if (val) {
      this.setData({
        mobile: val,
        showClear: true
      })
    } else {
      this.setData({
        mobile: '',
        showClear: false
      })
    }
  },
  // 点击清除
  clearInput: function () {
    this.setData({
      mobile: '',
      showClear: false
    })
  },
  // 显示/隐藏密码
  ToggleShow: function () {
    this.setData({
      hidePsd: !this.data.hidePsd
    })
  },
  // 输入图形验证码
  inputCode:function(e){
    var val = e.detail.value;
    this.setData({
      code:val
    })
  },
  // 输入手机验证码
  inputPhoneCode: function (e) {
    var val = e.detail.value;
    this.setData({
      phoneCode: val
    })
  },
  // 输入密码
  inputPsw: function (e) {
    var val = e.detail.value;
    this.setData({
      psw: val
    })
  },

  // 点击获取短信验证码
  getPhoneCode: function () {
    var that = this;
    var mobile = that.data.mobile
    var code = that.data.code
    var uuid = that.data.uuid
    sendResetPwdSms({
      mobile,
      code,
      uuid,
      success(data) {
        console.log(data)
        // 60秒后重新获取验证码
        var inter = setInterval(function () {
          that.setData({
            codeTxt: '(' + that.data.snsMsgWait + 's)后重发',
            snsMsgWait: that.data.snsMsgWait - 1
          });
          if (that.data.snsMsgWait < 0) {
            clearInterval(inter)
            that.setData({
              codeTxt: '获取验证码',
              snsMsgWait: 60
            });
          }
        }.bind(this), 1000);
      },
      error(res) {
        console.log(res)
      }
    })
  },

  // 点击完成
  ChangePsw: function () {
    var account = that.data.mobile
    var code = that.data.phoneCode
    var password = that.data.psw
    resetPwd({
      account,code,password,
      success(data){
        console.log(data)
      },
      error(res){
        wx.showToast({
          title: res,
          icon:'none',
          duration:1200
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})