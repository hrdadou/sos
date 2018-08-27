var e = getApp(), n = require("../../sdk/mta.analysis.js"), o = require("../../sdk/fm-1.0.1.js");

Page({
    data: {
        webUrl: "",
        options: {}
    },
    onShow: function() {
        e.globalData.pageShow = !0;
    },
    bindGetMsg: function(e) {
        console.log(e.detail.data), e.detail.data.forEach(function(e) {
            "h5_url" == e.event && n.Event.stat("h5_url", {
                url: e.val
            }), "click" == e.event && n.Event.stat("click", {
                name: e.val
            });
        });
    },
    initFm: function() {
        var n = this;
        e.getWxUserInfo(function(t) {
            if (!e.globalData.userInfo.openid) return setTimeout(function() {
                n.initFm();
            }, 200);
            var a = n;
            new o(e.globalData._fmOpt).getInfo({
                page: a,
                openid: e.globalData.userInfo.openid,
                unionid: e.globalData.userInfo.unionId,
                success: function(n) {
                    var o = a.data.options;
                    void 0 !== o.url && "undefined" != o.url ? a.setData({
                        webUrl: "" + e.globalData.web_url + decodeURIComponent(o.url) + (-1 !== decodeURIComponent(o.url).indexOf("?") ? "&" : "?") + "openid=" + o.openid + "&token=" + o.token + "&blackBox=" + n
                    }) : a.setData({
                        webUrl: e.globalData.web_url + "/?openid=" + o.openid + "&token=" + o.token + "&spellGroupId=" + o.spellGroupId + "&blackBox=" + n
                    });
                },
                fail: function(e) {
                    console.log(e);
                },
                complete: function(e) {}
            });
        }, "getRes");
    },
    onLoad: function(e) {
        this.setData({
            options: e
        }), n.Page.init(), this.initFm();
    },
    onShareAppMessage: function(n) {
        return n.from, {
            title: "加入「焕熊」，各类数码产品0元拿",
            imageUrl: "https://img.rekoon.cn/intergal/search/hiabao.jpg",
            path: "/pages/a-jifenShop/a-jifenShop?fid=" + e.globalData.userInfo.openid,
            success: function(e) {
                console.error(2222);
            }
        };
    }
});