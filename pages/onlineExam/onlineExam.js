// pages/onlineExam/onlineExam.js
import {
  levelExamList
} from '../../utils/api'
import {
  datetimeFormat
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    inintPage:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var page = that.data.inintPage
    that.getList(page)
  },

  // 获取考级列表
  getList:function(page){
    var that = this;
    levelExamList({
      page:page,
      success(data){
        console.log(data)
        var list = data.rows
        list.map(item =>{
          item.startTime = datetimeFormat(item.startTime)
        })
        that.setData({
          list:list
        })
      }
    })
  },

  // 点击开始考试
  examDetail:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/examDetail/examDetail?id='+id,
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