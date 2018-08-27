var n = getApp(), t = require("../../sdk/mta.analysis.js");

Page({
    data: {
        canNext: !1,
        codeNum: "",
        siginLoading: !1
    },
    onchange: function(n) {
        this.setData({
            codeNum: n.detail.value
        });
    },
    openBt: function() {
        wx.navigateTo({
            url: "/pages/jd-bt/jd-bt"
        });
    },
    ImmediatelyToReceive: function() {
        var t = this;
        if (!this.data.codeNum) return wx.showToast({
            title: "请输入兑换码",
            icon: "none"
        });
        this.setData({
            siginLoading: !0
        }), n.req("cashvoucher/exchange", {
            codeValue: this.data.codeNum,
            user_id: n.globalData.userInfo.userId
        }).then(function(n) {
            t.setData({
                siginLoading: !1
            }), wx.showToast({
                title: 0 != n.code ? n.errMsg : "兑换成功",
                icon: "none"
            }), t.setData({
                codeNum: ""
            });
        }).catch(function(n) {
            t.setData({
                siginLoading: !1
            });
        });
    },
    onLoad: function(n) {
        t.Page.init();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});