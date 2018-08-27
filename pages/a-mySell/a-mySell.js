require("../../utils/ajax");

var t = getApp();

Page({
    data: {
        params: {
            page: 1,
            pageSize: 20
        },
        lists: []
    },
    getLists: function() {
        var a = this;
        this.data.params;
        t.req("sell/lists", this.data.params, "post").then(function(t) {
            t.data.lists.forEach(function(t) {
                t.sellerPrice = parseInt(t.sellerPrice) / 1e3;
            }), a.setData({
                lists: t.data.lists
            });
        });
    },
    toDetail: function() {},
    canclOrder: function() {},
    onLoad: function() {
        this.getLists();
    }
});