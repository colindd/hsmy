// pages/addStudent/addStudent.js
import{
  sysDeptList,
  chooseNationList,
  chooseCountriesList,
  imgUpload
} from '../../utils/api'

const date = new Date();
const years = [];
const months = [];
const days = [];
//获取年
for (let i = 1920; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    time: '',
    multiArray: [years, months, days],
    multiIndex: [100, 9, 16],
    choose_year: '',
    organization:'',
    nation:'',
    country:'',
    headUrl:'/images/default.png',
    orgList:[],
    NationList:[],
    CountriesList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      //设置默认的年份
      that.setData({
        choose_year: that.data.multiArray[0][0]
      })
      // 机构列表
      sysDeptList({
        success(data){
          // console.log('机构列表:',data)
          that.setData({
            orgList:data
          })
        }
      })
      // 民族列表
      chooseNationList({
        success(data){
          // console.log('民族列表:',data)
          that.setData({
            NationList:data
          })
        }
      })
      // 国家列表
      chooseCountriesList({
        success(data){
          // console.log('国家列表:',data)
          that.setData({
            CountriesList:data
          })
        }
      })
  },
  // 上传照片
  uploadImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res){
        console.log(res)
        if(res.errMsg == 'chooseImage:ok'){
          // imgUpload({
          //   images:res.tempFilePaths[0],
          //   success(data){
          //     console.log(data)
          //     that.setData({
          //       headUrl:res.tempFilePaths[0]
          //     })
          //   }
          // })
        }
      }
    })
  },

  //获取时间日期
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    this.setData({
      time: year + '-' + month + '-' + day
    })
  },
  //监听时间picker的滚动事件
  bindMultiPickerColumnChange: function(e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      this.setData({
        choose_year
      })
    }
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  // 选择性别
  selectSex:function(e){
    var sex = e.detail.value
    this.setData({
      sex:sex
    })
  },

   // 选择国家
   chooseCountry:function(e){
    var index = e.detail.value
    var country = this.data.CountriesList[index]
    this.setData({
      country: country
    })
  },
   // 选择民族
   chooseNation:function(e){
    var index = e.detail.value
    var nation = this.data.NationList[index]
    this.setData({
      nation: nation
    })
  },
  // 选择机构
  chooseOrganization:function(e){
    var index = e.detail.value
    var organization = this.data.orgList[index]
    this.setData({
      organization: organization
    })
  },

  // 添加学生
  addStudent:function(){

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