var e = require("../../utils/ajax"), n = getApp();

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        balanceInfo: 0,
        priceTotal: 0
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
    onLoad: function() {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), n.globalData.userInfo ? this.setData({
            userInfo: n.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? n.userInfoReadyCallback = function(n) {
            e.setData({
                userInfo: n.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(o) {
                n.globalData.userInfo = o.userInfo, e.setData({
                    userInfo: o.userInfo,
                    hasUserInfo: !0
                });
            }
        }), wx.hideLoading();
    },
    getUserInfo: function(e) {
        n.globalData.userInfo = e.detail.userInfo, this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: !0
        });
    },
    getBalanceInfo: function(n) {
        var o = this;
        (0, e.get)("/user/my/index", function(e) {
            o.setData({
                balanceInfo: e.balanceInfo
            });
        });
    },
    getPriceTotal: function(n) {
        var o = this;
        (0, e.get)("/spellGroup/redEnvelopeList", function(e) {
            o.setData({
                priceTotal: e.priceTotal
            });
        });
    }
});