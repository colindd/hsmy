//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navList:[
      {name:'报名考级',icon:'/images/default.png',url:'/pages/login/login'},
      {name:'考生信息',icon:'/images/default.png',url:'/pages/register/register'},
      {name:'线上考级',icon:'/images/default.png',url:''},
      {name:'报名记录',icon:'/images/default.png',url:''},
      {name:'我的成绩单',icon:'/images/default.png',url:''},
      {name:'联系我们',icon:'/images/default.png',url:''},
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },

})
