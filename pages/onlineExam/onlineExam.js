// pages/onlineExam/onlineExam.js
import {
  levelExamList
} from '../../utils/api'
import {
  datetimeFormat
} from '../../utils/util'
var STATUS = {
  100001:'开始考试',
  100002:'正在考试',
  100003:'待上传作品',
  100004:'已完成',
  100005:'缺考',
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    inintPage:1,
    STATUS:STATUS
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
        var list = data.rows
        var timestamp = Date.parse(new Date());  
        console.log(data)
        list.map(item =>{
          item.difference = (parseInt(item.startTime)-300000) - parseInt(timestamp)
          item.diffTime = that.timeLong(item.startTime)
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
      url: '/pages/tipPage/tipPage?id='+id,
    })
  },
  // 时间格式化
  timeLong:function (a) {
    let timestamp = Date.parse(new Date());  
    let sdate = new Date(a);//结束时间
    let now = new Date(timestamp);//开始时间
    let endTime=sdate.getTime();//结束时间
    let startTime=now.getTime();//开始时间
    let timeDiff =endTime  - startTime;
    console.log(timeDiff)
    let hours = parseInt((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = (timeDiff % (1000 * 60)) / 1000;
    hours < 10 ? hours='0'+hours : hours; //小时格式化
    minutes < 10 ? minutes='0'+minutes : minutes; //分钟格式化
    seconds < 10 ? seconds='0'+seconds : seconds; //秒钟格式化
    let k=hours+':'+minutes+':'+seconds;
    // return k;
    if(timeDiff < 0){
      return "00:00:00";
    }
    if("0" > seconds){
        return "--"
    }else{
        return k;
    }
},

  // 未到考试时间
  notTime:function(e){
    wx.showToast({
      title: '还未到开考时间！',
      icon:'none',
      duration:1500
    })
  },

  // 点击模拟考级
  simulateExam:function(e){
    wx.navigateTo({
      url: '/pages/simulateExam/simulateExam',
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