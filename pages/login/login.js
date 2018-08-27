var a = require("../../utils/ajax"), e = require("../../utils/util"), n = getApp(), o = require("../../sdk/mta.analysis.js"), t = require("../../sdk/fm-1.0.1.js");

Page({
    data: {
        params: {}
    },
    onLoad: function(a) {
        o.Page.init(), this.setData({
            params: a
        });
    },
    getUserInfo: function(i) {
        if (i.detail.userInfo) {
            var l = this, u = i.detail.userInfo, s = {
                encryptedData: i.detail.encryptedData,
                iv: i.detail.iv,
                nickName: u.nickName || "***",
                imgUrl: u.avatarUrl,
                source: n.globalData.initQuery.source,
                fid: n.globalData.initQuery.scene || n.globalData.initQuery.fid
            };
            wx.showLoading({
                title: "登录中..."
            }), wx.login({
                success: function(i) {
                    n.globalData.code = i.code, s.code = i.code, (0, a.post)("small/getunionid", s, function(i) {
                        0 != i.code && (i = {
                            data: {}
                        }), new t(n.globalData._fmOpt).getInfo({
                            page: l,
                            openid: i.data.openId,
                            unionid: i.data.unionId,
                            success: function(t) {
                                wx.login({
                                    success: function(i) {
                                        s.blackBox = t, s.code = i.code, (0, a.post)("small/getuser", s, function(a) {
                                            if (0 == a.code) {
                                                try {
                                                    wx.setStorageSync("token", a.data.token);
                                                } catch (e) {
                                                    wx.setStorage({
                                                        key: "token",
                                                        data: a.data.token
                                                    });
                                                }
                                                n.globalData.userInfo = Object.assign(u, a.data), n.checkedIsNewUser(n.globalData.userInfo.openid), 
                                                n.globalData.userInfo.openid && (o.Data.userInfo = {
                                                    open_id: n.globalData.userInfo.openid,
                                                    phone: n.globalData.userInfo.phone
                                                }, o.App.init({
                                                    appID: "500618489",
                                                    eventID: "500628835"
                                                }));
                                                var t = 0 == n.globalData.path.indexOf("/") ? n.globalData.path : "/" + n.globalData.path;
                                                "/page/index/index" != t ? wx.switchTab({
                                                    url: t,
                                                    fail: function() {
                                                        wx.reLaunch({
                                                            url: (0, e.builder_url)(t, n.globalData.initQuery)
                                                        });
                                                    }
                                                }) : wx.navigateTo({
                                                    url: "../a-index/a-index?openid=" + u.openid + "&token=" + u.token + "&url=" + n.globalData.initQuery.url
                                                });
                                            }
                                        });
                                    }
                                });
                            },
                            fail: function(a) {
                                console.log(a);
                            },
                            complete: function(a) {}
                        });
                    });
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});