require("../../utils/ajax");

var e = getApp(), t = require("../../sdk/mta.analysis.js");

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        phoneNumber: "",
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        balanceInfo: 0,
        priceTotal: 0,
        phoneShow: !1,
        collageTotalList: 0,
        showLoad: !0
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    call: function() {
        wx.makePhoneCall({
            phoneNumber: "4008399097",
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    ticket: function() {
        wx.navigateTo({
            url: "../a-ticket/a-ticket"
        });
    },
    goWallet: function() {
        var e = JSON.stringify(this.data.userInfo);
        wx.navigateTo({
            url: "../m-wallet/m-wallet?data=" + e
        });
    },
    onLoad: function() {
        t.Page.init(), this.getUser(), this.getPriceTotal(), this.getCollageLength();
    },
    getUser: function() {
        var t = this;
        e.req("user/first").then(function(e) {
            t.setData({
                showLoad: !1
            });
            var a = e.data.phone, n = a ? a.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2") : "";
            t.setData({
                userInfo: e.data,
                phoneNumber: n
            }), t.data.userInfo.phone && t.setData({
                phoneShow: !0
            });
        });
    },
    getUserInfo: function(t) {
        e.globalData.userInfo = t.detail.userInfo, wx.setStorage({
            key: "userInfo",
            value: "e.detail.userInfo"
        }), this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        });
    },
    webUrlto: function(t) {
        e.webUrlTo(t.currentTarget.dataset.posturl);
    },
    getCollageLength: function() {
        var t = this;
        e.req("integral/userCouponList").then(function(e) {
            0 == e.code && t.setData({
                collageTotalList: e.data.data.length
            });
        });
    },
    navGo: function() {
        wx.navigateTo({
            url: "/pages/a-jifenList/a-jifenList"
        });
    },
    toSet: function() {
        var e = JSON.stringify(this.data.userInfo);
        wx.navigateTo({
            url: "../a-set/a-set?data=" + e
        });
    },
    getBalanceInfo: function(t) {
        var a = this;
        e.req("user/my/index").then(function(e) {
            a.setData({
                balanceInfo: parseInt(e.data.availableBalance)
            });
        });
    },
    onShow: function() {
        this.getBalanceInfo(), console.log(111);
    },
    getPriceTotal: function(t) {
        var a = this;
        e.req("spellGroup/redEnvelopeList").then(function(e) {
            a.setData({
                priceTotal: e.data.total
            });
        });
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "加入「焕熊」，各类数码产品0元拿",
            imageUrl: "https://img.rekoon.cn/intergal/search/hiabao.jpg",
            path: "/pages/a-jifenShop/a-jifenShop?fid=" + e.globalData.userInfo.openid,
            success: function(e) {}
        };
    }
});