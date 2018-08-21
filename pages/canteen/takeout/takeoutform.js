var qqmapsdk, app = getApp(), util = require("../../utils/util.js"), QQMapWX = require("../../utils/qqmap-wx-jssdk.js");

Page({
    data: {
        share_modal_active: !1,
        activeradio: "",
        hbshare_modal_active: !1,
        hbactiveradio: "",
        isloading: !0,
        navbar: [ "外卖配送", "到店自取" ],
        fwxy: !0,
        xymc: "到店自取服务协议",
        xynr: "",
        selectedindex: 0,
        color: "#019fff",
        checked: !0,
        cart_list: [],
        wmindex: 0,
        wmtimearray: [ "尽快送达" ],
        cjindex: 0,
        cjarray: [ "1份", "2份", "3份", "4份", "5份", "6份", "7份", "8份", "9份", "10份", "10份以上" ],
        mdoaltoggle: !0,
        total: 0,
        showModal: !1,
        zffs: 1,
        zfz: !1,
        zfwz: "微信支付",
        btntype: "btn_ok1",
        yhqkdje: 0,
        hbkdje: 0
    },
    showcart: function() {
        this.setData({
            share_modal_active: !this.data.share_modal_active
        });
    },
    closecart: function() {
        this.setData({
            share_modal_active: !1
        });
    },
    hbshowcart: function() {
        this.setData({
            hbshare_modal_active: !this.data.hbshare_modal_active
        });
    },
    hbclosecart: function() {
        this.setData({
            hbshare_modal_active: !1
        });
    },
    openxy: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    bindPickerChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            wmindex: t.detail.value
        });
    },
    bindcjPickerChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            cjindex: t.detail.value
        });
    },
    selectednavbar: function(t) {
        console.log(t);
        this.setData({
            selectedindex: t.currentTarget.dataset.index
        });
        var e = this.data.psfbf;
        console.log(e), 1 == t.currentTarget.dataset.index ? this.setData({
            psf: 0
        }) : this.setData({
            psf: e
        }), this.gettotalprice();
    },
    checkboxChange: function(t) {
        this.setData({
            checked: !this.data.checked
        });
    },
    ckwz: function(t) {
        console.log(t.currentTarget.dataset.jwd);
        var e = t.currentTarget.dataset.jwd.split(",");
        console.log(e);
        wx.openLocation({
            latitude: Number(e[0]),
            longitude: Number(e[1]),
            name: this.data.store.name,
            address: this.data.store.address
        });
    },
    radioChange1: function(t) {
        console.log("radio1发生change事件，携带value值为：", t.detail.value), "wxzf" == t.detail.value && this.setData({
            zffs: 1,
            zfwz: "微信支付",
            btntype: "btn_ok1"
        }), "yezf" == t.detail.value && this.setData({
            zffs: 2,
            zfwz: "余额支付",
            btntype: "btn_ok2"
        }), "jfzf" == t.detail.value && this.setData({
            zffs: 3,
            zfwz: "积分支付",
            btntype: "btn_ok3"
        }), "hdfk" == t.detail.value && this.setData({
            zffs: 4,
            zfwz: "货到付款",
            btntype: "btn_ok4"
        });
    },
    distance: function(t, e, a) {
        var o;
        qqmapsdk.calculateDistance({
            mode: "driving",
            from: {
                latitude: t.lat,
                longitude: t.lng
            },
            to: [ {
                latitude: e.lat,
                longitude: e.lng
            } ],
            success: function(t) {
                console.log(t), 0 == t.status && (o = Math.round(t.result.elements[0].distance), 
                a(o));
            },
            fail: function(t) {
                console.log(t), 373 == t.status && (o = 15e3, a(o));
            },
            complete: function(t) {
                console.log(t);
            }
        });
    },
    KeyName: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    KeyMobile: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    tjddformSubmit: function(t) {
        console.log(t), this.setData({
            form_id2: t.detail.formId
        });
        var e = this.data.address, a = this.data.selectedindex;
        if (console.log(e, a), 0 == a && null == e) return wx.showModal({
            title: "提示",
            content: "请选择收货地址"
        }), !1;
        if (0 != a || this.data.dzisnormall) {
            if (0 == a && this.data.dzisnormall) this.setData({
                showModal: !0
            }); else if (1 == a) {
                var o = this.data.name, s = this.data.mobile, i = this.data.checked;
                if (console.log(o, s), "" == o || "" == s) return wx.showModal({
                    title: "提示",
                    content: "到店自提必须填写收货人和联系电话！"
                }), !1;
                if (!i) return wx.showModal({
                    title: "提示",
                    content: "请阅读并同意《到店自取服务协议》"
                }), !1;
                this.setData({
                    showModal: !0
                });
            }
        } else wx.showModal({
            title: "提示",
            content: "当前选择的收货地址超出商家配送距离,请选择其他地址",
            showCancel: !1,
            success: function(t) {
                wx.navigateTo({
                    url: "../wddz/xzdz"
                });
            }
        });
    },
    yczz: function() {
        this.setData({
            showModal: !1
        });
    },
    mdoalclose: function() {
        this.setData({
            mdoaltoggle: !0
        });
    },
    bindDateChange: function(t) {
        console.log("date 发生 change 事件，携带值为", t.detail.value, this.data.datestart), this.setData({
            date: t.detail.value
        }), t.detail.value == this.data.datestart ? (console.log("日期没有修改"), this.setData({
            timestart: util.formatTime(new Date()).substring(11, 16)
        })) : (console.log("修改了日期"), this.setData({
            timestart: "00:01"
        }));
    },
    bindTimeChange: function(t) {
        console.log("time 发生 change 事件，携带值为", t.detail.value), this.setData({
            time: t.detail.value
        });
    },
    radioChange: function(t) {
        this.setData({
            radioChange: t.detail.value
        }), console.log("radio发生change事件，携带value值为：", t.detail.value);
    },
    hbradioChange: function(t) {
        this.setData({
            hbradioChange: t.detail.value
        }), console.log("radio发生change事件，携带value值为：", t.detail.value);
    },
    xzq: function(t) {
        if (console.log(t.currentTarget.dataset, this.data.gwcinfo.money, this.data.CouponSet.yhq_set), 
        Number(t.currentTarget.dataset.full) > this.data.gwcinfo.money) return wx.showModal({
            title: "提示",
            content: "您的消费金额不满足此优惠券条件"
        }), !1;
        "1" == this.data.CouponSet.yhq_set ? this.setData({
            share_modal_active: !1,
            activeradio: t.currentTarget.dataset.rdid,
            yhqkdje: t.currentTarget.dataset.kdje
        }) : this.setData({
            share_modal_active: !1,
            activeradio: t.currentTarget.dataset.rdid,
            yhqkdje: t.currentTarget.dataset.kdje,
            hbactiveradio: "",
            hbkdje: 0
        }), this.gettotalprice();
    },
    xzhb: function(t) {
        if (console.log(t.currentTarget.dataset, this.data.gwcinfo.money, this.data.CouponSet.yhq_set), 
        Number(t.currentTarget.dataset.full) > this.data.gwcinfo.money) return wx.showModal({
            title: "提示",
            content: "您的消费金额不满足此红包条件"
        }), !1;
        "1" == this.data.CouponSet.yhq_set ? this.setData({
            hbshare_modal_active: !1,
            hbactiveradio: t.currentTarget.dataset.rdid,
            hbkdje: t.currentTarget.dataset.kdje
        }) : (wx.showModal({
            title: "提示",
            content: "优惠券与红包不可同时享用"
        }), this.setData({
            hbshare_modal_active: !1,
            hbactiveradio: t.currentTarget.dataset.rdid,
            hbkdje: t.currentTarget.dataset.kdje,
            activeradio: "",
            yhqkdje: 0
        })), this.gettotalprice();
    },
    onLoad: function(t) {
        app.setNavigationBarColor(this), console.log(t);
        var e = util.formatTime(new Date()), a = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-"), o = util.formatTime(new Date()).substring(11, 16);
        console.log(e, a.toString(), o.toString());
        var s = new Date(), i = s.getTime(), n = 2 * (24 - new Date(i).getHours());
        console.log(n, new Date(i), new Date(i).getHours(), new Date(i).getMinutes());
        for (var d = [ "尽快送达" ], r = 1; r < n; r++) {
            i = s.getTime() + 18e5 * r;
            var l = new Date(i).getMinutes();
            l < 10 && (l = "0" + l);
            var c = new Date(i).getHours() + ":" + l;
            d.push(c);
        }
        console.log(d), this.setData({
            datestart: a,
            timestart: o,
            date: a,
            time: o,
            wmtimearray: d
        });
        var u = this, h = t.storeid, g = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyCoupons",
            cachetime: "0",
            data: {
                store_id: h,
                user_id: g
            },
            success: function(t) {
                console.log(t.data);
                for (var e = [], a = [], o = 0; o < t.data.length; o++) "2" != t.data[o].coupon_type && "1" == t.data[o].type && e.push(t.data[o]), 
                "2" != t.data[o].coupon_type && "2" == t.data[o].type && a.push(t.data[o]);
                console.log(e, a), u.setData({
                    Coupons: e,
                    hbarr: a
                });
            }
        }), app.util.request({
            url: "entry/wxapp/CouponSet",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), u.setData({
                    CouponSet: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(t) {
                console.log(t), u.setData({
                    System: t.data
                }), qqmapsdk = new QQMapWX({
                    key: t.data.map_key
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                store_id: h,
                type: 2
            },
            success: function(t) {
                console.log(t.data);
                var e = t.data, a = t.data.store.coordinates.split(","), o = {
                    lng: Number(a[1]),
                    lat: Number(a[0])
                };
                console.log(o), "2" == e.storeset.is_zt && u.setData({
                    navbar: [ "外卖配送" ]
                }), "1" == e.storeset.is_hdfk && u.setData({
                    hdfk: !0
                }), u.setData({
                    psfarr: t.data.psf,
                    reduction: t.data.reduction,
                    store: t.data.store,
                    storeset: t.data.storeset,
                    sjstart: o,
                    xynr: t.data.storeset.ztxy
                }), app.util.request({
                    url: "entry/wxapp/MyCar",
                    cachetime: "0",
                    data: {
                        store_id: h,
                        user_id: g
                    },
                    success: function(t) {
                        console.log(t), app.util.request({
                            url: "entry/wxapp/IsNew",
                            data: {
                                store_id: h,
                                user_id: g
                            },
                            cachetime: "0",
                            success: function(t) {
                                console.log(t.data), 1 == t.data ? u.setData({
                                    xyhmoney: e.storeset.xyh_money,
                                    isnewuser: "1"
                                }) : u.setData({
                                    xyhmoney: 0,
                                    isnewuser: "2"
                                }), u.countMj(), u.countpsf();
                            }
                        }), u.setData({
                            cart_list: t.data.res,
                            gwcinfo: t.data,
                            gwcprice: t.data.money
                        });
                    }
                });
            }
        });
    },
    gettotalprice: function() {
        var t = this.data.gwcprice, e = this.data.gwcinfo.box_money, a = this.data.psf, o = this.data.mjmoney, s = this.data.xyhmoney, i = this.data.yhqkdje, n = this.data.hbkdje, d = (Number(o) + Number(s) + Number(i) + Number(n)).toFixed(2), r = (Number(t) + Number(a) - d).toFixed(2);
        r < 0 && (r = 0), console.log("gwcprice", t, "bzf", e, "psf", a, "mjmoney", o, "xyhmoney", s, "totalyh", d, "totalPrice", r, "yhqkdje", i, "hbkdje", n), 
        this.setData({
            totalyh: d,
            totalPrice: r,
            isloading: !1
        });
    },
    jsmj: function(t, e) {
        for (var a, o = 0; o < e.length; o++) if (Number(t) >= Number(e[o].full)) {
            a = o;
            break;
        }
        return a;
    },
    countMj: function() {
        var t = this.data.gwcprice, e = this.data.reduction.reverse(), a = this.jsmj(t, e), o = this.data.isnewuser;
        console.log(t, e, a, o);
        var s = 0;
        0 < e.length && null != a && "2" == o && (s = e[a].reduction), this.setData({
            reduction: e,
            mjindex: a,
            mjmoney: s
        });
    },
    countpsf: function() {
        var o = this, t = wx.getStorageSync("users").id, a = o.data.sjstart, s = 1e3 * Number(this.data.storeset.ps_jl), i = this.data.psfarr;
        console.log(i), app.util.request({
            url: "entry/wxapp/MyDefaultAddress",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                if (console.log(t.data), t.data) {
                    var e = {
                        lng: t.data.lng,
                        lat: t.data.lat
                    };
                    console.log(a, e, s), o.setData({
                        address: t.data,
                        mobile: t.data.tel,
                        name: t.data.user_name
                    }), o.distance(a, e, function(t) {
                        s < t ? (o.setData({
                            dzisnormall: !1
                        }), wx.showModal({
                            title: "提示",
                            content: "当前选择的收货地址超出商家配送距离,请选择其他地址",
                            success: function(t) {
                                t.confirm ? (console.log("用户点击确定"), wx.navigateTo({
                                    url: "../wddz/xzdz"
                                })) : t.cancel && console.log("用户点击取消");
                            }
                        })) : o.setData({
                            dzisnormall: !0
                        });
                        var e = (t / 1e3).toFixed(2);
                        console.log(t, s, e);
                        for (var a = i.length - 1; 0 <= a; a--) if (console.log(a), Number(e) >= Number(i[a].end) || Number(e) >= Number(i[a].start) && Number(e) < Number(i[a].end)) {
                            console.log(a, i[a].money), o.setData({
                                psf: i[a].money,
                                psfbf: i[a].money
                            }), o.gettotalprice();
                            break;
                        }
                    });
                } else o.setData({
                    psf: i[0].money,
                    psfbf: i[0].money
                }), o.gettotalprice();
            }
        });
    },
    formSubmit: function(a) {
        var o = [];
        this.data.cart_list.map(function(t) {
            if (0 < t.num) {
                var e = {};
                e.name = t.name, e.img = t.logo, e.num = t.num, e.money = t.money, e.dishes_id = t.good_id, 
                e.spec = t.spec, o.push(e);
            }
        }), console.log(o);
        var s = this, i = getApp().getOpenId;
        console.log("form发生了submit事件，携带数据为：", a.detail.value.radiogroup, this.data.activeradio, this.data.hbactiveradio);
        var t, n = a.detail.formId, e = this.data.form_id2, d = wx.getStorageSync("users").id, r = this.data.store.id, l = this.data.totalPrice, c = this.data.totalyh, u = this.data.gwcinfo.box_money, h = this.data.psf, g = this.data.mjmoney, m = this.data.xyhmoney, f = parseInt(this.data.selectedindex) + 1, p = this.data.address.area, y = this.data.address.lat, w = this.data.address.lng, v = this.data.note, b = this.data.cjarray[this.data.cjindex], x = this.data.yhqkdje, _ = this.data.activeradio, D = this.data.hbactiveradio, k = this.data.hbkdje;
        if (t = 2 == f ? this.data.date + " " + this.data.time : this.data.wmtimearray[this.data.wmindex], 
        null != this.data.address) var z = this.data.address.area.replace(/,/g, "") + this.data.address.address, j = this.data.address.user_name, q = this.data.address.tel, T = this.data.address.sex; else z = "", 
        j = "", q = "", T = "0";
        if (2 == f && (j = s.data.name, q = this.data.mobile, "" == j || "" == q)) return wx.showModal({
            title: "提示",
            content: "到店自提必须填写收货人和联系电话！"
        }), !1;
        if (console.log(i, n, e, d, r, "实付", l, "总优惠", c, "包装费", u, "运费", h, "满减金额", g, "新用户money", m, "优惠券", x, "红包", k, "订单类型", f, p, y, w, "收货人", j, "收获电话", q, "收货地址", z, "留言", v, "sz", o, "配送时间", t, "餐具数量", b, T), 
        "yezf" == a.detail.value.radiogroup) var M = 2;
        if ("wxzf" == a.detail.value.radiogroup) M = 1;
        if ("jfzf" == a.detail.value.radiogroup) M = 3;
        if ("hdfk" == a.detail.value.radiogroup) M = 4;
        console.log("支付方式", M), "" == n ? wx.showToast({
            title: "没有获取到formid",
            icon: "loading",
            duration: 1e3
        }) : (this.setData({
            zfz: !0
        }), app.util.request({
            url: "entry/wxapp/AddOrder",
            cachetime: "0",
            data: {
                user_id: d,
                store_id: r,
                money: l,
                discount: c,
                box_money: u,
                ps_money: h,
                mj_money: g,
                xyh_money: m,
                tel: q,
                name: j,
                address: z,
                note: v,
                type: 1,
                area: p,
                lat: y,
                lng: w,
                form_id: n,
                form_id2: e,
                delivery_time: t,
                order_type: f,
                pay_type: M,
                sz: o,
                tableware: b,
                sex: T,
                yhq_money: x,
                yhq_money2: k,
                coupon_id: _,
                coupon_id2: D
            },
            success: function(t) {
                console.log(t);
                var e = t.data;
                s.setData({
                    zfz: !1,
                    showModal: !1
                }), "hdfk" == a.detail.value.radiogroup ? (console.log("货到付款流程"), "下单失败" != e ? (s.setData({
                    mdoaltoggle: !1
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "../wddd/order"
                    });
                }, 1e3), app.util.request({
                    url: "entry/wxapp/Message",
                    cachetime: "0",
                    data: {
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t);
                    }
                })) : wx.showToast({
                    title: "支付失败",
                    icon: "loading"
                })) : (console.log("微信支付流程"), 0 == l ? (wx.showModal({
                    title: "提示",
                    content: "0元买单请选择其他方式支付"
                }), s.setData({
                    zfz: !1
                })) : "下单失败" != e && app.util.request({
                    url: "entry/wxapp/pay",
                    cachetime: "0",
                    data: {
                        openid: i,
                        money: l,
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t), wx.requestPayment({
                            timeStamp: t.data.timeStamp,
                            nonceStr: t.data.nonceStr,
                            package: t.data.package,
                            signType: t.data.signType,
                            paySign: t.data.paySign,
                            success: function(t) {
                                console.log(t.data), console.log(t), console.log(n);
                            },
                            complete: function(t) {
                                console.log(t), "requestPayment:fail cancel" == t.errMsg && (wx.showToast({
                                    title: "取消支付",
                                    icon: "loading",
                                    duration: 1e3
                                }), setTimeout(function() {
                                    wx.reLaunch({
                                        url: "../wddd/order"
                                    });
                                }, 1e3)), "requestPayment:ok" == t.errMsg && (s.setData({
                                    mdoaltoggle: !1
                                }), setTimeout(function() {
                                    wx.reLaunch({
                                        url: "../wddd/order"
                                    });
                                }, 1e3));
                            }
                        });
                    }
                }));
            }
        }));
    },
    onReady: function() {},
    onShow: function() {
        var t = wx.getStorageSync("note");
        console.log(t), this.setData({
            note: t
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});