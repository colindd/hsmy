// pages/confirmEnroll/confirmEnroll.js
import{
  studentDetail,
  professionalPrice,
  addOrder,
  payOrder,
  orderQuery
} from '../../utils/api'
import {
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
    var that = this;
    that.setData({
      studentId:options.stuid,
      pid:options.pid,
      sid:options.sid,
      id:options.id,
      paytype:options.paytype
    })
    console.log(options)
    // 学生信息
    studentDetail({
      studentId:options.stuid,
      success(data){
        data.birthday = datetimeFormat2(data.birthday)
        that.setData({
          userInfo:data
        })
      }
    })
    // 价格信息
    professionalPrice({
      professionalId:options.mid,
      subjectLevelId:options.sid,
      success(data){
        that.setData({
          price:data.price
        })
      }
    })
  },
  // 点击报名
  toAdd:function(){
    var that = this;
    var {studentId,id,pid,sid} = that.data
    addOrder({
      organizationEnrollDateId:id,professionalItemId:pid,levelId:sid,studentId:studentId,
      success(data){
        wx.navigateTo({
          url: '/pages/enrollSuccess/enrollSuccess',
        })
      },error(res){
        wx.showToast({
          title: res,
          icon:'none',
          duration:1500
        })
      }
    })
  },
  // 点击支付并报名
  toPay:function(){
    var that = this;
    var {studentId,id,pid,sid} = that.data
    var openId = wx.getStorageSync('openId')
    addOrder({
      organizationEnrollDateId:id,professionalItemId:pid,levelId:sid,studentId:studentId,
      success(data){
        payOrder({
          orderId:data,
          openId:openId,
          success(response){
            var param = JSON.parse(response)
            wx.requestPayment({
              nonceStr: param.nonceStr,
              package: param.package,
              paySign: param.paySign,
              signType:param.signType,
              timeStamp: param.timeStamp,
              success(res){
                orderQuery({
                  orderId:data,
                  success(response2){
                    console.log(response2)
                    wx.navigateTo({
                      url: '/pages/enrollSuccess/enrollSuccess',
                    })
                  },
                  error(response2){
                    wx.showToast({
                      title: response2,
                      icon:'none',
                      duration:1200
                    })
                  }
                })
              },
              fail(res){
                if(res.errMsg == 'requestPayment:fail cancel'){
                  wx.navigateTo({
                    url: '/pages/enrollRecord/enrollRecord?param=suc',
                  })
                }
              }
            })
          }
        })
      },error(res){
        wx.showToast({
          title: res,
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