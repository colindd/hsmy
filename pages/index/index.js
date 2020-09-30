//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    swiperSetting:{
      background: ['/images/red_banner.png', '/images/blue_banner.png'],
      indicatorDots: false,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 500,
      circular:true
    },
    navList:[
      {name:'报名考级',icon:'/images/register_icon.png',url:'/pages/chooseStu/chooseStu?param=1'},
      {name:'考生信息',icon:'/images/can _info.png',url:'/pages/studentList/studentList'},
      {name:'线上考级',icon:'/images/online_exam.png',url:'/pages/onlineExam/onlineExam'},
      {name:'报名记录',icon:'/images/reg_list.png',url:'/pages/enrollRecord/enrollRecord'},
      {name:'我的成绩单',icon:'/images/result_inquiry.png',url:'/pages/achievement/achievement'},
      {name:'联系我们',icon:'/images/contact_us.png',url:'/pages/contact/contact'},
    ]
  },

  onLoad: function () {
   
  },

})
