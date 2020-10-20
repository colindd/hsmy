// pages/stuDetail/stuDetail.js
import{
  studentDetail
} from '../../utils/api'
import {datetimeFormat2} from '../../utils/util';
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
    var studentId = options.id;
    var that = this;
    that.setData({
      studentId:studentId
    })
    that.getStudentInfo(studentId)
  },

  // 学生信息详情
  getStudentInfo:function(id){
    var that = this;
    studentDetail({
      studentId:id,
      success(data){
        data.birthday = datetimeFormat2(data.birthday)
        var countryName = 'country.name'
        var nationName = 'nation.name'
        var orgName = 'organization.name'
        var orgId = 'organization.deptId'
        that.setData({
          userInfo:data,
          headUrl:data.avatar,
          name:data.name,
          alphabet:data.alphabet,
          sex:data.sex,
          time:data.birthday,
          [countryName]:data.nationality,
          [nationName]:data.nation,
          idCard:data.idCard,
          [orgName]:data.organizationName,
          [orgId]:data.organizationId,
          contacts:data.contacts,
          urgentMobile:data.urgentMobile,
          address:data.address
        })
        console.log(data)
      }
    })
  },

  // 点击修改信息
  changeInfo:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/addStudent/addStudent?id='+id,
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