// pages/enrollRecord/enrollRecord.js
import{
  orderList
} from '../../utils/api'
var STATUS = {
  '100001':'等待支付',
  '100002':'支付成功',
  '100003':'已完成',
  '100004':'已取消',
  '100005':'已退款'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {id:1,title:'素描专业四级考试(美术)',name:'庞大开心',form:'视频考试',status:'100001'},
      {id:1,title:'素描专业四级考试(美术)',name:'庞大开心',form:'视频考试',status:'100002'},
      {id:1,title:'素描专业四级考试(美术)',name:'庞大开心',form:'视频考试',status:'100003'},
    ],
    initPage:1,
    STATUS:STATUS
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var initPage = that.data.initPage
    orderList({
      page:initPage,
      success(data){
        console.log(data)
      }
    })

  },
  // 返回首页
  toIndex:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  // 取消报名
  cancelEnroll:function(e){
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '取消报名须知',
      content:'考级报名在考试前X天不能进行取消报名，并需要机构审核，审核通过后即可完成取消，如因信息修改问题取消报名可联系所属报名机构。报名费用会以原路返还到您的账户，届时及时查看支付账户。',
      confirmText	:'确定取消',
      confirmColor:'#FE657F',
      success(res){
        console.log(res)
        if(res.confirm){

        }
      }
    })
  },

  // 报名详情
  recordDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/recordDetail/recordDetail?id='+id,
    })
  },

  // 立即支付
  toPay:function(e){
    var id = e.currentTarget.dataset.id;
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