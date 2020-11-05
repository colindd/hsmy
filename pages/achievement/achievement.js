// pages/achievement/achievement.js
import{
  examScoreList
} from '../../utils/api';
import {
  datetimeFormat4,
  datetimeFormat5
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    initPage:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var page = that.data.initPage;
    that.getList(page)
  },
  // 获取列表
  getList:function(page){
    var that = this;
    examScoreList({
      page,
      success(data){
        console.log(data)
        var list = data.rows;
        list.map(function(item){
          item.endTime = parseInt(item.examStartTime)+parseInt(item.examTime*60*1000)
          item.examStartTime = datetimeFormat4(item.examStartTime)
          item.endTime = datetimeFormat5(item.endTime)
        })
        that.setData({
          list:list
        })
      },error(data){
        wx.showToast({
          title: data,
          icon:'none',
          duration:1500
        })
      }
    })
  },

  // 返回首页
  backIndex:function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },

  // 成绩单详情
  achieveDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/achieveDetail/achieveDetail?id='+id,
    })
  },

  // 填写邮寄单号
  fillNumber:function(e){
    var  id = e.currentTarget.dataset.id
    var  org = e.currentTarget.dataset.org
    wx.navigateTo({
      url: '/pages/fillNum/fillNum?id='+id+'&org='+org,
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
    var param = this.data.param
    var page = this.data.initPage;
    if(param && param == 'done'){
      this.getList(page)
    }
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