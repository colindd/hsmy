// pages/enroll/enroll.js
import{
  enrollList
} from '../../utils/api'
import {
  datetimeFormat2,
  datetimeFormat3
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
    var stuId = options.id
    var that = this;
    that.setData({
      stuId:stuId
    })
    var inintPage = that.data.inintPage
    enrollList({
      studentId:stuId,
      page:inintPage,
      success(data){
        console.log(data)
        var list = data.rows;
        list.map(item =>{
          item.endDate = datetimeFormat2(item.endDate)
          item.year = datetimeFormat3(item.endDate)
        })
        that.setData({
          list:list
        })
      }
    })
  },

  // 考级详情
  examDetail:function(e){
   const id = e.currentTarget.dataset.id;
   const pid = e.currentTarget.dataset.pid
   const stuId = this.data.stuId
   const name = e.currentTarget.dataset.name
   const paytype = e.currentTarget.dataset.paytype
   wx.navigateTo({
     url: '/pages/chooseDetail/chooseDetail?id='+id+'&stuid='+stuId+'&pid='+pid+'&pname='+name+'&paytype='+paytype,
   })
  },

  // 返回首页
  backIndex:function(){
    wx.redirectTo({
      url: '/pages/index/index',
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