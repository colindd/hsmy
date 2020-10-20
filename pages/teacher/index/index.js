// pages/teacher/index/index.js
import{
  teacherList
} from '../../../utils/api'
import{
  datetimeFormat2,
  datetimeFormat3
} from '../../../utils/util'
var STATUS = {
  '100001':'报名中',
  '100002':'报名截止',
  '100003':'等待考试',
  '100004':'考试中'
}
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[
      {id:1,name:'全部'},
      {id:2,name:'进行中'},
      {id:3,name:'已结束'},
    ],
    listData:[],
    STATUS:STATUS,
    navIdx:0,
    initPage:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var teacherInfo = wx.getStorageSync('user')
      console.log('用户信息:',teacherInfo)
      that.setData({
        teacherInfo:teacherInfo
      })
      var page = that.data.initPage
      that.getTeacherList(page)
    },
    // 获取考级列表
    getTeacherList:function(page,status){
      var that = this;
      if(!status){
        status = ''
      }
      teacherList({
        page,status,
        success(data){
          console.log('考级列表',data)
          var list = data.rows
          list.map(function(item){
            item.startDate = datetimeFormat2(item.startDate)
            item.endDate = datetimeFormat2(item.endDate)
            item.createDate = datetimeFormat2(item.createDate)
            item.year = datetimeFormat3(item.createDate)
            if(!item.count){
              item.count = 0
            }
          })
          that.setData({
            listData:list
          })
        },
        error(res){
          wx.showToast({
            title: res,
            icon:'none',
            duration:1500
          })
        }
      })
    },

  //切换导航
  changeNav:function(e){
    var idx = e.currentTarget.dataset.idx;
    this.setData({
      navIdx:idx
    })
  },
  // 点击头像
  showOut:function(){
    wx.navigateTo({
      url: '/pages/contact/contact',
    })
  },
  // 考试详情
  examDetail:function(e){
    var id = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '/pages/teacher/examDetail/examDetail?id='+id+'&status='+status,
    })
  },
  // 去分享
  toShear:function(e){
    
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