var e = require("./utils/ajax"), t = require("./utils/baseUrl"), a = require("/sdk/mta.analysis.js");

App({
    getWxUserInfo: function(t, n) {
        var o = this;
        if ("getRes" == n) return "function" == typeof t && t(this.globalData.userInfo);
        Object.keys(this.globalData.userInfo).length ? "function" == typeof t && t(this.globalData.userInfo) : wx.getSetting({
            success: function(s) {
                if (0 == Object.keys(s.authSetting).length || !s.authSetting["scope.userInfo"]) return wx.reLaunch({
                    url: "/pages/login/login",
                    success: function() {
                        console.log("success");
                    },
                    fail: function() {
                        console.error("err");
                    }
                }), !1;
                s.authSetting["scope.userInfo"] && wx.login({
                    success: function(s) {
                        wx.getUserInfo({
                            success: function(i) {
                                var r = {};
                                r = i.userInfo, (0, e.post)("small/getuser", {
                                    encryptedData: i.encryptedData,
                                    iv: i.iv,
                                    code: s.code,
                                    nickName: r.nickName,
                                    imgUrl: r.avatarUrl,
                                    gopenid: n,
                                    source: o.globalData.initQuery.source,
                                    fid: o.globalData.initQuery.scene || o.globalData.initQuery.fid
                                }, function(e) {
                                    if (0 == e.code) {
                                        o.globalData.userInfo = Object.assign(r, e.data);
                                        try {
                                            wx.setStorageSync("token", o.globalData.userInfo.token);
                                        } catch (e) {
                                            wx.setStorage({
                                                key: "token",
                                                data: o.globalData.userInfo.token
                                            });
                                        }
                                        o.globalData.userInfo.openid && (a.Data.userInfo = {
                                            open_id: o.globalData.userInfo.openid,
                                            phone: o.globalData.userInfo.phone
                                        }, a.App.init({
                                            appID: "500618489",
                                            eventID: "500628835"
                                        })), o.checkedIsNewUser(o.globalData.userInfo.openid), "function" == typeof t && t(r);
                                    } else "function" == typeof t && t(r);
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    getUserInfos: function() {
        var e = this;
        this.req("user/first").then(function(t) {
            if (0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            e.globalData.userInfo = Object.assign(e.globalData.userInfo, t.data), console.log(e.globalData.userInfo);
        });
    },
    checkedIsNewUser: function(e) {
        var t = this;
        this.globalData.checkFlag || (this.globalData.checkFlag = !0, this.req("small/is_new_small", {
            openid: e
        }).then(function(a) {
            0 == a.code && (1 == a.data.status ? t.req("small/sendcoruscate", {
                openid: e
            }).then(function(e) {
                0 == e.code && 1 == e.data.status && (t.globalData.isNewUser = 1);
            }) : t.globalData.isNewUser = 2);
        }));
    },
    onShow: function(e) {
        this.getWxUserInfo();
    },
    onLaunch: function(e) {
        if (console.log(e), this.globalData.path = e.path, this.globalData.initQuery = e.query, 
        this.globalData.shareTicket = e.shareTicket, wx.getUpdateManager) {
            var t = wx.getUpdateManager();
            t.onCheckForUpdate(function(e) {
                console.log(e.hasUpdate);
            }), t.onUpdateReady(function() {
                wx.showModal({
                    showCancel: !1,
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success: function(e) {
                        e.confirm && t.applyUpdate();
                    }
                });
            }), t.onUpdateFailed(function() {});
        }
    },
    req: function(t, a) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "GET", o = wx.getStorageSync("token");
        return this.globalData.userInfo.token && (o = this.globalData.userInfo.token), (0, 
        e.request)(o, t, a, n).then(function(e) {
            return e;
        });
    },
    getFromIds: function(e) {
        if (-1 !== e.indexOf("mock")) return console.warn("模拟器内无法收集formId,请在真机调试");
        this.globalData.userInfo.openid && this.req("small/setfromid", {
            gopenid: this.globalData.userInfo.openid,
            fromid: e
        }, "post");
    },
    getClickSource: function(e) {
        Object.keys(this.globalData.userInfo).length && this.req("integral/click", {
            userId: this.globalData.userInfo.userId || "ceshi",
            source: e
        }, "post");
    },
    decryptData: function(e, t) {
        return this.req("small/decryptData", {
            code: this.globalData.code,
            iv: e,
            encryptedData: t
        }).then(function(e) {
            return e;
        });
    },
    webUrlTo: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "navigateTo";
        Object.keys(this.globalData.userInfo).length && wx[t]({
            url: "../a-index/a-index?openid=" + this.globalData.userInfo.openid + "&token=" + this.globalData.userInfo.token + "&url=" + encodeURIComponent(e)
        });
    },
    globalData: {
        _fmOpt: {
            partnerCode: "lidian",
            appName: "huanxiong_web",
            env: "PRODUCTION"
        },
        path: "",
        pageShow: !1,
        initQuery: {
            source: ""
        },
        userInfo: {},
        openid: "",
        baseUrl: t.BASE_URL,
        web_url: t.WEB_URL
    }
});