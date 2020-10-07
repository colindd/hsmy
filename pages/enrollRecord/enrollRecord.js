// pages/enrollRecord/enrollRecord.js
import{
  orderList,
  payOrder,
  orderQuery,
  applyBack,
  cancelOrder
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
    list:[],
    initPage:1,
    STATUS:STATUS
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var initPage = that.data.initPage
    that.getOrderList(initPage)
  },
  // 获取报名记录列表
  getOrderList:function(initPage){
    var that = this;
    orderList({
      page:initPage,
      success(data){
        that.setData({
          list:data.rows
        })
      }
    })
  },
  // 返回首页
  toIndex:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  // 未支付取消报名
  cancelOrder:function(e){
    console.log('未支付')
    var that = this;
    var id = e.currentTarget.dataset.id
    var page = that.data.inintPage
    cancelOrder({
      orderId:id,
      success(res){
        that.getOrderList(page)
      }
    })
  },

  // 已支付取消报名
  applyBack:function(e){
    var that = this
    var id = e.currentTarget.dataset.id
    var page = that.data.inintPage
    wx.showModal({
      title: '取消报名须知',
      content:'考级报名在考试前X天不能进行取消报名，并需要机构审核，审核通过后即可完成取消，如因信息修改问题取消报名可联系所属报名机构。报名费用会以原路返还到您的账户，届时及时查看支付账户。',
      confirmText	:'确定取消',
      confirmColor:'#FE657F',
      success(res){
        console.log(res)
        if(res.confirm){
          applyBack({
            orderId:id,
            success(res){
              that.getOrderList(page)
            }
          })
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
    var openId = wx.getStorageSync('openId')
    payOrder({
      orderId:id,
      openId:openId,
      success(data){
        var param = JSON.parse(data)
        wx.requestPayment({
          nonceStr: param.nonceStr,
          package: param.package,
          signType:param.signType,
          paySign: param.paySign,
          timeStamp: param.timeStamp,
          success(res){
            console.log(res)
            orderQuery({
              orderId:id,
              success(response){
                console.log(response)
                wx.navigateTo({
                  url: '/pages/enrollSuccess/enrollSuccess',
                })
              },
              error(response){
                wx.showToast({
                  title: response,
                  icon:'none',
                  duration:1200
                })
              }
            })
          },
          fail(res){
            console.log(res)
          }
        })
      },error(res){
        wx.showToast({
          title: res,
          icon:'none',
          duration:1200
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