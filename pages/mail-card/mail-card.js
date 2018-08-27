var e = getApp(), t = require("../../sdk/fm-1.0.1.js");

Page({
    data: {
        firstJoin: !1,
        goodsList: [],
        query: {
            pageSize: 20,
            page: 1
        },
        totalJifen: 0,
        pageFlag: !0,
        loads: !0,
        ready: !0,
        options: {},
        GrounpStatus: 1,
        teamInfos: {},
        nullLength: 0,
        isTeamHead: !1,
        black_box: "",
        teamInfo: {
            team_id: ""
        }
    },
    initFm: function() {
        var a = this;
        e.getWxUserInfo(function(o) {
            if (!e.globalData.userInfo.openid) return setTimeout(function() {
                a.initFm();
            }, 200);
            var n = a;
            new t(e.globalData._fmOpt).getInfo({
                page: n,
                openid: e.globalData.userInfo.openid,
                unionid: e.globalData.userInfo.unionId,
                success: function(e) {
                    n.setData({
                        black_box: e
                    });
                },
                fail: function(e) {
                    console.log(e);
                },
                complete: function(e) {}
            });
        }, "getRes");
    },
    getGoodsList: function() {
        var t = this;
        this.setData({
            pageFlag: !1
        }), e.req("integral/signinGoods", this.data.query).then(function(e) {
            if (0 != e.code) return wx.showToast({
                title: e.errMsg,
                icon: "none"
            });
            var a = e.data.data.length == t.data.query.pageSize;
            t.setData({
                pageFlag: a,
                loads: a,
                goodsList: t.data.goodsList.concat(e.data.data)
            });
        });
    },
    getTotalJifen: function() {
        var t = this;
        e.req("integral/userRaccoon").then(function(e) {
            if (0 != e.code) return wx.showToast({
                title: e.errMsg,
                icon: "none"
            });
            t.options.team_id || (t.setData({
                ready: !1
            }), wx.stopPullDownRefresh()), t.setData({
                totalJifen: e.data.integral
            });
        });
    },
    createTeamGroup: function() {
        var t = this;
        e.req("freeCourier/startGroup", {
            userid: e.globalData.userInfo.userId,
            blackBox: this.data.black_box
        }).then(function(a) {
            return 0 != a.code ? wx.showToast({
                title: a.msg,
                icon: "none"
            }) : "已存在" == a.msg ? t.onLoad({
                team_id: a.team_id,
                userId: e.globalData.userInfo.userId
            }) : (t.onLoad({
                team_id: a.data,
                userId: e.globalData.userInfo.userId
            }), void t.setData({
                "teamInfo.team_id": a.data
            }));
        });
    },
    joinTeam: function(t, a) {
        var o = this;
        e.getWxUserInfo(function(n) {
            if (!e.globalData.userInfo.userId) return setTimeout(function() {
                o.joinTeam(t, a);
            }, 300);
            e.globalData.userInfo.userId && e.req("freeCourier/friendsHelp", {
                userid: e.globalData.userInfo.userId,
                team_id: t,
                blackBox: o.data.black_box,
                openId: e.globalData.userInfo.openid
            }).then(function(e) {
                o.setData({
                    GrounpStatus: e.status
                }), 7 == e.status && o.selectComponent("#modelPopOldUser").showModal(), 2 == e.status && o.selectComponent("#modelPop").showModal(), 
                o.getTeamDetail(t, a);
            });
        }, "getRes");
    },
    memberCreateTeam: function() {
        this.closeModal(), this.onLoad({});
    },
    getTeamDetail: function(t, a) {
        var o = this;
        e.req("freeCourier/getTeamData", {
            userid: a,
            team_id: t
        }).then(function(t) {
            if (0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            wx.stopPullDownRefresh(), t.data.Members.forEach(function(e, t) {
                e.imgUrl.indexOf("http") < 0 && (e.imgUrl = "https://img.rekoon.cn/" + e.imgUrl);
            }), o.setData({
                isTeamHead: t.data.team.userId == e.globalData.userInfo.userId,
                ready: !1,
                teamInfos: t.data,
                nullLength: 5 - t.data.Members.length
            });
        });
    },
    checkUserHasTeam: function() {
        var t = this;
        e.getWxUserInfo(function(a) {
            if (!e.globalData.userInfo.userId) return setTimeout(function() {
                t.checkUserHasTeam();
            }, 300);
            e.req("freeCourier/getTeamList", {
                user_id: e.globalData.userInfo.userId
            }).then(function(a) {
                t.options.team_id || (t.setData({
                    ready: !1
                }), wx.stopPullDownRefresh()), a.data && t.onLoad({
                    userId: e.globalData.userInfo.userId,
                    team_id: a.data
                });
            });
        });
    },
    toHome: function() {
        wx.switchTab({
            url: "/pages/a-jifenShop/a-jifenShop"
        });
    },
    toIntergelShop: function() {
        this.closeModal(), wx.switchTab({
            url: "/pages/a-jifenShop/a-jifenShop"
        });
    },
    closeModal: function() {
        this.selectComponent("#modelPopOldUser").hideModal(), this.selectComponent("#modelPop").hideModal();
    },
    closeModalHelp: function() {
        this.selectComponent("#modelHelp").hideModal();
    },
    showModalHelp: function() {
        this.selectComponent("#modelHelp").showModal();
    },
    goTask: function() {
        wx.switchTab({
            url: "/pages/a-jifenShop/a-jifenShop"
        });
    },
    onLoad: function(e) {
        this.getTotalJifen(), this.initFm(), this.setData({
            options: e
        }), e.team_id ? this.joinTeam(e.team_id, e.userId) : this.checkUserHasTeam(), this.getGoodsList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(this.data.options), this.data.options.team_id || wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.pageFlag && (this.setData({
            "query.page": this.data.query.page + 1
        }), this.getGoodsList());
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "助力好友拼团拿免邮券，立即0元换好物！",
            imageUrl: "https://img.rekoon.cn/integra/banner/muban.png",
            path: "/pages/mail-card/mail-card?team_id=" + this.data.options.team_id + "&userId=" + e.globalData.userInfo.userId,
            success: function(e) {
                wx.showToast({
                    title: "分享成功",
                    icon: "none"
                });
            }
        };
    }
});