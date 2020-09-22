// pages/register/register.js
import {
  getCode,
  sendRegSms,
  register
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeTxt:'获取验证码',
    hidePsd:true,
    showClear:false
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
  showClear:function(e){
    var val = e.detail.value;
    if(val){
      this.setData({
        showClear:true
      })
    }else{
      this.setData({
        showClear:false
      })
    }
    this.setData({
      mobile:val
    })
  },
  // 点击清除
  clearInput:function(){

  },

  // 显示/隐藏密码
  ToggleShow:function(){
    this.setData({
      hidePsd:!this.data.hidePsd
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
  inputPhoneCode:function(e){
    var val = e.detail.value;
    this.setData({
      phoneCode:val
    })
  },

    // 点击切换图片验证码
    changeCodeImg:function(){
      var that = this;
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
    // 输入密码
    inputPsw:function(e){
      var val = e.detail.value;
      this.setData({
        psw:val
      })
    },

  // 点击获取短信验证码
  getPhoneCode:function(){
    var that = this;
    var mobile = that.data.mobile
    var code = that.data.code
    var uuid = that.data.uuid
    sendRegSms({
       mobile,code,uuid,
       success(data){
         console.log(data)
       },
       error(res){
         console.log(res)
       }
    })
  },
  // 点击使用条款
  showRule:function(){
    wx.navigateTo({
      url: '/pages/rule/rule',
    })
  },

  // 点击去登录
  toLogin:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  // 点击注册
  toReg:function(){
    var that = this;
    var mobile = that.data.mobile
    var psw = that.data.psw
    var code = that.data.phoneCode
    register({
      account:mobile,password:psw,code,
      success(data){
        console.log(data)
        if(data.code == 1){
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      },
      error(res){
        console.log(res)
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