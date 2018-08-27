var a = getApp(), t = require("../../sdk/mta.analysis.js");

Page({
    data: {
        list: [],
        query: {
            page: 1,
            pageSize: 20
        },
        pageFlag: !0,
        loads: !0,
        showLoad: !0
    },
    getList: function() {
        var t = this;
        this.setData({
            pageFlag: !1
        }), a.req("integral/list", this.data.query).then(function(a) {
            if (t.setData({
                showLoad: !1
            }), 0 == a.code) {
                var e = a.data.data.length == t.data.query.pageSize;
                t.setData({
                    pageFlag: e,
                    loads: e,
                    list: t.data.list.concat(a.data.data)
                });
            }
        });
    },
    onLoad: function(a) {
        t.Page.init(), this.getList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.pageFlag && (this.setData({
            "query.page": this.data.query.page + 1
        }), this.getList());
    },
    onShareAppMessage: function() {}
});