// pages/examDetail/examDetail.js
import{
  levelExamDetail,
  roomDetail,
  examPaperDetail,
  examStart,
  examComplete
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTip:true,
    boxOpen:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages()
    var id = options.id;
    var that = this;
    that.setData({
      examId:id,
      pageList:pages
    })
    that.getExamInfo(id)
    that.changeStatus(id)
  },
  // 进入提醒
  showEnterTip:function(){
    setTimeout(function(){
      wx.showToast({
        title: '正式进入考试！',
        icon:'none',
        duration:1500
      })
    },1200)
  },
  // 改变考试状态
  changeStatus:function(id){
    var that = this;
    examStart({
      id:id,
      success(data){
        console.log(data)
      }
    })
  },
  // 请求考试信息
  getExamInfo:function(id){
    var that = this;
    levelExamDetail({
      id:id,
      success(data){
        console.log('考试信息',data)
        var nowTime = new Date().getTime();
        var endTime = nowTime+(data.time*60*1000)
        that.setData({
          examInfo:data,
          endTime:endTime,
          timeLong:data.time,
          startTime:data.startTime
        })
        setTimeout(function(){
          that.countDown()
        },600)
        // 考场信息
        roomDetail({
          id:data.examRoomId,
          success(room){
            console.log('考场信息',room)
            var nowTime = new Date().getTime();
            if(nowTime > room.examStartTime && nowTime < room.examEndTime){
              that.showEnterTip()
            }
            that.setData({
              roomInfo:room
            })
          }
        })
        // 考题信息
        examPaperDetail({
          id:data.examPaperId,
          success(paper){
            console.log('考题信息',paper)
            that.setData({
              paperInfo:paper
            })
          }
        })
      },error(res){
        wx.showToast({
          title: res,
          icon:'none',
          duration:1500
        })
      }
      
    })
  },

  // 倒计时
  countDown:function(){
    var that=this;
    var examId = that.data.examId;
    var startTime = that.data.roomInfo.examStartTime;
    var endTime = that.data.roomInfo.examEndTime;
    var readTime = startTime - 300000
    var nowTime = new Date().getTime();//现在时间（时间戳）
    var time = (endTime-nowTime)/1000;//距离结束的毫秒数
    that.setData({
      headerLeft:'考试时间:'
    })
    if(nowTime < startTime && nowTime > readTime){
      time = (nowTime - readTime)/1000
      that.setData({
        headerLeft:'距离考试:'
      })
    }
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
        content:'考试时长:'+that.data.timeLong+'分钟',
        showCancel:false,
        success(res){
          examComplete({
            id:examId,
            success(data){
              if(data){
                wx.navigateTo({
                  url: '/pages/uploadWorks/uploadWorks?id='+examId,
                })
              }else{
                wx.showToast({
                  title: data,
                  icon:'none',
                  duration:1200
                })
              }
            }
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

  // 开关右侧学生信息
  toggleRightBox:function(){
    this.setData({
      boxOpen:!this.data.boxOpen
    })
  },

  // 点击完成考试
  doneExam:function(e){
    var that = this;
    var examId = e.currentTarget.dataset.id
    examComplete({
      id:examId,
      success(data){
        if(data){
          wx.showModal({
            title:'提示',
            content:'确定要提交考试视频？',
            confirmText:'确定交卷',
            confirmColor:'#FE657F',
            cancelText:'继续考试',
            cancelColor:'#888888',
            success(res){
              if(res.confirm){
                clearInterval(that.data.timeDown);
                wx.navigateTo({
                  url: '/pages/uploadWorks/uploadWorks?id='+examId,
                })
              }
            }
          })
        }else{
          wx.showToast({
            title: '状态出错，请联系老师',
            icon:'none',
            duration:1500
          })
        }
      },error(data){
        wx.showToast({
          title: data,
          icon:'none',
          duration:1500
        })
      }
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
    var pageList = this.data.pageList
    if(pageList.length > 2){
     wx.navigateBack({
      delta: 2
     })
    }
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