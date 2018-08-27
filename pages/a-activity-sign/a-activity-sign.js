var t = getApp(), i = require("../../sdk/mta.analysis.js");

Page({
    data: {
        siginData: {},
        goodsList: [],
        query: {
            pageSize: 20,
            page: 1
        },
        pageFlag: !0,
        loads: !0,
        showLoad: !0,
        siginLoading: !1,
        remind: !1
    },
    swichClick: function() {
        var i = this;
        wx.vibrateShort && wx.vibrateShort();
        var e = 0 == this.data.siginData.isSignRemind ? 1 : 0;
        t.req("integral/userSigninRemind", {
            isSignRemind: e
        }, "post").then(function(t) {
            if (0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            i.setData({
                "siginData.isSignRemind": e
            });
        });
    },
    godetail: function() {
        wx.navigateTo({
            url: "/pages/activity-detail/activity-detail"
        });
    },
    nowSigin: function() {
        var e = this;
        i.Event.stat("click", {
            name: "用户签到"
        }), this.setData({
            siginLoading: !0
        }), t.req("integral/userSignin", {}, "post").then(function(t) {
            if (0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            wx.showToast({
                title: "签到成功",
                icon: "none"
            }), e.getSiginTimeLine();
        });
    },
    getSiginTimeLine: function() {
        var i = this;
        t.req("integral/singinSolt", {}, "post").then(function(t) {
            if (0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            i.setData({
                siginLoading: !1,
                showLoad: !1,
                siginData: t.data
            });
        });
    },
    goInviteFrends: function() {
        this.getGid(function(i) {
            t.req("integral/userShare", {
                openGid: i
            }).then(function(t) {
                if (0 != t.code) return wx.showToast({
                    title: t.errMsg,
                    icon: "none"
                });
            });
        });
    },
    toTask: function() {
        i.Event.stat("click", {
            name: "签到页面点击进入任务列表"
        }), wx.navigateTo({
            url: "/pages/a-task/a-task"
        });
    },
    getGoodsList: function() {
        var i = this;
        this.setData({
            pageFlag: !1
        }), t.req("integral/signinGoods", this.data.query).then(function(t) {
            if (0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            var e = t.data.data.length == i.data.query.pageSize;
            i.setData({
                pageFlag: e,
                loads: e,
                goodsList: i.data.goodsList.concat(t.data.data)
            });
        });
    },
    closePop: function() {
        this.selectComponent("#modelPop").hideModal();
    },
    showModel: function() {
        this.selectComponent("#modelPop").showModal();
    },
    onLoad: function(t) {
        i.Page.init(), wx.showShareMenu({
            withShareTicket: !0
        }), this.getSiginTimeLine(), this.getGoodsList();
    },
    getGid: function(i) {
        wx.login({
            success: function(e) {
                t.globalData.code = e.code, t.globalData.shareTicket && wx.getShareInfo({
                    shareTicket: t.globalData.shareTicket,
                    success: function(e) {
                        t.decryptData(e.iv, e.encryptedData).then(function(t) {
                            0 == t.code && i(t.data.openGId);
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.pageFlag && (this.setData({
            "query.page": this.data.query.page + 1
        }), this.getGoodsList());
    },
    onShareAppMessage: function(i) {
        var e = this;
        return i.from, {
            title: "加入「焕熊」，各类数码产品0元拿",
            imageUrl: "https://img.rekoon.cn/intergal/search/hiabao.jpg",
            path: "/pages/a-jifenShop/a-jifenShop?fid=" + t.globalData.userInfo.openid,
            success: function(i) {
                e.goInviteFrends(), t.getClickSource(3);
            }
        };
    }
});