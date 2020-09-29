// pages/chooseStu/chooseStu.js
import{
  studentList
} from '../../utils/api'
import {
  datetimeFormat2
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initPage:1,
    chooseId:null,
    stuList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param = options.param
    if(param == 1){
      wx.setNavigationBarTitle({
        title: '选择考生',
      })  
    }
    var that = this;
    var initPage = that.data.initPage
    studentList({
      page:initPage,
      success(data){
        console.log(data)
        var list = data.rows
          list.map(item =>{
              item.birthday = datetimeFormat2(item.birthday)
          })
        that.setData({
          stuList:list
        })
      }
    })
  },
  // 选择学生
  chooseStu:function(e){
    var id = e.currentTarget.dataset.id;
    var chooseId = this.data.chooseId
    if(chooseId == id){
      this.setData({
        chooseId:null
      })
    }else{
      this.setData({
        chooseId:id
      })
    }
    var choosedId = this.data.chooseId
    if(choosedId){
      wx.navigateTo({
        url: '/pages/enroll/enroll?id='+choosedId,
      })
    }else{
      wx.showToast({
        title: '请选择学生',
        icon:'none',
        duration:1200
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