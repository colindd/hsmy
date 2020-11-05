// pages/fillNum/fillNum.js
import{
  addTrackingNumber,
  examScoreAddress
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showClear:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id
    var org = options.org
    that.setData({
      initId:id,
      initOrg:org
    })
    examScoreAddress({
      organizationId:org,
      success(data){
        that.setData({
          addInfo:data
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
  // 输入
  inputNumber:function(e){
    var text = e.detail.value;
    if(text){
      this.setData({
        num:text,
        showClear:true
      })
    }else{
      this.setData({
        num:'',
        showClear:false
      })
    }
  },
  // 清除输入框
  clearInput:function(){
    this.setData({
      num:'',
      showClear:false
    })
  },
  // 点击完成
  ChangeNum:function(){
    var that = this;
    var id = that.data.initId
    var num = that.data.num
    addTrackingNumber({ 
      id, num,
      success(data){
        wx.showToast({
          title: '添加成功',
          icon:'success',
          duration:1200
        })
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; 
        prevPage.setData({
          param:'done'
        });
        setTimeout(function(){
         wx.navigateBack({
           delta: 1,
         })
        },1500)
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