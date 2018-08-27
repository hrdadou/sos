var t = getApp(), a = require("../../sdk/mta.analysis.js");

Page({
    data: {
        satisfaction: "",
        total: 0,
        starimg: "//shop-img.rekoon.cn/img/sold_home_speak_star_notchoose.png",
        lightstarimg: "//shop-img.rekoon.cn/img/sold_home_speak_star_choose.png",
        commentList: [],
        params: {
            page: 1,
            pageSize: 10
        },
        condition: {
            10: "全新",
            99: "99新",
            95: "95新",
            9: "9成新",
            85: "85新",
            8: "85新"
        },
        text: "点击加载更多",
        buy: 1,
        ready: !0
    },
    imgClick: function(t) {
        var a = [];
        this.data.commentList[t.currentTarget.dataset.index].images.forEach(function(t) {
            a.push(t.imgUrl);
        }), wx.previewImage({
            current: t.currentTarget.dataset.img,
            urls: a
        }), console.log(t.currentTarget.dataset.img);
    },
    getSellComment: function() {
        var a = this;
        t.req("sell/comment/get", this.data.params, "post").then(function(t) {
            a.setData({
                ready: !1
            }), t.data.list.data.forEach(function(t) {
                t.condition = a.data.condition[t.condition], t.evaluate = parseInt(t.evaluate), 
                t.price = parseInt(t.price);
            }), 0 !== t.data.list.data.length ? (t.data.list.data = a.data.commentList.concat(t.data.list.data), 
            a.setData({
                satisfaction: t.data.number,
                commentList: t.data.list.data,
                total: t.data.list.total
            })) : a.setData({
                text: "没有更多了"
            });
        });
    },
    getBuyComment: function() {
        var a = this;
        t.req("buy/product/comment/get", this.data.params, "post").then(function(t) {
            a.setData({
                ready: !1
            }), t.data.lists.forEach(function(t) {
                t.time = t.created_at.slice(0, 10), t.condition = a.data.condition[t.condition], 
                t.evaluate = parseInt(t.evaluate), t.price = parseInt(t.price);
            }), 0 !== t.data.lists.length ? (t.data.lists = a.data.commentList.concat(t.data.lists), 
            a.setData({
                commentList: t.data.lists,
                total: t.data.total
            })) : a.setData({
                text: "没有更多了"
            });
        });
    },
    getBuyNum: function() {
        var a = this;
        t.req("buy/product/comment/number", {
            quotedId: 48
        }, "post").then(function(t) {
            a.setData({
                satisfaction: t.data.number
            });
        });
    },
    more: function() {
        var t = {
            page: this.data.params.page += 1,
            pageSize: 10
        };
        this.setData({
            text: "加载中...",
            params: t
        }), 1 == this.data.buy && this.getBuyComment(), 2 == this.data.buy && this.getSellComment(), 
        this.setData({
            text: "点击加载更多"
        });
    },
    onLoad: function(t) {
        t.buy = parseInt(t.buy), this.setData({
            buy: t.buy
        }), 1 == t.buy && (this.getBuyComment(), this.getBuyNum()), 2 == t.buy && this.getSellComment();
    },
    onReady: function() {},
    onShow: function() {
        a.Page.init();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = {
            page: this.data.params.page += 1,
            pageSize: 10
        };
        this.setData({
            text: "加载中...",
            params: t
        }), 1 == this.data.buy && this.getBuyComment(), 2 == this.data.buy && this.getSellComment(), 
        this.setData({
            text: "点击加载更多"
        });
    },
    onShareAppMessage: function() {}
});