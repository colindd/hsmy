// pages/teacher/examDetail/examDetail.js
import{
  examDetail,
  teacherCount
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examDetail:null,
    STATUS:STATUS,
    teacherCount:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    var id = options.id
    var status = options.status
    examDetail({
        id,status,
        success(data){
          console.log('考级详情:',data)
          data.startDate = datetimeFormat2(data.startDate)
          data.endDate = datetimeFormat2(data.endDate)
          data.createDate = datetimeFormat2(data.createDate)
          data.year = datetimeFormat3(data.createDate)
          teacherCount({
            oId:data.organizationId,
            success(response){
              console.log('学生数量:',response)
              that.setData({
                teacherCount:response
              })
            },
            error(res){

            }
          })
          that.setData({
            examDetail:data
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

  // 学生列表
  studentList:function(){
    wx.navigateTo({
      url: '/pages/teacher/examStudents/examStudents',
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