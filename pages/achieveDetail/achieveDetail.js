// pages/achieveDetail/achieveDetail.js
import{
  examScoreInfo,
  examScoreUpdate,
  Credentials
} from '../../utils/api'

var LEVEL = {
  '1':'一级',
  '2':'二级',
  '3':'三级',
  '4':'四级',
  '5':'五级',
  '6':'六级',
  '7':'七级',
  '8':'八级',
  '9':'九级',
  '10':'十级'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    examScoreInfo:null,
    LEVEL:LEVEL,
    openExpress:false,
    startChange:false,
    showClear1:false,
    showClear2:false,
    showClear3:false,
    disabled:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    console.log(id)
    var that = this;
    examScoreInfo({
      id:id,
      success(data){
        console.log(data)
        data.scoreStatus = '100001'
        that.setData({
          examScoreInfo:data,
          initId:data.id,
          initName:data.name,
          initMobile:data.mobile,
          initAddress:data.address,
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
  // 点击编辑
  startChange:function(){
    this.setData({
      startChange:true,
      showClear1:true,
      showClear2:true,
      showClear3:true,
      disabled:false
    })
  },
  // 清除操作
  clearInput1:function(){
    this.setData({
      initName:'',
      showClear1:false
    })
  },
  clearInput2:function(){
    this.setData({
      initMobile:'',
      showClear2:false
    })
  },
  clearInput3:function(){
    this.setData({
      initAddress:'',
      showClear3:false
    })
  },

  // 打开、关闭邮寄信息
  ToggleExpress:function(){
    this.setData({
      openExpress:!this.data.openExpress
    })
  },

  // 修改姓名
  changeName:function(e){
    var txt = e.detail.value
    if(txt){
      this.setData({
        initName:txt,
        showClear1:true
      })
    }else{
      this.setData({
        initName:'',
        showClear1:false
      })
    }
  },
  // 修改电话
  changeMobile:function(e){
    var txt = e.detail.value
    if(txt){
      this.setData({
        initMobile:txt,
        showClear2:true
      })
    }else{
      this.setData({
        initMobile:'',
        showClear2:false
      })
    }
  },
  // 修改地址
  changeAddress:function(e){
    var txt = e.detail.value
    if(txt){
      this.setData({
        initAddress:txt,
        showClear3:true
      })
    }else{
      this.setData({
        initAddress:'',
        showClear3:false
      })
    }
  },

  // 修改邮寄信息
  changeInfo:function(){
    var that = this;
    var {initId,initName,initMobile,initAddress,openExpress} = that.data
    if(openExpress){
      var status = '100001'
    }
    if(openExpress == false){
      var status = '100002'
    }
    examScoreUpdate({
      id:initId,name:initName,mobile:initMobile,address:initAddress,status,
      success(data){
        console.log(data)
       wx.showToast({
         title: '修改成功',
         icon:'success',
         duration:1500
       })
       that.setData({
        disabled:true,
        startChange:false,
        showClear1:false,
        showClear2:false,
        showClear3:false,
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

  // 查看证书
  showCertificate:function(e){
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/credentials/credentials?id='+id
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