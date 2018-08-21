//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: app.globalData.scrollPage.imgUrls,
    indicatorDots: app.globalData.scrollPage.indicatorDots,
    autoplay: app.globalData.scrollPage.autoplay,
    interval: app.globalData.scrollPage.interval,
    duration: app.globalData.scrollPage.duration,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo:false,
    userInfo: null,
    activity:[
      {image : '/images/index/news_1.jpeg'},
      {image : '/images/index/news_2.jpeg'},
      {image : '/images/index/news_3.jpeg'}
    ]
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setStorageSync('userInfo', this.data.userInfo);
          wx.setStorageSync('hasUserInfo', this.data.hasUserInfo);
          if (wx.getStorageSync('hasUserInfo')) {
            wx.showTabBar();
          }
        }
      })
    }
  },
  //点击授权登录后获取用户信息
  bindGetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync('userInfo', this.data.userInfo);
    wx.setStorageSync('hasUserInfo', this.data.hasUserInfo);
    if (wx.getStorageSync('hasUserInfo')) {
      wx.showTabBar();
    }
  }
})
