// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canClick:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 输入用户名
  inputUserName:function(e){
    var txt = e.detail.value;
    this.setData({
      userName:txt
    })
    this.checkInput()
  },
  // 输入密码
  inputPassword:function(e){
    var txt = e.detail.value;
    this.setData({
      password:txt
    })
    this.checkInput()
  },
  // 检查输入情况
  checkInput:function(){
    var user = this.data.userName;
    var psd = this.data.password;
    if(user && psd){
      this.setData({
        canClick:true
      })
    }else{
      this.setData({
        canClick:false
      })
    }
  },
  // 点击登录
  Login:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  // 点击注册
  Register:function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
    // 点击忘记密码
    Forget:function(){
      wx.navigateTo({
        url: '/pages/forget/forget',
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