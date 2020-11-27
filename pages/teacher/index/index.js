// pages/teacher/index/index.js
import{
  teacherList
} from '../../../utils/api'
import{
  datetimeFormat2,
  datetimeFormat3
} from '../../../utils/util'
var QRCode = require('../../../utils/weapp-qrcode.js')
var STATUS = {
  '100001':'报名中',
  '100002':'报名截止',
  '100003':'等待考试',
  '100004':'考试中',
  '100005':'考试结束'
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
    initPage:1,
    codeShow:false,
    choosePro:''
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
    var id = e.currentTarget.dataset.id;
    var page = this.data.initPage;
    var status = ''
    if(id == 2){
      status = '100001'
    }
    if(id == 3){
      status = '100002'
    }
    this.getTeacherList(page,status)
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
  // 生成二维码
  getCode:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;choosePro
    var choosePro = e.currentTarget.dataset.name;
    that.setData({
      codeShow:true,
      choosePro:choosePro
    })
    var teacherInfo = that.data.teacherInfo
    new QRCode('myQrcode', {
      text: 'https://api.hsmy.art/exam/addStudent.html?id='+id+'&teaId='+teacherInfo.id,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  },
  // 隐藏二维码
  hiddeQrcode:function(){
    this.setData({
      codeShow:false
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
  onShareAppMessage: function (options) {
    var that = this;
    var teacherInfo = that.data.teacherInfo
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
    　　　　title: "海上美育艺术考级平台",        
    　　　　path: '/pages/openShare/openShare?teacherId='+teacherInfo.id+'&orgId='+teacherInfo.organizationId,
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
    　　　　shareObj.path = '/pages/openShare/openShare?teacherId='+teacherInfo.id+'&orgId='+teacherInfo.organizationId+'&examId='+eData.id
    　　}
    　　return shareObj;
  }
})