// pages/credentials/credentials.js
import {
  Credentials
} from '../../utils/api'
import{
  datetimeFormat2
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
    var id = options.id;
    var that = this; 
    Credentials({
      id,
      success(data){
        console.log('证书信息',data)
        data.birthday = datetimeFormat2(data.birthday)
        data.issueDate = datetimeFormat2(data.issueDate)
        data.createDate = datetimeFormat2(data.createDate)
        data.pbirthday = datetimeFormat2(data.pbirthday)
        data.pissueDate = datetimeFormat2(data.pissueDate)
        that.setData({
          info:data
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