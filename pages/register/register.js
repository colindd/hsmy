// pages/register/register.js
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
  // 点击获取验证码
  getPhoneCode:function(){
    console.log('获取验证码')
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