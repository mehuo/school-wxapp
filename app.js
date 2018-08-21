//app.js
function _defineProperty(e, o, t) {
    return o in e ? Object.defineProperty(e, o, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[o] = t, e;
}

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.hideTabBar();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.setStorageSync('hasUserInfo', true);
              wx.setStorageSync('userInfo', this.globalData.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.setStorageSync('hasUserInfo', false);
        }
      }
    })
    if (wx.getStorageSync('hasUserInfo')){
      wx.showTabBar();
    }
  },
  globalData: {
    userInfo: null,
    scrollPage:{
      imgUrls: [
        '/images/index/home_1.jpeg',
        '/images/index/home_2.jpeg',
        '/images/index/home_2.jpeg',
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },

  "siteInfo": require("siteinfo.js"),
  util: require("we7/resource/js/util.js"),
  setNavigationBarColor: function(o) {
      var e = this.globalData.color;
      console.log(e, o), e && wx.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: e
      }), o.setData({
          color: e
      });
      var t = this;
      e || t.util.request({
          url: "entry/wxapp/system",
          success: function(e) {
              console.log(e);
              t.globalData.color = e.data.color;
              // t.setNavigationBarColor(o);
          }
      });
  },
  pageOnLoad: function(n) {
      var a = this;
      function i(e) {
          console.log(e);
          var o = !1, t = n.route || n.__route__ || null;
          for (var a in e.navs){
            if(e.navs[a] && e.navs[a].active){
              e.navs[a].url === "/" + t ? o = e.navs[a].active = !0 : e.navs[a].active = !1;
            }
            o && n.setData({
                _navbar: e
            });
          } 
          
      }
      console.log("----setPageNavbar----"), console.log(n);
      var l = {
          background_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
          border_color: "rgba(0,0,0,.1)"
      }, e = a.globalData.navbar;
      console.log(e),e && i(e), e || a.util.request({
          url: "entry/wxapp/nav",
          success: function(e) {
              var o = getApp().xtxx;
              if (console.log(e, o), 0 == e.data.length) {
                  if ("1" == o.model) var t = [ {
                      logo: "/zh_cjdianc/img/tabindexf.png",
                      logo2: "/zh_cjdianc/img/tabindex.png",
                      title: "首页",
                      title_color: "#34aaff",
                      title_color2: "#888",
                      url: "/zh_cjdianc/pages/index/index"
                  }, {
                      logo: "/zh_cjdianc/img/tabddf.png",
                      logo2: "/zh_cjdianc/img/tabdd.png",
                      title: "订单",
                      title_color: "#34aaff",
                      title_color2: "#888",
                      url: "/zh_cjdianc/pages/wddd/order"
                  }, {
                      logo: "/zh_cjdianc/img/tabmyf.png",
                      logo2: "/zh_cjdianc/img/tabmy.png",
                      title: "我的",
                      title_color: "#34aaff",
                      title_color2: "#888",
                      url: "/zh_cjdianc/pages/my/index"
                  } ];
                  if ("2" == o.model) t = [ {
                      logo: "/zh_cjdianc/img/tabindexf.png",
                      logo2: "/zh_cjdianc/img/tabindex.png",
                      title: "首页",
                      title_color: "#34aaff",
                      title_color2: "#888",
                      url: "/zh_cjdianc/pages/seller/index"
                  }, {
                      logo: "/zh_cjdianc/img/tabddf.png",
                      logo2: "/zh_cjdianc/img/tabdd.png",
                      title: "订单",
                      title_color: "#34aaff",
                      title_color2: "#888",
                      url: "/zh_cjdianc/pages/wddd/order"
                  }, {
                      logo: "/zh_cjdianc/img/tabmyf.png",
                      logo2: "/zh_cjdianc/img/tabmy.png",
                      title: "我的",
                      title_color: "#34aaff",
                      title_color2: "#888",
                      url: "/zh_cjdianc/pages/my/index"
                  } ];
                  if ("4" == o.model) t = [ {
                      logo: "/zh_cjdianc/img/tabindexf.png",
                      logo2: "/zh_cjdianc/img/tabindex.png",
                      title: "首页",
                      title_color: "#34aaff",
                      title_color2: "#888",
                      url: "/zh_cjdianc/pages/seller/indextakeout"
                  }, {
                      logo: "/zh_cjdianc/img/tabddf.png",
                      logo2: "/zh_cjdianc/img/tabdd.png",
                      title: "订单",
                      title_color: "#34aaff",
                      title_color2: "#888",
                      url: "/zh_cjdianc/pages/wddd/order"
                  }, {
                      logo: "/zh_cjdianc/img/tabmyf.png",
                      logo2: "/zh_cjdianc/img/tabmy.png",
                      title: "我的",
                      title_color: "#34aaff",
                      title_color2: "#888",
                      url: "/zh_cjdianc/pages/my/index"
                  } ];
                  l.navs = t, i(l), a.globalData.navbar = l;
              } else l.navs = e.data, i(l), a.globalData.navbar = l;
          }
      });
  },
  title: function(e) {
      if ("" == e) return !0;
      wx.showModal({
          title: "",
          content: e
      });
  },
  getUserInfo: function(o) {
      var t = this, e = this.globalData.userInfo;
      console.log(e), e ? "function" == typeof o && o(e) : wx.login({
          success: function(e) {
              wx.showLoading({
                  title: "正在登录",
                  mask: !0
              }), console.log(e.code), t.util.request({
                  url: "entry/wxapp/Openid",
                  cachetime: "0",
                  data: {
                      code: e.code
                  },
                  header: {
                      "content-type": "application/json"
                  },
                  dataType: "json",
                  success: function(e) {
                      console.log("openid信息", e.data), getApp().getOpenId = e.data.openid, getApp().getSK = e.data.session_key, 
                      t.util.request({
                          url: "entry/wxapp/login",
                          cachetime: "0",
                          data: {
                              openid: e.data.openid
                          },
                          header: {
                              "content-type": "application/json"
                          },
                          dataType: "json",
                          success: function(e) {
                              console.log("用户信息", e), getApp().getuniacid = e.data.uniacid, wx.setStorageSync("users", e.data), 
                              t.globalData.userInfo = e.data, "function" == typeof o && o(t.globalData.userInfo);
                          }
                      });
                  },
                  fail: function(e) {},
                  complete: function(e) {}
              });
          }
      });
  },
  convertHtmlToText: function(e) {
      var o = "" + e;
      return o = (o = o.replace(/<p.*?>/gi, "\r\n")).replace(/<\/p>/gi, "\r\n", "  *  ");
  }
})





