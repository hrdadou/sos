var a = getApp(), n = require("../../sdk/mta.analysis.js");

Page({
    data: {
        ready: !0,
        amount: 0,
        availableBalance: 0,
        frozenBalance: 0,
        userInfo: {},
        phone: ""
    },
    getUserBalance: function() {
        var n = this;
        a.req("user/balance/info", {}, "post").then(function(a) {
            n.setData({
                ready: !1
            }), 0 == a.code && (console.log(a), n.setData({
                amount: a.data.amount,
                availableBalance: a.data.availableBalance,
                frozenBalance: a.data.frozenBalance
            }));
        });
    },
    goDetail: function() {
        a.webUrlTo("/user/walletDetail");
    },
    topUp: function() {
        wx.navigateTo({
            url: "/pages/save-money/save-money"
        });
    },
    Withdraw: function() {
        "" == this.data.userInfo.phone ? wx.showModal({
            content: "提现需绑定手机号，请前去绑定手机号后进行提现～",
            showCancel: !1,
            confirmText: "立即绑定",
            success: function(n) {
                a.webUrlTo("/user/settings");
            }
        }) : this.data.availableBalance < 1 && wx.showModal({
            showCancel: !1,
            content: "可提现金额少于1元, 不能够提现！",
            confirmText: "确定"
        }), "" !== this.data.userInfo.phone && this.data.availableBalance >= 1 && a.webUrlTo("/user/withdrawals");
    },
    onLoad: function(a) {
        n.Page.init();
    },
    onReady: function() {},
    onShow: function() {
        this.getUserBalance();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});