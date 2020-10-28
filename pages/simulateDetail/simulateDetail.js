// pages/simulateDetail/simulateDetail.js
import {
  datetimeFormat
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initTime:15,
    endTime:null,
    showBtn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var stuInfo = wx.getStorageSync('user')
    var that = this;
    var initTime = that.data.initTime
    var nowTime = new Date().getTime();
    var endTime = nowTime+(initTime*60*1000)
    endTime = datetimeFormat(endTime)
    that.setData({
      endTime:endTime,
      stuInfo:stuInfo
    })
    that.countDown()
    setTimeout(function(){
      wx.showToast({
        title: '正式进入考试！',
        icon:'none',
        duration:1500
      })
    },1500)
  },
  // 倒计时
    countDown:function(){
      var that=this;
      var nowTime = new Date().getTime();//现在时间（时间戳）
      var endTime = new Date(that.data.endTime).getTime();//结束时间（时间戳）
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
      that.setData({
        day: that.timeFormat(day),
        hou: that.timeFormat(hou),
        min: that.timeFormat(min),
        sec: that.timeFormat(sec)
      })
      // 每1000ms刷新一次
      if(time < 300){
        that.setData({
          showBtn:true
        })
      }
      if (time>0){
        that.setData({
          countDown: true
        })
        setTimeout(this.countDown, 1000);
      }else{
        wx.showModal({
          title:'考试结束',
          content:'考试时长:'+that.data.initTime+'分钟',
          showCancel:false,
          success(res){
            wx.navigateTo({
              url: '/pages/uploadWorks/uploadWorks?param=simu',
            })
          }
        })
        that.setData({
          countDown:false
        })
      }
    
    },
    //小于10的格式化函数（2变成02）
    timeFormat(param) {
      return param < 10 ? '0' + param : param;
    },
    //小于0的格式化函数（不会出现负数）
    timeFormin(param) {
      return param < 0 ? 0: param;
    },
  // 点击完成考试
  doneExam:function(e){
    var that = this;
    wx.showModal({
      title:'提示',
      content:'确定要提交考试视频？',
      confirmText:'确定交卷',
      confirmColor:'#FE657F',
      cancelText:'继续考试',
      cancelColor:'#888888',
      success(res){
        if(res.confirm){
          that.setData({
            countDown:false
          })
          wx.navigateTo({
            url: '/pages/uploadWorks/uploadWorks?param=simu',
          })
        }
      }
    })
  },
   // 开关右侧学生信息
   toggleRightBox:function(){
    this.setData({
      boxOpen:!this.data.boxOpen
    })
  },
 // 点击返回
 BackPage:function(){
  wx.navigateBack({
    delta: 2,
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