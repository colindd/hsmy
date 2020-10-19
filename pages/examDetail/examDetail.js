// pages/examDetail/examDetail.js
import{
  levelExamDetail,
  roomDetail,
  examPaperDetail,
  examStart
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
    var timeDown = setInterval(function(){
      that.getExamInfo(id)
    },60000)
    that.setData({
      examId:id,
      pageList:pages,
      timeDown:timeDown
    })
    that.getExamInfo(id)
    that.changeStatus(id)
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
    var nowTime = Date.parse(new Date()); 
    var examId = that.data.examId;
    levelExamDetail({
      id:id,
      success(data){
        var showTime = data.startTime+1800000
        var endTime = data.startTime+(data.time)*60*1000
        console.log(nowTime)
        console.log(endTime)
        if(nowTime > showTime){
          that.setData({
            showBtn:true
          })
        }
        if(nowTime > endTime){
          that.setData({
            showModal:true
          })
          wx.showModal({
            title:'考试结束',
            content:'考试时长:'+data.time+'分钟',
            showCancel:false,
            success(res){
              clearInterval(that.data.timeDown);
              wx.navigateTo({
                url: '/pages/uploadWorks/uploadWorks?id='+examId,
              })
            }
          })
        }
        that.setData({
          examInfo:data,
          startTime:data.startTime
        })
        // 考场信息
        roomDetail({
          id:data.examRoomId,
          success(room){
            console.log(room)
            that.setData({
              roomInfo:room
            })
          }
        })
        // 考题信息
        examPaperDetail({
          id:data.examPaperId,
          success(paper){
            that.setData({
              paperInfo:paper
            })
          }
        })
      },error(res){
        console.log(res)
      }
      
    })
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