// pages/chooseDetail/chooseDetail.js
import{
  pItemList,
  subItemList,
  professionalPrice
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majorList:null,
    levelList:null,
    chooseMajor:null,
    chooseLevel:null,
    majorIndex: 0,
    levelIndex:0,
    agree:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id
      var pid = options.pid
      var that = this;
      that.setData({
        id:id,
        stuId:options.stuid
      })
      // 科目列表
      pItemList({
          pid:pid,
          success(data){
            that.setData({
              majorList:data
            })
          },error(res){
            wx.showToast({
              title:res,
              icon:'none',
              duration:1500
            })
          }
      })
      // 级别列表
      subItemList({
        success(data){
          that.setData({
            levelList:data
          })
        },error(res){
          wx.showToast({
            title:res,
            icon:'none',
            duration:1500
          })
        }
      })
  },

  // 选择专业
  bindMajorChange: function(e) {
    var index = e.detail.value
    var chooseMajor = this.data.majorList[index]
    this.setData({
      chooseMajor: chooseMajor
    })
  },

  // 选择级别
  bindLevelChange: function(e) {
    var that = this;
    var index = e.detail.value
    var chooseLevel = this.data.levelList[index]
    that.setData({
      chooseLevel:chooseLevel
    })
    var professionalId = that.data.chooseMajor.pid
    var subjectLevelId = that.data.chooseLevel.id
    that.getProfessionalPrice(professionalId,subjectLevelId)
  },

  // 获取科目价格
  getProfessionalPrice:function(pid,sid){
    var that = this;
    professionalPrice({
      professionalId:pid,
      subjectLevelId:sid,
      success(data){
        that.setData({
          price:data.price
        })
      }
    })
  },

  // 点击我同意
  chooseAgree:function(e){
    var that = this;
    var agree = e.detail.value[0]
    if(agree && agree == 'agree'){
      that.setData({
        agree:true
      })
    }else{
      that.setData({
        agree:false
      })
    }
  },

  // 点击下一步
  nextStep:function(e){
    var that = this;
    var agree = that.data.agree
    var stuId = that.data.stuId
    var id = that.data.id
    var professionalId = that.data.chooseMajor.pid
    var subjectLevelId = that.data.chooseLevel.id
    if(agree){
      wx.navigateTo({
        url: '/pages/confirmEnroll/confirmEnroll?stuid='+stuId+'&pid='+professionalId+'&sid='+subjectLevelId+'&id='+id,
      })
    }else{
      wx.showToast({
        title: '请先阅读报名须知',
        icon:'none',
        duration:1500
      })
    }
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