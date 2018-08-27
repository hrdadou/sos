var t = getApp(), a = require("../../sdk/mta.analysis.js"), e = 0;

Page({
    data: {
        showContact: !0,
        orderInfo: {},
        status: {
            paixia: !0,
            payed: !1,
            sended: !1,
            finished: !1,
            cancelBtn: !1
        },
        options: {},
        ticket: !1,
        selfPay: !1,
        statusNum: 0,
        confirm: !1
    },
    gohome: function() {
        wx.switchTab({
            url: "../a-buy/a-buy"
        });
    },
    toDetail: function() {
        wx.navigateTo({
            url: "/pages/a-productDetail/a-productDetail?goodsId=" + this.data.orderInfo.goodsId
        });
    },
    cancelOrder: function() {
        var a = this;
        wx.showModal({
            title: "确定取消订单？",
            content: "取消订单将扣除20%枚焕熊章",
            showCancel: !0,
            cancelText: "确定取消",
            cancelColor: "#6A6A6A ",
            confirmText: "我在想想",
            confirmColor: "#6D84DD",
            success: function(e) {
                if (e.cancel) {
                    var o = a.data.orderInfo.userId, n = a.data.orderInfo.integral_number, s = a.data.orderInfo.coruscate_bear;
                    t.req("integral/cancel", {
                        user_id: o,
                        integral_number: n,
                        number: s
                    }, "post").then(function(t) {
                        a.setData({
                            statusNum: 9
                        });
                    });
                }
            }
        });
    },
    confirm: function() {
        var a = this, e = this.data.orderInfo.userId, o = this.data.orderInfo.integral_number;
        t.req("integral/receipt", {
            userId: e,
            integral_number: o
        }, "post").then(function(t) {
            a.setData({
                status: {
                    paixia: !0,
                    payed: !0,
                    sended: !0,
                    finished: !0
                }
            });
        });
    },
    submit: function() {
        var a = this, e = t.globalData.userInfo.openid;
        t.req("integral/submitpay", {
            is_stamp_pay: 0,
            orderId: this.data.options.orderId,
            openId: e
        }, "post").then(function(t) {
            var e = t.data.parm;
            t.data.parm;
            var o = a;
            wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: "MD5",
                paySign: e.paySign,
                success: function(t) {
                    wx.showToast({
                        title: "您已支付成功",
                        icon: "none"
                    }), o.getOrderInfos(o.data.options.orderId);
                },
                fail: function(t) {
                    o.selectComponent("#modelPop").showModal();
                }
            });
        });
    },
    getOrderInfos: function(a) {
        var e = this;
        t.req("integral/payorderdetal", {
            orderId: a
        }).then(function(t) {
            t.data.status = parseInt(t.data.status), t.data.created_at = t.data.created_at.substring(0, 10), 
            e.setData({
                orderInfo: t.data,
                statusNum: t.data.status
            }), 1 == e.data.orderInfo.status && e.setData({
                status: {
                    paixia: !0,
                    payed: !1,
                    sended: !1,
                    finished: !1
                }
            }), 2 == e.data.orderInfo.status && e.setData({
                status: {
                    paixia: !0,
                    payed: !0,
                    sended: !1,
                    finished: !1,
                    cancelBtn: !0
                },
                selfPay: !1,
                ticket: !1
            }), 3 == e.data.orderInfo.status && e.setData({
                status: {
                    paixia: !0,
                    payed: !0,
                    sended: !0,
                    finished: !1,
                    cancelBtn: !1,
                    confirm: !0
                },
                selfPay: !1
            }), 4 == e.data.orderInfo.status && e.setData({
                status: {
                    paixia: !0,
                    payed: !0,
                    sended: !0,
                    finished: !0,
                    confirm: !1
                }
            }), 9 == e.data.orderInfo.status && e.setData({
                status: {
                    paixia: !1,
                    payed: !1,
                    sended: !1,
                    finished: !1
                },
                cancel: !0
            }), 1 == e.data.orderInfo.status && 1 == e.data.orderInfo.is_stamp && 9 != e.data.orderInfo.status && e.setData({
                ticket: !0
            }), 1 == e.data.orderInfo.status && 1 != e.data.orderInfo.is_stamp && 9 != e.data.orderInfo.status && e.setData({
                selfPay: !0
            });
        });
    },
    goInviteCollage: function() {
        this.cancel(), wx.navigateTo({
            url: "/pages/mail-card/mail-card"
        });
    },
    cancel: function() {
        this.selectComponent("#modelPopHasNoCollage").hideModal();
    },
    useCollage: function() {
        var a = this;
        if (!this.data.ticket) return this.selectComponent("#modelPopHasNoCollage").showModal();
        t.req("integral/submitpay", {
            is_stamp_pay: 1,
            orderId: this.data.options.orderId,
            openId: t.globalData.userInfo.openid
        }, "post").then(function(t) {
            if (0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            wx.showToast({
                title: "您已支付成功",
                icon: "none"
            }), a.getOrderInfos(a.data.options.orderId);
        });
    },
    closePop: function() {
        this.selectComponent("#modelPop").hideModal();
    },
    onLoad: function(t) {
        a.Page.init(), this.setData({
            options: t
        }), this.getOrderInfos(t.orderId);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onPageScroll: function(t) {
        var a = t.scrollTop;
        a > e && a > 100 && (e = a, this.setData({
            showContact: !1
        })), a < e && (e = a, this.setData({
            showContact: !0
        }));
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});