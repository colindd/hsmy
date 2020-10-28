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
          item.endTime = item.startTime+(item.time*60*1000)
          item.onTime = item.startTime+(30*60*1000)
          item.readTime = item.startTime-(5*60*1000)
          item.difference = (parseInt(item.startTime)-5*60*1000) - parseInt(timestamp)
          item.diffTime = that.timeLong(item.startTime)
          item.startTime = datetimeFormat(item.startTime)
          if(timestamp < item.readTime){
            item.status = 'wait'
          }
          if(timestamp > item.readTime){
            item.status = 'open'
          }
          if(timestamp > item.startTime){
            item.status = 'opened'
          }
          if(timestamp > item.onTime){
            item.status = 'dont'
          }
          if(timestamp > item.endTime){
            item.status = 'over'
          }
        
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
    // 倒计时
    countDown:function(endTimeLong){
      var that=this;
      var nowTime = new Date().getTime();//现在时间（时间戳）
      var endTime = new Date(endTimeLong).getTime();//结束时间（时间戳）
      var time = (endTime-nowTime)/1000;//距离结束的毫秒数
      // 获取天、时、分、秒
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
      day = that.timeFormin(day),
      hou = that.timeFormin(hou),
      min = that.timeFormin(min),
      sec = that.timeFormin(sec)
      // 每1000ms刷新一次
      if (time>0){
        that.setData({
          countDown: true
        })
        setTimeout(this.countDown, 1000);
      }else{
        that.setData({
          countDown:false
        })
      }
      
      return  hou+':'+min+':'+sec
    },
    //小于10的格式化函数（2变成02）
    timeFormat(param) {
      return param < 10 ? '0' + param : param;
    },
    //小于0的格式化函数（不会出现负数）
    timeFormin(param) {
      return param < 0 ? 0: param;
    },
  // 暂未开始
  examWait:function(){
    wx.showToast({
      title: '请耐心等待',
      icon:'none',
      duration:1500
    })
  },
  // 开考三十分钟之后点击
  examDont:function(){
    wx.showModal({
      title:'提示',
      content:'考试已经开始，考生不得再进入考场',
      showCancel:false,
      success(res){
        console.log(res)
      }
    })
  },
  // 考试已结束
  examOver:function(){
    wx.showToast({
      title: '该场考试已结束',
      icon:'none',
      duration:1500
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
    // wx.showToast({
    //   title: '暂未开放',
    //   icon:'none',
    //   duration:1500
    // })
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