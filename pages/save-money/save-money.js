var e = getApp(), t = require("../../sdk/mta.analysis.js");

Page({
    data: {
        overMoney: "",
        selectNumber: [ 1e3, 2e3, 3e3 ],
        selectMoney: "",
        payType: [],
        select: "weixin",
        moneyNum: 0,
        ready: !0,
        options: {}
    },
    getTotalPriceInfo: function() {
        var t = this;
        e.req("user/balance/info", {}, "post").then(function(e) {
            if (0 != e.code) return wx.showToast({
                title: e.errMsg,
                icon: "none"
            });
            t.data.overMoney < parseInt(e.data.availableBalance) && t.data.overMoney + "" != "" && t.selectComponent("#modal").showModal(), 
            t.setData({
                overMoney: parseInt(e.data.availableBalance)
            });
        });
    },
    selectThisType: function(e) {
        this.setData({
            select: e.currentTarget.dataset.type
        });
    },
    selectedThisMoney: function(e) {
        this.setData({
            selectMoney: e.currentTarget.dataset.m
        });
    },
    getPayTypes: function() {
        var t = this;
        e.req("order/paytype", {}, "post").then(function(e) {
            if (0 != e.code) return wx.showToast({
                title: e.errMsg,
                icon: "none"
            });
            t.setData({
                ready: !1,
                payType: e.data.filter(function(e) {
                    return "jdbt" != e.payType;
                })
            });
        });
    },
    formSubmit: function(t) {
        var o = this;
        if (e.globalData.userInfo.openid) {
            if (!this.data.selectMoney) return wx.showToast({
                title: "请输入金额",
                icon: "none"
            });
            var a = {
                success: function(e) {
                    o.getTotalPriceInfo(), o.selectComponent("#modal").showModal();
                },
                fail: function(e) {
                    console.log(e), o.selectComponent("#modalFail").showModal();
                }
            }, n = {
                user_id: e.globalData.userInfo.userId,
                open_id: e.globalData.userInfo.openid,
                pay_type: this.data.select,
                pay_fee: this.data.selectMoney
            };
            e.req("user/recharge", n, "post").then(function(e) {
                if (0 != e.code) return wx.showToast({
                    title: e.errMsg,
                    icon: "none"
                });
                "weixin" == o.data.select ? wx.requestPayment(Object.assign(e.data.parm, a)) : "zfb" == o.data.select && wx.setClipboardData({
                    data: e.data,
                    success: function(e) {
                        wx.getClipboardData({
                            success: function(e) {
                                wx.showModal({
                                    title: "支付链接已复制到剪切板",
                                    showCancel: !1
                                });
                            }
                        });
                    }
                });
            });
        }
    },
    onchange: function(e) {
        this.setData({
            selectMoney: parseInt(e.detail.value)
        });
    },
    closeModalFail: function() {
        this.selectComponent("#modalFail").hideModal();
    },
    closeModalSuccess: function() {
        this.selectComponent("#modal").hideModal(), this.data.options.beforUrl ? e.webUrlTo(decodeURIComponent(this.data.options.beforUrl), "redirectTo") : wx.navigateBack();
    },
    onLoad: function(e) {
        this.setData({
            options: e
        }), this.getPayTypes();
    },
    onReady: function() {},
    onShow: function() {
        t.Page.init(), this.getTotalPriceInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});