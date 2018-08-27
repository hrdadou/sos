var a = getApp(), t = require("../../sdk/mta.analysis.js"), e = {
    1: "提交订单",
    2: "支付成功",
    3: "已发货",
    4: "已完成",
    9: "取消订单"
};

Page({
    data: {
        goodsList: [],
        query: {
            pageSize: 20,
            page: 1
        },
        pageFlag: !0,
        loads: !0,
        loadReady: !0
    },
    goDetail: function(a) {
        wx.navigateTo({
            url: "/pages/a-orderDetail/a-orderDetail?orderId=" + a.currentTarget.dataset.orderid
        });
    },
    click: function() {
        wx.navigateTo({
            url: "/pages/a-task/a-task"
        });
    },
    getGoodsList: function(t) {
        var o = this;
        this.setData({
            pageFlag: !1
        }), a.req("integral/exchangeList", this.data.query).then(function(a) {
            if (wx.hideLoading(), o.setData({
                loadReady: !1
            }), 0 != a.code) return wx.showToast({
                title: a.errMsg,
                icon: "none"
            });
            var n = a.data.data.length == o.data.query.pageSize;
            a.data.data.forEach(function(a) {
                a.statusText = e[a.status];
            }), o.setData({
                pageFlag: n,
                loads: n,
                goodsList: t ? a.data.data : o.data.goodsList.concat(a.data.data)
            });
        });
    },
    onLoad: function(a) {
        t.Page.init();
    },
    onReady: function() {},
    onShow: function() {
        this.getGoodsList(1);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.pageFlag && (this.setData({
            "query.page": this.data.query.page + 1
        }), this.getGoodsList());
    },
    onShareAppMessage: function() {}
});