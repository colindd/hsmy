// pages/chooseStu/chooseStu.js
import{
  studentList
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initPage:1,
    chooseId:null,
    stuList:[
      {id:1,name:'庞大开心',sex:'100001',birth:'1995-07-15',orgnazation:'上海美育机构艺术培训'},
      {id:2,name:'庞大开心',sex:'100002',birth:'1995-07-15',orgnazation:'上海美育机构艺术培训'},
      {id:3,name:'庞大开心',sex:'100001',birth:'1995-07-15',orgnazation:'上海美育机构艺术培训'},
    ]
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