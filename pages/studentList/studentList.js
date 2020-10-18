// pages/studentList/studentList.js
import{
  studentList,
  detStudent
} from '../../utils/api'
import {
  datetimeFormat2
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages()
      this.setData({
        pages:pages
      })
      this.getStudentList()
 
  },

  // 获取学生列表
  getStudentList:function(){
    var that = this;
    studentList({
      page:1,
      success(data){
        var list = data.rows
        list.map(item =>{
            item.birthday = datetimeFormat2(item.birthday)
        })
        that.setData({
          list:list
        })
      }
    })
  },
  // 添加学生
  addStudent:function(){
    wx.navigateTo({
      url: '/pages/addStudent/addStudent',
    })
  },
  // 学生详情
  stuDetail:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/stuDetail/stuDetail?id='+id,
    })
  },

  // 删除学生信息
  deleteInfo:function(e){
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.showModal({
      title:'提示',
      content:'确认删除该学生信息吗？',
      confirmColor:'#FE657F',
      success(res){
        if(res.confirm){
          detStudent({
            studentId:id,
            success(data){
              wx.showToast({
                title: '删除成功',
                icon:'success',
                duration:1500
              })
              setTimeout(function(){
                that.getStudentList()
              },1500)
            },error(res){
              wx.showToast({
                title: res,
                icon:'none',
                duration:1200
              })
            }
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
      let pages = this.data.pages
      if(pages.length > 2){
        wx.reLaunch({
          url: '/pages/index/index',
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