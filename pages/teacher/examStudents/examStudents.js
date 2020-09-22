// pages/teacher/examStudents/examStudents.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sList:[
      {id:1,head:'/images/default.png',name:'刘悦',payType:1,examType:'素描四级',type:'美术',time:'2020.09.19 18:06'},
      {id:2,head:'/images/default.png',name:'刘悦',payType:2,examType:'素描四级',type:'美术',time:'2020.09.19 18:06'},
      {id:3,head:'/images/default.png',name:'刘悦',payType:1,examType:'素描四级',type:'美术',time:'2020.09.19 18:06'},
      {id:4,head:'/images/default.png',name:'刘悦',payType:2,examType:'素描四级',type:'美术',time:'2020.09.19 18:06'},
      {id:5,head:'/images/default.png',name:'刘悦',payType:1,examType:'素描四级',type:'美术',time:'2020.09.19 18:06'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击详情
  studentDetail:function(e){
    var sId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/teacher/studentDetail/studentDetail?id='+sId,
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