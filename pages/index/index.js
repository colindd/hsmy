//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    navList:[
      {name:'报名考级',icon:'/images/default.png',url:'/pages/chooseStu/chooseStu?param=1'},
      {name:'考生信息',icon:'/images/default.png',url:'/pages/studentList/studentList'},
      {name:'线上考级',icon:'/images/default.png',url:''},
      {name:'报名记录',icon:'/images/default.png',url:''},
      {name:'我的成绩单',icon:'/images/default.png',url:''},
      {name:'联系我们',icon:'/images/default.png',url:''},
    ]
  },

  onLoad: function () {
    var userInfo = app.globalData.userInfo
    console.log(userInfo)
  },

})
