// pages/teacher/index/index.js
var STATUS = {
  '1':'报名中',
  '2':'报名截止',
  '3':'已结束'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[
      {id:1,name:'全部'},
      {id:2,name:'进行中'},
      {id:3,name:'已结束'},
    ],
    listData:[
      {id:1,name:'全国美术书法考级上海考区2020年报考',deadline:'2020-10-08',examtime:'2020-10-08 15:00-16:00',number:'78',status:1,releaseTime:'2020-09-20'},
      {id:1,name:'全国美术书法考级上海考区2020年报考',deadline:'2020-10-08',examtime:'2020-10-08 15:00-16:00',number:'78',status:2,releaseTime:'2020-09-20'},
      {id:1,name:'全国美术书法考级上海考区2020年报考',deadline:'2020-10-08',examtime:'2020-10-08 15:00-16:00',number:'78',status:3,releaseTime:'2020-09-20'},
    ],
    STATUS:STATUS,
    navIdx:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //切换导航
  changeNav:function(e){
    var idx = e.currentTarget.dataset.idx;
    this.setData({
      navIdx:idx
    })
  },
  // 考试详情
  examDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/teacher/examDetail/examDetail?id='+id,
    })
  },
  // 去分享
  toShear:function(e){
    
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