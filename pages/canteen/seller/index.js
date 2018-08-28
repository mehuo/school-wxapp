var app = getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        index: 0,
        navbar: [],
        nav: [ {
            bindtap: "takeout",
            img: "../../img/seller/two.png",
            name: "外卖",
            active: !1,
            smwz: "快速送达"
        }, {
            bindtap: "smdc",
            img: "../../img/seller/six.png",
            name: "扫码点餐",
            active: !1,
            smwz: "扫一扫轻松下单"
        }, {
            bindtap: "plan",
            img: "../../img/seller/one.png",
            name: "预约",
            active: !1,
            smwz: "提前预定"
        }, {
            bindtap: "sy",
            img: "../../img/seller/four.png",
            name: "收银",
            active: !1,
            smwz: "当面收款"
        }, {
            bindtap: "cj",
            img: "../../img/seller/three.png",
            name: "存酒",
            active: !1
        }, {
            bindtap: "hjfwy",
            img: "../../img/seller/five.png",
            name: "呼叫服务员",
            active: !1
        }, {
            bindtap: "yhq",
            img: "../../img/seller/seven.png",
            name: "优惠券",
            active: !1
        }, {
            bindtap: "pdqh",
            img: "../../img/seller/eight.png",
            name: "排队取号",
            active: !1
        } ],
        selectedindex: 0,
        isytpj: !1,
        pagenum: 1,
        storelist: [],
        bfstorelist: [],
        mygd: !1,
        jzgd: !0,
        arr: [ {
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
        } ]
    },
    commentPicView: function(t) {
        console.log(t);
        var e = this.data.storelist, a = [], s = t.currentTarget.dataset.index, i = t.currentTarget.dataset.picindex, n = t.currentTarget.dataset.id;
        if (console.log(s, i, n), n == e[s].id) {
            var o = e[s].img;
            for (var r in o) a.push(this.data.url + o[r]);
            wx.previewImage({
                current: this.data.url + o[i],
                urls: a
            });
        }
    },
    ytpj: function() {
        var t = this.data.params;
        this.data.isytpj ? t.img = "" : t.img = "1", this.setData({
            pagenum: 1,
            storelist: [],
            bfstorelist: [],
            mygd: !1,
            jzgd: !0,
            isytpj: !this.data.isytpj,
            params: t
        }), this.getstorelist();
    },
    selectednavbar: function(t) {
        console.log(t);
        var e = this.data.params;
        0 == t.currentTarget.dataset.index && (e.type = "全部"), 1 == t.currentTarget.dataset.index && (e.type = "1"), 
        2 == t.currentTarget.dataset.index && (e.type = "2"), this.setData({
            pagenum: 1,
            storelist: [],
            bfstorelist: [],
            mygd: !1,
            jzgd: !0,
            selectedindex: t.currentTarget.dataset.index,
            params: e
        }), this.getstorelist();
    },
    sy: function() {
        wx.navigateTo({
            url: "fukuan?storeid=" + this.data.store_info.id
        });
    },
    smdc: function() {
        wx.scanCode({
            success: function(t) {
                console.log(t);
                var e = "/" + t.path;
                wx.navigateTo({
                    url: e
                });
            },
            fail: function(t) {
                console.log("扫码fail");
            }
        });
    },
    takeout: function() {
        wx.navigateTo({
            url: "/zh_cjdianc/pages/takeout/takeoutindex?storeid=" + this.data.store_info.id
        });
    },
    plan: function() {
        wx.navigateTo({
            url: "/zh_cjdianc/pages/reserve/reserve?storeid=" + this.data.store_info.id
        });
    },
    qsy: function(t) {
        console.log(t.currentTarget.dataset.type), "2" != t.currentTarget.dataset.type && wx.navigateTo({
            url: "/zh_cjdianc/pages/takeout/takeoutindex?storeid=" + this.data.store_info.id
        });
    },
    ljlq: function(t) {
        console.log(t.currentTarget.dataset.qid);
        var e = this, a = wx.getStorageSync("users").id;
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/LqCoupons",
            cachetime: "0",
            data: {
                user_id: a,
                coupon_id: t.currentTarget.dataset.qid
            },
            success: function(t) {
                console.log(t), "1" == t.data && (wx.showToast({
                    title: "领取成功"
                }), setTimeout(function() {
                    e.Coupons();
                }, 1e3));
            }
        });
    },
    getstorelist: function() {
        var s = this, i = s.data.pagenum;
        s.data.params.page = i, s.data.params.pagesize = 10, console.log(i, s.data.params), 
        s.setData({
            isjzz: !0
        }), app.util.request({
            url: "entry/wxapp/AssessList",
            cachetime: "0",
            data: s.data.params,
            success: function(t) {
                console.log("分页返回的商家列表数据", t.data);
                if(t.data){
                    var e = [ {
                        name: "全部",
                        num: t.data.all
                    }, {
                        name: "满意",
                        num: t.data.ok
                    }, {
                        name: "不满意",
                        num: t.data.no
                    } ], a = s.data.bfstorelist;
                    a = function(t) {
                        for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                        return e;
                    }(a = a.concat(t.data.assess)), s.setData({
                        storelist: a,
                        bfstorelist: a,
                        navbar: e
                    }), t.data.assess.length < 10 ? s.setData({
                        mygd: !0,
                        jzgd: !0,
                        isjzz: !1
                    }) : s.setData({
                        jzgd: !0,
                        pagenum: i + 1,
                        isjzz: !1
                    }), console.log(a);
                }
                
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        app.setNavigationBarColor(this);
        var e = decodeURIComponent(t.scene);
        console.log("scene", e), "undefined" != e && (getApp().sjid = e), null != t.sjid && (console.log("转发获取到的sjid:", t.sjid), 
        getApp().sjid = t.sjid), console.log(t, getApp().sjid), app.getUserInfo(function(t) {
            console.log(t), a.Coupons();
        }), this.setData({
            params: {
                store_id: getApp().sjid,
                type: "全部",
                img: ""
            }
        }), this.getstorelist(), a.refresh(getApp().sjid), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), app.pageOnLoad(a);
                var e = t.data;
                a.setData({
                    xtxx: e
                }), getApp().xtxx = e;
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreAd",
            cachetime: "0",
            data: {
                store_id: getApp().sjid
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    slider: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/TjGoods",
            cachetime: "0",
            data: {
                store_id: getApp().sjid
            },
            success: function(t) {
                console.log(t.data);
                for (var e = 0; e < t.data.length; e++) t.data[e].discount = (Number(t.data[e].money) / Number(t.data[e].money2) * 10).toFixed(1);
                a.setData({
                    tjcarr: t.data
                });
            }
        });
    },
    Coupons: function() {
        var a = this, t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                store_id: getApp().sjid,
                user_id: t
            },
            success: function(t) {
                console.log(t.data);
                for (var e = 0; e < t.data.length; e++) t.data[e].sysl = parseInt((Number(t.data[e].number) - Number(t.data[e].stock)) / Number(t.data[e].number) * 100);
                a.setData({
                    Coupons: t.data
                });
            }
        });
    },
    jumps: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name, s = t.currentTarget.dataset.appid, i = t.currentTarget.dataset.src, n = t.currentTarget.dataset.wb_src, o = t.currentTarget.dataset.type;
        console.log(e, a, s, i, n, o), 1 == o ? (console.log(i), wx.navigateTo({
            url: i
        })) : 2 == o ? (wx.setStorageSync("vr", n), wx.navigateTo({
            url: "../car/car"
        })) : 3 == o && wx.navigateToMiniProgram({
            appId: s
        });
    },
    refresh: function(t) {
        var d = this, l = util.formatTime(new Date()).slice(11, 16);
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                store_id: t
            },
            success: function(t) {
                if(t.data){
                    console.log("商家详情"), console.log(t), wx.setNavigationBarTitle({
                        title: t.data.store.name
                    }), d.setData({
                        store_info: t.data.store,
                        storeset: t.data.storeset
                    });
                    var e = t.data.storeset, a = d.data.nav;
                    "1" == e.is_dn && (a[1].active = !0, "" != e.dn_img && (a[1].img = e.dn_img), "" != e.dn_name && (a[1].name = e.dn_name), 
                    "" != e.dnsm && (a[1].smwz = e.dnsm)), "1" == e.is_wm && (a[0].active = !0, "" != e.wm_img && (a[0].img = e.wm_img), 
                    "" != e.wm_name && (a[0].name = e.wm_name), "" != e.wmsm && (a[0].smwz = e.wmsm)), 
                    "1" == e.is_yy && (a[2].active = !0, "" != e.yy_img && (a[2].img = e.yy_img), "" != e.yy_name && (a[2].name = e.yy_name), 
                    "" != e.sysm && (a[2].smwz = e.yysm)), "1" == e.is_sy && (a[3].active = !0, "" != e.sy_img && (a[3].img = e.sy_img), 
                    "" != e.sy_name && (a[3].name = e.sy_name), "" != e.sysm && (a[3].smwz = e.sysm)), 
                    console.log(a), d.setData({
                        nav: a
                    });
                    var s = t.data.store.time, i = t.data.store.time2, n = t.data.store.time3, o = t.data.store.time4, r = t.data.store.is_rest;
                    console.log("当前的系统时间为" + l), console.log("商家的营业时间从" + s + "至" + i, n + "至" + o), 
                    1 == r ? console.log("商家正在休息" + r) : console.log("商家正在营业" + r), s < o ? s < l && l < i || n < l && l < o ? (console.log("商家正常营业"), 
                    d.setData({
                        time: 1
                    })) : l < s || i < l && l < n ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), d.setData({
                        time: 2
                    })) : o < l && (console.log("商家以及关店啦，明天再来吧"), d.setData({
                        time: 3
                    })) : o < s && (s < l && l < i || n < l && o < l || l < n && l < o ? (console.log("商家正常营业"), 
                    d.setData({
                        time: 1
                    })) : l < s || i < l && l < n ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), d.setData({
                        time: 2
                    })) : o < l && (console.log("商家以及关店啦，明天再来吧"), d.setData({
                        time: 3
                    })));
                }
            }
        });
    },
    seller_coupon: function() {
        this.setData({
            index: 0
        });
    },
    seller_dishes: function() {
        this.setData({
            index: 1
        });
    },
    seller_evalate: function() {
        this.setData({
            index: 2
        });
    },
    seller_info: function(t) {
        var e = this.data.store_info.coordinates.split(","), a = this.data.store_info;
        console.log(e), wx.openLocation({
            latitude: parseFloat(e[0]),
            longitude: parseFloat(e[1]),
            address: a.address,
            name: a.name
        });
    },
    maketel: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.store_info.tel
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum);
        this.data.mygd || !this.data.jzgd || this.data.isjzz || (this.setData({
            jzgd: !1
        }), this.getstorelist());
    },
    onShareAppMessage: function() {
        var t = this.data.xtxx;
        return console.log(t), {
            title: this.data.store_info.name,
            path: "/zh_cjdianc/pages/seller/index?sjid=" + this.data.store_info.id,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});