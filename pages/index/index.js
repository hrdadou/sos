var a = require("../../utils/ajax"), e = getApp(), o = require("../../sdk/mta.analysis.js");

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: !0,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        webUrl: e.globalData.baseUrl,
        urlParams: {}
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onShow: function() {
        this.data.userInfo.openid && e.globalData.pageShow && wx.switchTab({
            url: "/pages/a-jifenShop/a-jifenShop"
        });
    },
    onLoad: function(a) {
        var t = this;
        e.globalData.pageShow = !1, o.Page.init(), this.setData({
            urlParams: a
        }), wx.showLoading({
            title: "登录中..."
        }), e.getWxUserInfo(function(o) {
            console.log(o), wx.hideToast(), -1 == o.code && (wx.showToast({
                title: "请授权完成登录",
                icon: "success",
                duration: 2e3
            }), t.setData({
                hasUserInfo: !1
            })), o.openid && (e.globalData.userInfo = o, t.setData({
                userInfo: o
            }), wx.navigateTo({
                url: "../a-index/a-index?openid=" + o.openid + "&token=" + o.token + "&spellGroupId=" + a.spellGroupId + "&url=" + a.url
            }));
        });
    },
    getUserInfo: function(o) {
        if (console.log(o), o.detail.userInfo) {
            var t = this, n = o.detail.userInfo, i = {
                encryptedData: o.detail.encryptedData,
                iv: o.detail.iv,
                nickName: n.nickName || "***",
                imgUrl: n.avatarUrl
            };
            wx.login({
                success: function(o) {
                    i.code = o.code, (0, a.post)("small/getuser", i, function(a) {
                        0 == a.code && (n.openid = a.data.openid, n.token = a.data.token, e.globalData.userInfo = n, 
                        a.data.openid && (t.data.urlParams.url ? wx.navigateTo({
                            url: "../a-index/a-index?openid=" + a.data.openid + "&token=" + a.data.token + "&url=" + t.data.urlParams.url
                        }) : wx.navigateTo({
                            url: "../a-index/a-index?openid=" + a.data.openid + "&token=" + a.data.token
                        })));
                    });
                }
            });
        }
    }
});