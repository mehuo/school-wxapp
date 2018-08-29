var a = getApp();

Page({
    data: {
        carte: [ {
            img1: "/images/canteen/img/personal/kefu.png",
            name: "客服与投诉",
            img2: "",
            margin: "margin_top",
            border: "border_bottom",
            bindtap: "customer"
        }, {
            img1: "/images/canteen/personal/bangzhu.png",
            name: "帮助中心",
            img2: "",
            border: "border_bottom",
            bindtap: "help"
        } ],
        top: "-420"
    },
    wddd: function() {
        wx.navigateTo({
            url: "../wddd/order"
        });
    },
    //到收获地址
    wddz: function() {
        wx.navigateTo({
            url: "/pages/address/address"
        });
    },
    //到我的预约页面
    wdyy: function() {
        wx.navigateTo({
            url: "/pages/reserve/order"
        });
    },
    //到我的优惠卷
    wdyhq: function() {
        wx.navigateTo({
            url: "myyhq"
        });
    },
    //跳转到我的订单
    toMyOrder: function(){
        wx.navigateTo({
            url: "/pages/order/order"
        });
    },
    help: function() {
        wx.navigateTo({
            url: "bzzx"
        });
    },
    bindGetUserInfo: function(e) {
        console.log(e), "getUserInfo:ok" == e.detail.errMsg && (this.setData({
            hydl: !1
        }), this.changeData());
    },
    changeData: function() {
        var n = this;
        wx.getSetting({
            success: function(e) {
                console.log(e), e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(e) {
                        console.log(e), a.util.request({
                            url: "entry/wxapp/login",
                            cachetime: "0",
                            data: {
                                openid: getApp().getOpenId,
                                img: e.userInfo.avatarUrl,
                                name: e.userInfo.nickName
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            dataType: "json",
                            success: function(e) {
                                console.log("用户信息", e);
                            }
                        });
                        var t = e.userInfo;
                        console.log(t), n.setData({
                            avatarUrl: t.avatarUrl,
                            nickName: t.nickName
                        });
                    }
                }) : (console.log("未授权过"), n.setData({
                    hydl: !0
                }));
            }
        });
    },
    onLoad: function(e) {
        a.setNavigationBarColor(this), a.pageOnLoad(this), this.changeData();
        var t = this, n = wx.getStorageSync("users").id;
        console.log(n), a.util.request({
            url: "entry/wxapp/MyCoupons",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(e) {
                console.log(e.data), t.setData({
                    yhnum: e.data.length
                });
            }
        }), a.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(e) {
                t.setData({
                    system: e.data
                });
            }
        }), wx.getSystemInfo({
            success: function(e) {
                console.log(e.model), console.log(e.pixelRatio), console.log(e.windowWidth), console.log(e.windowHeight), 
                console.log(e.language), console.log(e.version), console.log(e.platform), "android" != e.platform && t.setData({
                    top: "-330"
                });
            }
        });
    },
    feedback: function(e) {
        wx.navigateTo({
            url: "feedback"
        });
    },
    recharge: function(e) {
        wx.navigateTo({
            url: "recharge"
        });
    },
    set_up: function(e) {
        wx.navigateTo({
            url: "set_up"
        });
    },
    receive: function(e) {
        wx.navigateTo({
            url: "receive"
        });
    },
    //到积分页面-页面暂无实现
    integral: function(e) {
        // wx.navigateTo({
        //     url: "integral"
        // });
    },
    sign_in: function(e) {
        wx.navigateTo({
            url: "rankings"
        });
    },
    //合作加盟
    sjrz: function(e) {
        var t = wx.getStorageSync("users").id;
        a.util.request({
            url: "entry/wxapp/CheckRz",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(e) {
                console.log(e.data), 0 != e.data ? 1 == e.data.state ? wx.showModal({
                    title: "",
                    content: "系统正在审核中"
                }) : 2 == e.data.state ? wx.showModal({
                    title: "",
                    content: "您已经入驻过了"
                }) : 3 == e.data.state ? wx.showModal({
                    title: "",
                    content: "您的入驻申请已被拒绝，点击确定进行编辑",
                    success: function(e) {
                        e.confirm && wx.navigateTo({
                            url: "../ruzhu/index?state=3"
                        });
                    }
                }) : wx.showModal({
                    title: "",
                    content: "您的入驻已经到期,请联系平台管理员续费"
                }) : wx.navigateTo({
                    url: "../ruzhu/index"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});