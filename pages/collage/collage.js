var e = require("../../utils/vuefy.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/collageTypes.js")), a = getApp();

Page({
    data: {
        teamInfo: {},
        routerParams: {},
        time: new Date().getTime(),
        _time: 1e3,
        show: 0,
        timehour: "",
        timeminute: "",
        timesecond: "",
        userId: 1,
        showCollage: !1,
        showMask: !1,
        classes: "",
        hasUserInfo: !0,
        codeUrl: "",
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        collageType: t.default
    },
    onLoad: function(t) {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), console.log(t), (0, e.computed)(this, {
            nullLen: function() {
                return this.data.teamInfo.userInfoList ? 3 - this.data.teamInfo.userInfoList.length : 3;
            },
            dateSeven: function() {
                if (this.data.teamInfo.expiration_at) {
                    var e = new Date(Date.parse(this.data.teamInfo.expiration_at.replace(/-/g, "/"))), t = new Date(e);
                    return t.setDate(e.getDate() + 7), t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
                }
            },
            teamHeader: function() {
                if (this.data.teamInfo.userInfoList) {
                    var e = "";
                    return this.data.teamInfo.userInfoList.forEach(function(t) {
                        1 === parseInt(t.role) && (e = t.userName);
                    }), e;
                }
            },
            isNewUser: function() {
                if (this.data.teamInfo.status) {
                    var e = parseInt(this.data.teamInfo.status), t = !1;
                    return 4 !== e && 10 !== e && 11 !== e || (t = !0), t;
                }
            },
            timeOver: function() {
                if (this.data.teamInfo.expiration_at) return new Date(Date.parse(this.data.teamInfo.expiration_at.replace(/-/g, "/"))).getTime();
            }
        }), (0, e.watch)(this, {}), this.getTime(), this.setData({
            routerParams: t
        }), a.getWxUserInfo(function(e) {
            if (-1 == e.code) return wx.showToast({
                title: "登录失败，请授权",
                icon: "success",
                duration: 2e3
            }), wx.hideLoading(), void o.setData({
                showCollage: !0,
                hasUserInfo: !1
            });
            a.globalData.userInfo = e, console.log(e), t.spellGroupId && o.getTeamDetail(), 
            0 === parseInt(t.head) && o.initiateTeam();
        }, t.openId);
    },
    buttonClick: function(e) {
        a.getFromIds(e.detail.formId);
        var o = e.target.dataset, s = t.default[o.itemStatue][o.index].event;
        "invite" === s ? console.log("邀请") : "buildNew" === s ? (console.log("新建"), this.initiateTeam()) : "myTeam" === s ? (this.queryMyTeam(), 
        console.log("查看我的红包团")) : "joinTeam" === s ? (console.log("加入红包团"), this.joinTeam()) : "nowUse" !== s && "goSell" !== s || (console.log("去首页"), 
        wx.navigateTo({
            url: "/pages/index/index"
        }));
    },
    onShareAppMessage: function(e) {
        return "button" === e.from && console.log(e.target), {
            title: a.globalData.userInfo.nickName + "邀请你拆红包",
            path: "/pages/index/index?spellGroupId=" + this.data.teamInfo.spellGroupId + "&sourceType=3&user=" + this.data.userId
        };
    },
    setDates: function() {
        var e = this.data.timeOver - this.data.time, t = parseInt(e / 36e5) < 10 ? "0" + parseInt(e % 864e5 / 36e5) : parseInt(e % 864e5 / 36e5), a = parseInt(e % 36e5 / 6e4) < 10 ? "0" + parseInt(e % 36e5 / 6e4) : parseInt(e % 36e5 / 6e4), o = parseInt(e % 6e4 / 1e3) < 10 ? "0" + parseInt(e % 6e4 / 1e3) : parseInt(e % 6e4 / 1e3);
        this.setData({
            timehour: t,
            timeminute: a,
            timesecond: o
        });
    },
    getTime: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                time: new Date().getTime()
            }), e.setDates(), parseInt(e.data.timeOver) - parseInt(e.data.time) < 1e3 ? e.setData({
                show: 2
            }) : (e.setData({
                show: 1,
                _time: 1e3
            }), e.getTime());
        }, this.data._time);
    },
    initListImg: function(e) {
        return e.userInfoList.forEach(function(e) {
            e.imgUrl = -1 != e.imgUrl.indexOf("http") ? e.imgUrl : "//img.rekoon.cn/" + e.imgUrl;
        }), e;
    },
    initiateTeam: function(e) {
        var t = this;
        a.req("spellGroup/initiateSpellGroup", {
            sourceType: 1
        }, "get", e).then(function(e) {
            0 == e.code && (wx.hideLoading(), t.setData({
                showCollage: !0,
                teamInfo: t.initListImg(e.data)
            }));
        });
    },
    joinTeam: function() {
        var e = this;
        a.req("spellGroup/addSpellGroup", {
            spellGroupId: this.data.routerParams.spellGroupId
        }).then(function(t) {
            0 == t.code && e.setData({
                teamInfo: t.data
            });
        });
    },
    getTeamDetail: function() {
        var e = this, t = {
            spellGroupId: this.data.routerParams.spellGroupId
        };
        a.req("spellGroup/spellGroupDetail", t, "get").then(function(t) {
            if (console.log(t), 0 == t.code) {
                wx.hideLoading(), e.setData({
                    showCollage: !0,
                    teamInfo: e.initListImg(t.data)
                }), e.getCodeUrl();
                var a = parseInt(e.data.teamInfo.status);
                10 === a ? e.setData({
                    classes: "isNewUserOver"
                }) : 4 !== a && 11 !== a || e.setData({
                    classes: "isNewUser"
                });
            }
        });
    },
    getCodeUrl: function() {
        var e = this;
        a.req("wechat/getInviteCodeUrl", {
            user_id: this.data.teamInfo.spellGroupUserId
        }).then(function(t) {
            0 == t.code && e.setData({
                codeUrl: t.data.code_url
            });
        });
    },
    queryMyTeam: function() {
        a.req("spellGroup/showSpellGroupDetail", {
            spellGroupId: this.data.routerParams.spellGroupId
        }).then(function(e) {
            0 == e.code && e.data.spellGroupId && wx.navigateTo({
                url: "/pages/collage/collage?spellGroupId=" + e.data.spellGroupId
            });
        });
    },
    getUserInfo: function(e) {
        if (console.log(e), e.detail.userInfo) {
            var t = {}, o = this;
            t = e.detail.userInfo, wx.login({
                success: function(s) {
                    a.req("small/getuser", {
                        gopenid: o.data.routerParams.openId,
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                        code: s.code,
                        nickName: t.nickName,
                        imgUrl: t.avatarUrl
                    }, "post").then(function(e) {
                        if (0 == e.code) {
                            t.openid = e.data.openid, t.token = e.data.token, a.globalData.userInfo = t, wx.setStorageSync("token", t.token);
                            try {
                                wx.setStorageSync("token", t.token);
                            } catch (e) {
                                wx.setStorage({
                                    key: "token",
                                    data: t.token
                                });
                            }
                            o.setData({
                                hasUserInfo: !0
                            }), o.data.routerParams.spellGroupId && o.getTeamDetail(), 0 === parseInt(o.data.routerParams.head) && o.initiateTeam();
                        }
                    });
                }
            });
        }
    },
    prviewImg: function() {
        wx.previewImage({
            current: this.data.codeUrl,
            urls: [ this.data.codeUrl ]
        });
    },
    showMsks: function() {
        this.setData({
            showMask: !0
        });
    },
    hideMsk: function() {
        this.setData({
            showMask: !1
        });
    },
    scanCodes: function() {
        wx.scanCode({
            success: function(e) {
                console.log(e);
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    saveImgToPhotosAlbumTap: function() {
        var e = this;
        wx.downloadFile({
            url: e.data.codeUrl,
            success: function(t) {
                console.log(t), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(e) {
                        console.log(e), wx.showToast({
                            title: "已保存",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "长按保存二维码",
                            icon: "success",
                            duration: 3e3
                        }), setTimeout(function() {
                            e.prviewImg();
                        }, 600), console.log(t), console.log("fail");
                    }
                });
            },
            fail: function(e) {
                console.log(e), console.log("fail");
            }
        });
    }
});