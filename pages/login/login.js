// pages/login/login.js
import {
  login,
  userInfo,
  teacherInfo
} from '../../utils/api'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canClick: false,
    stuChoosed: false,
    teaChoosed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('user')
    console.log('用户信息:',userInfo)
     if(userInfo && userInfo.type == '100001'){
      wx.redirectTo({
        url: '/pages/index/index',
      })
     }
     if(userInfo && userInfo.type == '100002'){
       wx.redirectTo({
         url: '/pages/teacher/index/index',
       })
    }
  },
  // 输入用户名
  inputUserName: function (e) {
    var txt = e.detail.value;
    this.setData({
      userName: txt
    })
    this.checkInput()
  },
  // 输入密码
  inputPassword: function (e) {
    var txt = e.detail.value;
    this.setData({
      password: txt
    })
    this.checkInput()
  },
  // 检查输入情况
  checkInput: function () {
    var user = this.data.userName;
    var psd = this.data.password;
    if (user && psd) {
      this.setData({
        canClick: true
      })
    } else {
      this.setData({
        canClick: false
      })
    }
  },
  // 选择学生或老师
  chooseType: function (e) {
    var type = e.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        stuChoosed: true,
        teaChoosed: false,
        type: '100001'
      })
    } else {
      this.setData({
        stuChoosed: false,
        teaChoosed: true,
        type: '100002'
      })
    }
  },
  // 点击登录
  Login: function () {
    var that = this;
    var {
      userName,
      password,
      type
    } = that.data
    login({
      account: userName,
      password,
      type,
      success(data) {
        wx.setStorage({
          data: data,
          key: 'session_key',
        })
        setTimeout(function () {
          if (type == '100001') {
            userInfo({
              success(data) {
                app.globalData.userInfo = data
                wx.setStorageSync('user', data)
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              },
              error(res) {
                wx.showToast({
                  title: res,
                  icon:'none',
                  duration:1500
                })
              }
            })
          } else {
            teacherInfo({
              success(data) {
                app.globalData.userInfo = data
                wx.setStorageSync('user', data)
                wx.navigateTo({
                  url: '/pages/teacher/index/index',
                })
              },
              error(res) {
                wx.showToast({
                  title: res,
                  icon:'none',
                  duration:1500
                })
              }
            })
          }

        }, 500)
      },
      error(res) {
        wx.showToast({
          title: res,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  // 点击注册
  Register: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  // 点击忘记密码
  Forget: function () {
    wx.navigateTo({
      url: '/pages/forget/forget',
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