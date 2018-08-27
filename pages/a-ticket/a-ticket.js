function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), o = require("../../sdk/mta.analysis.js");

Page((e = {
    data: {
        ticketLists: [],
        query: {
            page: 1,
            pageSize: 20
        },
        loads: !0,
        showLoad: !0
    },
    rules: function() {
        this.selectComponent("#modelPop").showModal();
    },
    closePop: function() {
        this.selectComponent("#modelPop").hideModal();
    },
    use: function() {
        wx.switchTab({
            url: "../a-jifenShop/a-jifenShop"
        });
    }
}, t(e, "closePop", function() {
    this.selectComponent("#modelPop").hideModal();
}), t(e, "emptyClick", function() {
    wx.navigateTo({
        url: "/pages/mail-card/mail-card"
    });
}), t(e, "onLoad", function(t) {
    o.Page.init(), this.getList();
}), t(e, "getList", function() {
    var t = this;
    a.req("integral/userCouponList", this.data.query).then(function(e) {
        if (t.setData({
            showLoad: !1
        }), 0 != e.code) return wx.showToast({
            title: e.errMsg,
            icon: "none"
        });
        e.data.data.forEach(function(t) {
            t.expire_time = t.expire_time.substring(0, 10);
        }), t.setData({
            loads: t.data.query.pageSize == e.data.data.length,
            ticketLists: t.data.ticketLists.concat(e.data.data)
        });
    });
}), t(e, "onReady", function() {}), t(e, "onShow", function() {}), t(e, "onHide", function() {}), 
t(e, "onUnload", function() {}), t(e, "onPullDownRefresh", function() {}), t(e, "onReachBottom", function() {
    this.data.loads && (this.setData({
        "query.page": this.data.query.page + 1
    }), this.getList());
}), t(e, "onShareAppMessage", function() {}), e));