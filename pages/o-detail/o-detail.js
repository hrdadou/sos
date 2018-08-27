var t = require("../../utils/ajax");

Page({
    data: {
        good: {},
        nowSeeNumber: 0,
        isOpen: !0
    },
    getGoodDetail: function() {
        var e = this;
        (0, t.post)("/buy/product/first", {
            productId: "4882"
        }, function(t) {
            e.setData({
                good: t.data
            });
        });
    },
    getNowSeeNumber: function() {
        var t = new Date().getHours();
        t >= 0 && t < 6 ? this.setData({
            nowSeeNumber: Math.floor(8 * Math.random() + 0)
        }) : t >= 6 && t < 20 ? this.setData({
            nowSeeNumber: Math.floor(12 * Math.random() + 2)
        }) : t >= 20 && t < 24 ? this.setData({
            nowSeeNumber: Math.floor(16 * Math.random() + 5)
        }) : this.setData({
            nowSeeNumber: 1
        });
    },
    closetop: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                isOpen: !1
            });
        }, 1e3);
    },
    onLoad: function() {
        this.getGoodDetail(), this.getNowSeeNumber(), this.closetop();
    }
});