// pages/chooseDetail/chooseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majorList:['书法','绘画','山水画'],
    levelList:['四级','五级','六级','七级'],
    majorIndex: 0,
    levelIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择专业
  bindMajorChange: function(e) {
    this.setData({
      majorIndex: e.detail.value
    })
  },

  // 选择级别
  bindLevelChange: function(e) {
    this.setData({
      levelIndex: e.detail.value
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