var t = require("../../utils/adapter"), o = getApp(), e = require("../../sdk/mta.analysis.js"), a = require("../../sdk/fm-1.0.1.js");

Page({
    data: {
        showBind: !1,
        tipeList: [ {
            title: "什么是焕熊？",
            content: "焕熊是国内首家免费数码置换平台，致力于为用户实现享受免费生活的全新体验"
        }, {
            title: "焕熊章是什么？",
            content: "焕熊章是焕熊平台上的荣誉奖章。邀请好友、买卖商品、经常登录等都可以获得焕熊章，焕熊章可以用来兑换平台上的全新原装好物"
        }, {
            title: "快递费是多少？",
            content: "同城8元，异地12元"
        }, {
            title: "多久发货？",
            content: "平台将在你支付邮费后的24小时内发货"
        } ],
        newsList: [ {
            phone: "1888868868",
            num: 1,
            time: "2010-3-2"
        }, {
            phone: "1888868868",
            num: 1,
            time: "2010-3-2"
        }, {
            phone: "1888868868",
            num: 1,
            time: "2010-3-2"
        }, {
            phone: "1888868868",
            num: 1,
            time: "2010-3-2"
        }, {
            phone: "1888868868",
            num: 1,
            time: "2010-3-2"
        } ],
        showIndex: 0,
        num: 1,
        goodsList: [],
        query: {
            pageSize: 20,
            page: 1
        },
        pageFlag: !0,
        loads: !0,
        n: 9,
        goodsInfo: {},
        userBuyList: [],
        adressInfo: {},
        adressPrice: null,
        goodsParams: null,
        goodsSelectParams: {},
        black_box: "",
        showLoad: !0,
        orderFlag: !0,
        wantLoading: !1
    },
    goInviteInterge: function() {
        wx.navigateTo({
            url: "/pages/mail-card/mail-card"
        });
    },
    selectThis: function(t) {
        var o = t.currentTarget.dataset, e = o.title, a = this.data.goodsSelectParams;
        a[e] = o.name, this.setData({
            goodsSelectParams: a
        });
    },
    _change: function(t) {
        var o = t.detail.current + 1;
        this.setData({
            num: o
        });
    },
    getGoodsDetails: function(t) {
        var e = this;
        o.req("integral/signinGoodsDetails", {
            goods_id: t
        }).then(function(t) {
            if (setTimeout(function() {
                e.setData({
                    showLoad: !1
                });
            }, 300), 0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            t.data.goods.goods_ext && e.getGoodsParams(t.data.goods.goods_ext);
            var o = [];
            t.data.goods.image.forEach(function(t) {
                o.push("https://img.rekoon.cn" + t);
            }), t.data.goods.image = o, e.setData({
                goodsInfo: t.data
            });
        });
    },
    getGoodsParams: function(t) {
        var o = JSON.parse(t), e = {};
        o.forEach(function(t) {
            e[t.name] = t.lists[0];
        }), this.setData({
            goodsSelectParams: e,
            goodsParams: o
        });
    },
    clickImg: function(t) {
        var o = t.target.dataset.posturl;
        wx.previewImage({
            current: o,
            urls: this.data.goodsInfo.goods.image
        });
    },
    getUserBuyList: function(t) {
        var e = this;
        o.req("integral/signinPurchase", {
            goods_id: t
        }).then(function(t) {
            0 == t.code && e.setData({
                userBuyList: t.data
            });
        });
    },
    chooseAdress: function() {
        wx.navigateTo({
            url: "/pages/adress-list/adress-list"
        });
    },
    initFm: function() {
        var t = this;
        o.getWxUserInfo(function(e) {
            if (!o.globalData.userInfo.openid) return setTimeout(function() {
                t.initFm();
            }, 200);
            var s = t;
            new a(o.globalData._fmOpt).getInfo({
                page: s,
                openid: o.globalData.userInfo.openid,
                unionid: o.globalData.userInfo.unionId,
                success: function(t) {
                    s.setData({
                        black_box: t
                    });
                },
                fail: function(t) {
                    console.log(t);
                },
                complete: function(t) {}
            });
        }, "getRes");
    },
    getGoodsList: function() {
        var t = this;
        this.setData({
            pageFlag: !1
        }), o.req("integral/signinGoods", this.data.query).then(function(o) {
            if (0 != o.code) return wx.showToast({
                title: o.errMsg,
                icon: "none"
            });
            var e = o.data.data.length == t.data.query.pageSize;
            t.setData({
                pageFlag: e,
                loads: e,
                goodsList: t.data.goodsList.concat(o.data.data)
            });
        });
    },
    showModel: function() {
        var t = this;
        if (!o.globalData.userInfo.phone) return this.selectComponent("#bind").show();
        if (this.data.goodsInfo.goods) {
            if (0 == this.data.goodsInfo.goods.rest) return wx.showToast({
                title: "此商品已换完",
                icon: "none"
            });
            parseInt(this.data.goodsInfo.goods.integral) > parseInt(this.data.goodsInfo.integral) ? this.selectComponent("#modelPop").showModal() : o.req("small/fengkong", {
                withdrawAmount: this.data.goodsInfo.goods.integral
            }).then(function(o) {
                t.setData({
                    wantLoading: !1
                }), 0 != o.code ? wx.showModal({
                    showCancel: !1,
                    title: "提示",
                    content: o.errMsg
                }) : t.selectComponent("#model").showModal();
            });
        }
    },
    closePop: function() {
        this.selectComponent("#modelPop").hideModal();
    },
    gohome: function() {
        wx.switchTab({
            url: "/pages/a-jifenShop/a-jifenShop"
        });
    },
    jifenPage: function() {
        wx.navigateTo({
            url: "/pages/a-task/a-task"
        });
    },
    getAdressInfo: function() {
        var e = this;
        o.req("user/address/getInfo").then(function(o) {
            0 == o.code && (e.setData({
                adressInfo: (0, t.adapterAddress)(o.data)
            }), e.data.adressInfo.id && e.getAdressPrice());
        });
    },
    getAdressPrice: function() {
        var t = this;
        o.req("integral/submitPostage", {
            addressId: this.data.adressInfo.id
        }).then(function(o) {
            if (0 != o.code) return wx.showToast({
                title: o.errMsg,
                icon: "none"
            });
            t.setData({
                adressPrice: o.data.postage
            });
        });
    },
    submitOrder: function() {
        var t = this;
        if (this.data.options.goodsId) {
            if (0 == this.data.adressPrice) return wx.showToast({
                title: "暂不支持港澳台地区发货",
                icon: "none"
            });
            if (!this.data.orderFlag) return wx.showToast({
                title: "请勿重复提交",
                icon: "none"
            });
            this.setData({
                orderFlag: !1
            });
            var e = Object.keys(this.data.goodsSelectParams).map(function(o) {
                return t.data.goodsSelectParams[o];
            }).join(";");
            o.req("integral/submitOrder", {
                blackBox: this.data.black_box,
                goods_id: this.data.options.goodsId,
                addressId: this.data.adressInfo.id,
                goods_note: e
            }, "post").then(function(t) {
                if (0 != t.code) return wx.showToast({
                    title: t.errMsg,
                    icon: "none"
                });
                wx.navigateTo({
                    url: "/pages/a-orderDetail/a-orderDetail?orderId=" + t.data.orderId
                });
            });
        }
    },
    hideModelTipe: function() {
        this.selectComponent("#modelPopTip").hideModal();
    },
    showModelTipe: function() {
        this.selectComponent("#modelPopTip").showModal();
    },
    onLoad: function(t) {
        e.Page.init(), this.initFm(), this.setData({
            options: t
        }), this.getGoodsList(), this.getGoodsDetails(t.goodsId);
    },
    onReady: function() {},
    onShow: function() {
        this.getAdressInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.pageFlag && (this.setData({
            "query.page": this.data.query.page + 1
        }), this.getGoodsList());
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "0元拿" + this.data.goodsInfo.goods.title,
            path: "/pages/a-productDetail/a-productDetail?goodsId=" + this.data.options.goodsId + "&fid=" + o.globalData.userInfo.openid,
            success: function(t) {
                e.Event.stat("click", {
                    name: "商品分享"
                }), o.getClickSource(4);
            }
        };
    }
});