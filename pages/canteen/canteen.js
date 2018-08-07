var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: app.globalData.scrollPage.imgUrls,
    indicatorDots: app.globalData.scrollPage.indicatorDots,
    autoplay: app.globalData.scrollPage.autoplay,
    interval: app.globalData.scrollPage.interval,
    duration: app.globalData.scrollPage.duration,

    canteenList:[
      {id:1,name:'第1食堂',image:'/images/canteen/1.png'},
      { id: 2, name: '第2食堂', image: '/images/canteen/2.png' },
      { id: 3, name: '第3食堂', image: '/images/canteen/3.png' },
      { id: 4, name: '第4食堂', image: '/images/canteen/4.png' },
      { id: 5, name: '第5食堂', image: '/images/canteen/1.png' },
      { id: 6, name: '第6食堂', image: '/images/canteen/2.png' }
    ],
    merchantList:[
      {id:1,name:'广州天河总店',isBrand:1,isShop:1,isSend:1,onTime:1,distance:1000,start:1,shipfee:1,shipfree:1,rest:0,image:'/images/canteen/5.png'},
      {id:2,name:'广州白云总店',isBrand:0,isShop:1,isSend:0,onTime:1,distance:899,start:1,shipfee:1,shipfree:1,rest:0,image:'/images/canteen/5.png'},
      {id:3,name:'广州你好总店',isBrand:1,isShop:1,isSend:1,onTime:1,distance:600,start:1,shipfee:0,shipfree:1,rest:1,image:'/images/canteen/5.png'}

    ]
  },
  goMerchant:function(){
    wx.navigateTo({
      url: '/pages/merchant/merchant'
    })
  },
  openShop: function () {
    wx.navigateTo({
      url: '/pages/shop/shop'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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