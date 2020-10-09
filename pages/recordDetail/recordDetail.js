// pages/recordDetail/recordDetail.js
import{
  levelExamCard, teacherList
} from '../../utils/api'
import{
  datetimeFormat,
  datetimeFormat3
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderId = options.id
    levelExamCard({
      orderId:orderId,
      success(data){
        console.log(data)
        data.startTime = datetimeFormat(data.startTime)
        data.year = datetimeFormat3(data.startTime)
        that.setData({
          paperInfo:data
        })
      },error(res){
        wx.showToast({
          title: res,
          icon:'none',
          duration:1200
        })
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