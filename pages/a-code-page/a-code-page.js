var n = getApp(), t = require("../../sdk/mta.analysis.js");

Page({
    data: {
        url: "",
        loadReady: !0
    },
    onLoad: function(n) {
        t.Page.init(), this.geturl();
    },
    previw: function() {
        wx.previewImage({
            current: this.data.url,
            urls: [ this.data.url ]
        });
    },
    imageLoad: function() {
        this.setData({
            loadReady: !1
        });
    },
    geturl: function() {
        var t = this;
        n.getWxUserInfo(function(e) {
            n.req("small/createposter", {
                openid: e.openid
            }).then(function(n) {
                0 == n.code ? (wx.hideLoading(), t.setData({
                    url: n.data.path
                })) : t.geturl();
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});