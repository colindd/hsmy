// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {id:1,name:'全国美术书法考级上海考区2020年报考',org:'上海市海上美育艺术培训机构',endtime:'2020-10-08 24:00',paytype:'100001',status:'100001'},
      {id:2,name:'全国美术书法考级上海考区2020年报考',org:'上海市海上美育艺术培训机构',endtime:'2020-10-08 24:00',paytype:'100002',status:'100002'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 考级详情
  examDetail:function(e){
   const id = e.currentTarget.dataset.id;
   wx.navigateTo({
     url: '/pages/chooseDetail/chooseDetail?id='+id,
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