// pages/uploadWorks/uploadWorks.js
import {
  updateWorks,
  imgUpload
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worksUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  // 点击上传图片
  uploadImg:function(){
    console.log('upload')
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType:['camera'],
      success(res){
        if(res.errMsg == 'chooseImage:ok'){
          imgUpload({
            images:res.tempFilePaths[0],
            success(data){
              var host = 'https://hsmy2020.oss-cn-hangzhou.aliyuncs.com'
              var imgUrl = host+'/'+data
              that.setData({
                worksUrl:imgUrl
              })
            }
          })
        }
      },
      fail(res){
        wx.showToast({
          title: '上传失败',
          icon:'none',
          duration:1500
        })
      }
    })
  },

  // 点击提交作品
  uploadWorks:function(){
    var that = this;
    var id = that.data.id
    var opus = that.data.worksUrl
    updateWorks({
      id:id,
      opus:opus,
      success(data){
        if(data == true){
          wx.navigateTo({
            url: '/pages/uploadSuccess/uploadSuccess',
          })
        }
      },
      error(data){
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