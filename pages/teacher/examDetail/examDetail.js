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
  '100004':'考试中',
  '100005':'考试结束'
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
    var teacherInfo = wx.getStorageSync('user')
    var id = options.id
    var status = options.status
    that.setData({
      teacherInfo:teacherInfo,
      examId:id
    })
    // 考试详情
    examDetail({
        id,status,
        success(data){
          data.startDate = datetimeFormat2(data.startDate)
          data.endDate = datetimeFormat2(data.endDate)
          data.createDate = datetimeFormat2(data.createDate)
          data.year = datetimeFormat3(data.createDate)
          teacherCount({
            oId:data.id,
            success(response){
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
  onShareAppMessage: function (options) {
    var that = this;
    var teacherInfo = that.data.teacherInfo
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
    　　　　title: "海上美育艺术考级平台",        
    　　　　path: '/pages/openShare/openShare?teachId='+teacherInfo.id+'&orgId='+teacherInfo.organizationId,
    　　　　imageUrl: '/images/share_show.png',  
    　　　　success: function(res){
    　　　　　　// 转发成功之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
                console.log('success')
    　　　　　　} 
    　　　　},
    　　　　fail: function(res){
    　　　　　　// 转发失败之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
    　　　　　　　　// 用户取消转发
                  console.log('cancel')
    　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
    　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
                  console.log('fail')
    　　　　　　}
    　　　　},
    　　　　complete:function(res){

          }
  　　  };
      // 来自页面内的按钮的转发
  　　if( options.from == 'button' ){
    　　　　var eData = options.target.dataset;
    　　　　// 此处可以修改 shareObj 中的内容
           shareObj.title = '全国'+eData.name+'考级上海考区'+eData.year+'年报考'
    　　　　shareObj.path = '/pages/openShare/openShare?teachId='+teacherInfo.id+'&orgId='+teacherInfo.organizationId+'&examId='+eData.id
    　　}
    　　return shareObj;
  }
  
})