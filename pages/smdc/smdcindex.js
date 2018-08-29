var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        isloading: !0,
        store_id: "1",
        navbar: [ "店内", "评价", "详情" ],
        selectedindex: 0,
        catalogSelect: 0,
        share_modal_active: !1,
        color: "",
        fwxy: !0,
        cpjzz: !0,
        spggtoggle: !0,
        yysjtoggle: !0,
        spxqtoggle: !0,
        gg: [],
        storeyyzz: [],
        pjselectedindex: 0,
        isytpj: !1,
        pagenum: 1,
        storelist: [],
        bfstorelist: [],
        mygd: !1,
        jzgd: !0
    },
    drdc: function() {
        var a = this, t = this.data.userinfo;
        console.log(t), "" == t.img || "" == t.name ? wx.navigateTo({
            url: "getdl"
        }) : wx.showModal({
            title: "提示",
            content: "确定多人选购拼单吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.redirectTo({
                    url: "drdc?storeid=" + a.data.store_id + "&tableid=" + a.data.tableid + "&type_name=" + a.data.tableinfo.type_name + "&table_name=" + a.data.tableinfo.table_name
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    commentPicView: function(t) {
        console.log(t);
        var a = this.data.storelist, e = [], o = t.currentTarget.dataset.index, s = t.currentTarget.dataset.picindex, n = t.currentTarget.dataset.id;
        if (console.log(o, s, n), n == a[o].id) {
            var i = a[o].img;
            for (var d in i) e.push(this.data.url + i[d]);
            wx.previewImage({
                current: this.data.url + i[s],
                urls: e
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
    pjselectednavbar: function(t) {
        console.log(t);
        var a = this.data.params;
        0 == t.currentTarget.dataset.index && (a.type = "全部"), 1 == t.currentTarget.dataset.index && (a.type = "1"), 
        2 == t.currentTarget.dataset.index && (a.type = "2"), this.setData({
            pagenum: 1,
            storelist: [],
            bfstorelist: [],
            mygd: !1,
            jzgd: !0,
            pjselectedindex: t.currentTarget.dataset.index,
            params: a
        }), this.getstorelist();
    },
    getstorelist: function() {
        var o = this, s = o.data.pagenum;
        o.data.params.page = s, o.data.params.pagesize = 10, console.log(s, o.data.params), 
        o.setData({
            isjzz: !0
        }), app.util.request({
            url: "entry/wxapp/AssessList",
            cachetime: "0",
            data: o.data.params,
            success: function(t) {
                console.log("分页返回的商家列表数据", t.data);
                var a = [ {
                    name: "全部",
                    num: t.data.all
                }, {
                    name: "满意",
                    num: t.data.ok
                }, {
                    name: "不满意",
                    num: t.data.no
                } ], e = o.data.bfstorelist;
                e = function(t) {
                    for (var a = [], e = 0; e < t.length; e++) -1 == a.indexOf(t[e]) && a.push(t[e]);
                    return a;
                }(e = e.concat(t.data.assess)), o.setData({
                    storelist: e,
                    bfstorelist: e,
                    pjnavbar: a
                }), t.data.assess.length < 10 ? o.setData({
                    mygd: !0,
                    jzgd: !0,
                    isjzz: !1
                }) : o.setData({
                    jzgd: !0,
                    pagenum: s + 1,
                    isjzz: !1
                }), console.log(e);
            }
        });
    },
    Coupons: function() {
        var o = this, t = wx.getStorageSync("users").id, a = o.data.store_id;
        app.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                store_id: a,
                user_id: t
            },
            success: function(t) {
                console.log(t.data);
                for (var a = [], e = 0; e < t.data.length; e++) "1" != t.data[e].type && a.push(t.data[e]);
                o.setData({
                    Coupons: a
                });
            }
        });
    },
    ljlq: function(t) {
        console.log(t.currentTarget.dataset.qid);
        var a = this, e = wx.getStorageSync("users").id;
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/LqCoupons",
            cachetime: "0",
            data: {
                user_id: e,
                coupon_id: t.currentTarget.dataset.qid
            },
            success: function(t) {
                console.log(t), "1" == t.data && (wx.showToast({
                    title: "领取成功"
                }), setTimeout(function() {
                    a.Coupons();
                }, 1e3));
            }
        });
    },
    submit: function() {
        var t = this.data.userinfo;
        console.log(t), "" == t.img || "" == t.name ? wx.navigateTo({
            url: "getdl"
        }) : wx.navigateTo({
            url: "smdcform?storeid=" + this.data.store_id + "&tableid=" + this.data.tableid
        });
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    spxqck: function(t) {
        var a = t.currentTarget.dataset.itemIndex, e = t.currentTarget.dataset.parentindex, o = this.data.dishes, s = this.data.cart_list.res, n = t.currentTarget.dataset.goodid, i = this.data.dishes[e].good[a], d = wx.getStorageSync("users").id, r = this.data.store_id;
        i.goodindex = a, i.catalogSelect = e, console.log(o, s, a, e, n, i, d, r), this.setData({
            spxqinfo: i,
            spxqtoggle: !1
        });
    },
    ckcd: function() {
        this.setData({
            yysjtoggle: !0
        });
    },
    gdsh: function() {
        wx.navigateBack({});
    },
    gbspxq: function() {
        this.setData({
            spxqtoggle: !0
        });
    },
    ggcartdec: function() {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "多规格商品请在购物车中删除对应的规格商品！",
            success: function(t) {
                a.setData({
                    share_modal_active: !0
                });
            }
        });
    },
    gwcdec: function(t) {
        var o = this, s = this.data.dishes, n = t.currentTarget.dataset.goodid, a = Number(t.currentTarget.dataset.num) - 1, e = t.currentTarget.dataset.id;
        console.log(s, n, a, e), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/UpdCar",
            cachetime: "0",
            data: {
                num: a,
                id: e
            },
            success: function(t) {
                if (console.log(t), "1" == t.data) {
                    for (var a = 0; a < s.length; a++) for (var e = 0; e < s[a].good.length; e++) s[a].good[e].id == n && s[a].good[e].quantity--;
                    o.setData({
                        dishes: s
                    }), o.gwcreload();
                }
                "超出库存!" == t.data && wx.showModal({
                    title: "提示",
                    content: "超出库存!"
                });
            }
        });
    },
    gwcadd: function(t) {
        var o = this, s = this.data.dishes, n = t.currentTarget.dataset.goodid, a = Number(t.currentTarget.dataset.num) + 1, e = t.currentTarget.dataset.id;
        console.log(s, n, a, e), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/UpdCar",
            cachetime: "0",
            data: {
                num: a,
                id: e
            },
            success: function(t) {
                if (console.log(t), "1" == t.data) {
                    for (var a = 0; a < s.length; a++) for (var e = 0; e < s[a].good.length; e++) s[a].good[e].id == n && s[a].good[e].quantity++;
                    o.setData({
                        dishes: s
                    }), o.gwcreload();
                }
                "超出库存!" == t.data && wx.showModal({
                    title: "提示",
                    content: "超出库存!请选择其他商品"
                });
            }
        });
    },
    cartdec: function(t) {
        var a = t.currentTarget.dataset.itemIndex, e = t.currentTarget.dataset.parentindex, o = this.data.dishes, s = this.data.cart_list.res, n = t.currentTarget.dataset.goodid, i = this, d = this.data.dishes[e].good[a], r = wx.getStorageSync("users").id, c = this.data.store_id;
        console.log(o, s, a, e, n, d, r, c);
        for (var l = 0; l < s.length; l++) if (s[l].good_id == n) {
            var g = Number(s[l].num) - 1, u = s[l].id;
            console.log(s[l], g, u), wx.showLoading({
                title: "正在加载",
                mask: !0
            }), app.util.request({
                url: "entry/wxapp/UpdCar",
                cachetime: "0",
                data: {
                    num: g,
                    id: u
                },
                success: function(t) {
                    if (console.log(t), "1" == t.data) {
                        for (var a = 0; a < o.length; a++) for (var e = 0; e < o[a].good.length; e++) o[a].good[e].id == n && o[a].good[e].quantity--;
                        i.setData({
                            dishes: o
                        }), i.gwcreload();
                    }
                    "超出库存!" == t.data && wx.showModal({
                        title: "提示",
                        content: "超出库存!"
                    });
                }
            });
        }
    },
    cartadd: function(t) {
        var a = t.currentTarget.dataset.itemIndex, e = t.currentTarget.dataset.parentindex, o = this.data.dishes, s = t.currentTarget.dataset.goodid, n = this, i = this.data.dishes[e].good[a], d = wx.getStorageSync("users").id, r = this.data.store_id;
        console.log(a, e, s, i, d, r), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/AddCar",
            cachetime: "0",
            data: {
                money: i.dn_money,
                good_id: s,
                store_id: r,
                user_id: d,
                num: 1,
                spec: "",
                combination_id: "",
                box_money: i.box_money,
                type: 2
            },
            success: function(t) {
                if (console.log(t), "1" == t.data) {
                    for (var a = 0; a < o.length; a++) for (var e = 0; e < o[a].good.length; e++) o[a].good[e].id == s && o[a].good[e].quantity++;
                    n.setData({
                        dishes: o
                    }), console.log(o), n.gwcreload();
                }
                "超出库存!" == t.data && wx.showModal({
                    title: "提示",
                    content: "库存不足!请重新选择"
                });
            }
        });
    },
    spggck: function(t) {
        var r = t.currentTarget.dataset.itemIndex, c = t.currentTarget.dataset.parentindex, l = t.currentTarget.dataset.goodid, g = this;
        console.log(r, c, l), app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                good_id: l
            },
            success: function(t) {
                console.log(t.data);
                var a = t.data.spec, e = t.data.name;
                for (var o in a) for (var s in a[o].spec_val) a[o].spec_val[s].checked = 0 == s;
                g.setData({
                    gg: a,
                    spname: e
                }), console.log(a);
                var n = [], i = !0;
                for (var o in a) {
                    var d = !1;
                    for (var s in a[o].spec_val) if (a[o].spec_val[s].checked) {
                        n.push(a[o].spec_val[s].spec_val_name), d = !0;
                        break;
                    }
                    if (!d) {
                        i = !1;
                        break;
                    }
                }
                console.log(l, n, n.toString()), i && (wx.showLoading({
                    title: "正在加载",
                    mask: !0
                }), app.util.request({
                    url: "entry/wxapp/GgZh",
                    cachetime: "0",
                    data: {
                        combination: n.toString(),
                        good_id: l
                    },
                    success: function(t) {
                        console.log(t), g.setData({
                            spggtoggle: !1,
                            gginfo: t.data,
                            itemIndex: r,
                            parentindex: c
                        });
                    }
                }));
            }
        });
    },
    attrClick: function(t) {
        var a = this, e = this.data.gginfo.good_id, o = t.target.dataset.groupId, s = t.target.dataset.id, n = a.data.gg;
        for (var i in console.log(o, s, n), n) if (n[i].spec_id == o) for (var d in n[i].spec_val) n[i].spec_val[d].spec_val_id == s ? n[i].spec_val[d].checked = !0 : n[i].spec_val[d].checked = !1;
        a.setData({
            gg: n
        });
        var r = [], c = !0;
        for (var i in n) {
            var l = !1;
            for (var d in n[i].spec_val) if (n[i].spec_val[d].checked) {
                r.push(n[i].spec_val[d].spec_val_name), l = !0;
                break;
            }
            if (!l) {
                c = !1;
                break;
            }
        }
        console.log(e, r, r.toString()), c && (wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/GgZh",
            cachetime: "0",
            data: {
                combination: r.toString(),
                good_id: e
            },
            success: function(t) {
                console.log(t), a.setData({
                    gginfo: t.data
                });
            }
        }));
    },
    ggaddcart: function() {
        var t = this.data.itemIndex, a = this.data.parentindex, o = this.data.dishes, s = this, n = this.data.gginfo, e = wx.getStorageSync("users").id, i = this.data.gg, d = this.data.store_id, r = [], c = !0;
        for (var l in i) {
            var g = !1;
            for (var u in i[l].spec_val) if (i[l].spec_val[u].checked) {
                r.push(i[l].spec_name + ":" + i[l].spec_val[u].spec_val_name), g = !0;
                break;
            }
            if (!g) {
                c = !1;
                break;
            }
        }
        console.log("加入购物车", t, a, o, n, e, d, i, r, r.toString()), c && (wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/AddCar",
            cachetime: "0",
            data: {
                money: n.dn_money,
                good_id: n.good_id,
                store_id: d,
                user_id: e,
                num: 1,
                spec: r.toString(),
                combination_id: n.id,
                box_money: n.box_money,
                type: 2
            },
            success: function(t) {
                if (console.log(t), "1" == t.data) {
                    for (var a = 0; a < o.length; a++) for (var e = 0; e < o[a].good.length; e++) o[a].good[e].id == n.good_id && o[a].good[e].quantity++;
                    s.setData({
                        dishes: o
                    }), s.gwcreload(), s.setData({
                        spggtoggle: !0
                    });
                }
                "超出库存!" == t.data && wx.showModal({
                    title: "提示",
                    content: "暂无库存!请选择其他规格或商品"
                });
            }
        }));
    },
    gwcreload: function() {
        var a = this.data.dishes, e = this, t = wx.getStorageSync("users").id, o = this.data.store_id;
        console.log(a, t, o), app.util.request({
            url: "entry/wxapp/MyCar",
            cachetime: "0",
            data: {
                store_id: o,
                user_id: t,
                type: 2
            },
            success: function(t) {
                console.log(t), console.log(a), e.setData({
                    cart_list: t.data
                }), e.subText();
            }
        });
    },
    gbspgg: function() {
        this.setData({
            spggtoggle: !0
        });
    },
    gbyysj: function() {
        this.setData({
            yysjtoggle: !0
        });
    },
    selectednavbar: function(t) {
        console.log(t), this.setData({
            selectedindex: t.currentTarget.dataset.index
        });
    },
    selectMenu: function(e) {
        var s = this.data.dishes, n = this, o = wx.getStorageSync("users").id, i = n.data.store_id, d = e.currentTarget.dataset.itemIndex;
        if (console.log(s, o, i, d), this.setData({
            catalogSelect: e.currentTarget.dataset.itemIndex
        }), 0 == s[e.currentTarget.dataset.itemIndex].good.length) {
            var t = s[e.currentTarget.dataset.itemIndex].id;
            console.log("还没加载过数据", t), n.setData({
                cpjzz: !0
            }), app.util.request({
                url: "entry/wxapp/Dishes",
                cachetime: "0",
                data: {
                    type_id: t,
                    type: 1
                },
                success: function(t) {
                    console.log(t.data);
                    for (var a = 0; a < t.data.length; a++) t.data[a].quantity = Number(t.data[a].quantity);
                    s[e.currentTarget.dataset.itemIndex].good = t.data, n.setData({
                        cpjzz: !1
                    }), app.util.request({
                        url: "entry/wxapp/MyCar",
                        cachetime: "0",
                        data: {
                            store_id: i,
                            user_id: o,
                            type: 2
                        },
                        success: function(t) {
                            console.log(t);
                            for (var a = t.data.res, e = 0; e < a.length; e++) for (var o = 0; o < s[d].good.length; o++) a[e].good_id == s[d].good[o].id && (s[d].good[o].quantity = s[d].good[o].quantity + Number(a[e].num));
                            console.log(s), n.setData({
                                dishes: s
                            });
                        }
                    });
                }
            });
        } else console.log("已有缓存数据");
    },
    swiperChange: function(t) {
        console.log(t), this.setData({
            selectedindex: t.detail.current
        });
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
    clear: function() {
        var o = this, s = this.data.dishes, a = wx.getStorageSync("users").id, e = o.data.store_id;
        console.log(s, a, e), wx.showModal({
            title: "提示",
            content: "确定清空此商家的购物车吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.showLoading({
                    title: "正在加载",
                    mask: !0
                }), app.util.request({
                    url: "entry/wxapp/DelCar",
                    cachetime: "0",
                    data: {
                        user_id: a,
                        store_id: e,
                        type: 2
                    },
                    success: function(t) {
                        if (console.log(t.data), "1" == t.data) {
                            for (var a = 0; a < s.length; a++) for (var e = 0; e < s[a].good.length; e++) s[a].good[e].quantity = 0;
                            o.setData({
                                dishes: s,
                                share_modal_active: !1
                            }), o.gwcreload();
                        }
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    subText: function() {
        console.log(this.data);
        var t, a = parseFloat(this.data.cart_list.money), e = parseFloat(this.data.start_at);
        console.log(a, e), a <= 0 ? t = "还没有选购商品" : (console.log(a), t = "去结算"), this.setData({
            subtext: t
        });
    },
    hjfwy: function() {
        var a = this.data.store_id, e = this.data.tableid;
        console.log(a, e), wx.showModal({
            title: "提示",
            content: "确定呼叫服务员吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/VoiceCall",
                    cachetime: "0",
                    data: {
                        store_id: a,
                        id: e
                    },
                    success: function(t) {
                        console.log(t.data), wx.showModal({
                            title: "提示",
                            content: "成功呼叫服务员,系统存在网络延迟,请您不要重复点击呼叫"
                        });
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    wddd: function() {
        wx.navigateTo({
            url: "../wddd/order"
        });
    },
    addsp: function() {
        var a = this.data.oid, e = [], t = this.data.cart_list.res, o = this.data.cart_list.money;
        t.map(function(t) {
            if (0 < t.num) {
                var a = {};
                a.name = t.name, a.img = t.logo, a.num = t.num, a.money = t.money, a.dishes_id = t.good_id, 
                a.spec = t.spec, e.push(a);
            }
        }), console.log(a, o, t, e), wx.showModal({
            title: "提示",
            content: "确定添加商品吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.showLoading({
                    title: "加载中",
                    mask: !0
                }), app.util.request({
                    url: "entry/wxapp/Addgoods",
                    cachetime: "0",
                    data: {
                        sz: e,
                        money: o,
                        order_id: a
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data && (wx.showLoading({
                            title: "添加成功",
                            mask: !0
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "../wddd/order"
                            });
                        }, 1e3));
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    onLoad: function(t) {
        console.log("options", t, t.store_id);
        var a = decodeURIComponent(t.scene).split(",");
        console.log(decodeURIComponent(t.scene), a), app.setNavigationBarColor(this), "undefined" != decodeURIComponent(t.scene) && this.setData({
            store_id: a[1],
            tableid: a[0]
        }), null != t.store_id && this.setData({
            store_id: t.store_id,
            tableid: t.tableid,
            oid: t.oid
        });
        var c = this, e = c.data.store_id, o = c.data.tableid;
        app.util.request({
            url: "entry/wxapp/Zhuohao",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(t) {
                console.log(t), c.setData({
                    tableinfo: t.data
                }), "0" == t.data.status ? c.setData({
                    iskt: !1
                }) : c.setData({
                    iskt: !0
                });
            }
        }), this.setData({
            params: {
                store_id: e,
                type: "全部",
                img: ""
            }
        }), this.getstorelist();
        var l = util.formatTime(new Date()).slice(11, 16);
        app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(r) {
                console.log(r.data), getApp().imgurl = r.data, c.setData({
                    url: r.data
                }), app.util.request({
                    url: "entry/wxapp/StoreInfo",
                    cachetime: "0",
                    data: {
                        store_id: e,
                        type: 1
                    },
                    success: function(t) {
                        console.log(t.data);
                        var a = t.data.store.time, e = t.data.store.time2, o = t.data.store.time3, s = t.data.store.time4, n = t.data.store.is_rest;
                        console.log("当前的系统时间为" + l), console.log("商家的营业时间从" + a + "至" + e, o + "至" + s), 
                        1 == n ? (c.setData({
                            yysjtoggle: !1
                        }), console.log("商家正在休息" + n)) : console.log("商家正在营业" + n), a < s ? a < l && l < e || o < l && l < s ? (console.log("商家正常营业"), 
                        c.setData({
                            time: 1
                        })) : l < a || e < l && l < o ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), c.setData({
                            time: 2,
                            yysjtoggle: !1
                        })) : s < l && (console.log("商家以及关店啦，明天再来吧"), c.setData({
                            time: 3,
                            yysjtoggle: !1
                        })) : s < a && (a < l && l < e || o < l && s < l || l < o && l < s ? (console.log("商家正常营业"), 
                        c.setData({
                            time: 1
                        })) : l < a || e < l && l < o ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), c.setData({
                            time: 2,
                            yysjtoggle: !1
                        })) : s < l && (console.log("商家以及关店啦，明天再来吧"), c.setData({
                            time: 3,
                            yysjtoggle: !1
                        })));
                        for (var i = 0; i < t.data.store.environment.length; i++) t.data.store.environment[i] = r.data + t.data.store.environment[i];
                        for (var d = 0; d < t.data.store.yyzz.length; d++) t.data.store.yyzz[d] = r.data + t.data.store.yyzz[d];
                        "" != t.data.storeset.dn_name && (wx.setNavigationBarTitle({
                            title: t.data.storeset.dn_name
                        }), c.setData({
                            navbar: [ t.data.storeset.dn_name, "评价", "详情" ]
                        })), c.setData({
                            psf: t.data.psf,
                            reduction: t.data.reduction,
                            store: t.data.store,
                            storeset: t.data.storeset,
                            start_at: 0
                        });
                    }
                });
            }
        }), app.getUserInfo(function(t) {
            console.log(t), c.setData({
                userinfo: t
            });
            var s = wx.getStorageSync("users").id, i = c.data.store_id;
            console.log("uid", s), c.Coupons(), app.util.request({
                url: "entry/wxapp/Hot",
                cachetime: "0",
                data: {
                    store_id: i,
                    type: 1
                },
                success: function(t) {
                    console.log(t.data);
                    for (var a = 0; a < t.data.length; a++) t.data[a].quantity = Number(t.data[a].quantity);
                    if (0 < t.data.length) {
                        var e = new Array(), o = new Object();
                        o.good = t.data, o.type_name = "热销", o.id = "0", e.push(o), app.util.request({
                            url: "entry/wxapp/DishesType",
                            cachetime: "0",
                            data: {
                                store_id: i,
                                type: 1
                            },
                            success: function(t) {
                                console.log(t.data);
                                var n = e.concat(t.data);
                                console.log(n), c.setData({
                                    cpjzz: !1
                                }), app.util.request({
                                    url: "entry/wxapp/MyCar",
                                    cachetime: "0",
                                    data: {
                                        store_id: i,
                                        user_id: s,
                                        type: 2
                                    },
                                    success: function(t) {
                                        console.log(t);
                                        for (var a = t.data.res, e = 0; e < a.length; e++) for (var o = 0; o < n.length; o++) for (var s = 0; s < n[o].good.length; s++) a[e].good_id == n[o].good[s].id && (n[o].good[s].quantity = n[o].good[s].quantity + Number(a[e].num));
                                        console.log(n), c.setData({
                                            cart_list: t.data,
                                            dishes: n,
                                            isloading: !1
                                        }), c.subText();
                                    }
                                });
                            }
                        });
                    } else app.util.request({
                        url: "entry/wxapp/DishesType",
                        cachetime: "0",
                        data: {
                            store_id: i,
                            type: 1
                        },
                        success: function(t) {
                            console.log(t.data);
                            var n = t.data;
                            app.util.request({
                                url: "entry/wxapp/Dishes",
                                cachetime: "0",
                                data: {
                                    type_id: n[0].id,
                                    type: 1
                                },
                                success: function(t) {
                                    console.log(t.data);
                                    for (var a = 0; a < t.data.length; a++) t.data[a].quantity = Number(t.data[a].quantity);
                                    n[0].good = t.data, c.setData({
                                        cpjzz: !1
                                    }), app.util.request({
                                        url: "entry/wxapp/MyCar",
                                        cachetime: "0",
                                        data: {
                                            store_id: i,
                                            user_id: s,
                                            type: 2
                                        },
                                        success: function(t) {
                                            console.log(t);
                                            for (var a = t.data.res, e = 0; e < a.length; e++) for (var o = 0; o < n.length; o++) for (var s = 0; s < n[o].good.length; s++) a[e].good_id == n[o].good[s].id && (n[o].good[s].quantity = n[o].good[s].quantity + Number(a[e].num));
                                            console.log(n), c.setData({
                                                cart_list: t.data,
                                                dishes: n,
                                                isloading: !1
                                            }), c.subText();
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }), wx.getSystemInfo({
            success: function(t) {
                console.log(t), c.setData({
                    height: t.windowHeight - 145
                });
            }
        });
    },
    maketel: function(t) {
        var a = this.data.store.tel;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    location: function() {
        var t = this.data.store.coordinates.split(","), a = this.data.store;
        console.log(t), wx.openLocation({
            latitude: parseFloat(t[0]),
            longitude: parseFloat(t[1]),
            address: a.address,
            name: a.name
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    pjmore: function() {
        console.log("上拉加载", this.data.pagenum);
        this.data.mygd || !this.data.jzgd || this.data.isjzz || (this.setData({
            jzgd: !1
        }), this.getstorelist());
    }
});