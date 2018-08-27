var t = getApp(), s = require("../../sdk/mta.analysis.js");

Page({
    data: {
        modelLists: [],
        modelDetailList: [],
        subscriptionList: [],
        brandId: 14
    },
    getModelLists: function() {
        var s = this;
        t.req("getGoods/sub", {}, "post").then(function(t) {
            t.data.forEach(function(n) {
                n.brandId = parseInt(n.brandId), s.setData({
                    modelLists: t.data,
                    subscriptionList: t.data[0].lists.filter(function(t) {
                        return 0 != t.sub;
                    }),
                    modelDetailList: t.data[0].lists.filter(function(t) {
                        return 0 == t.sub;
                    })
                });
            });
        });
    },
    modelClick: function(t) {
        console.log(t.currentTarget.dataset.id), this.setData({
            brandId: t.currentTarget.dataset.id
        });
        var s = [];
        this.data.modelLists.forEach(function(n) {
            n.brandId == t.currentTarget.dataset.id && (s = n.lists, console.log(s));
        }), this.setData({
            subscriptionList: s.filter(function(t) {
                return 0 != t.sub;
            }),
            modelDetailList: s.filter(function(t) {
                return 0 == t.sub;
            })
        }), console.log(this.data.modelDetailList);
    },
    subscribe: function(s) {
        var n = parseInt(s.currentTarget.dataset.id);
        this.setModelSubStatus(n, 1), t.req("getGoods/setsub", {
            type_id: 1,
            goods_id: n
        }, "post").then(function(t) {
            if (wx.hideLoading(), 0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            wx.showToast({
                title: "操作成功",
                icon: "none"
            });
        });
    },
    setModelSubStatus: function(t, s) {
        var n = this;
        console.log(s);
        var e = this.data.modelLists;
        e.forEach(function(e) {
            e.brandId == n.data.brandId && e.lists.forEach(function(n) {
                n.quotedId == t && (n.sub = s);
            });
        });
        var o = this.data.modelLists.filter(function(t) {
            return t.brandId == n.data.brandId;
        })[0].lists;
        this.setData({
            modelLists: e,
            subscriptionList: o.filter(function(t) {
                return 0 != t.sub;
            }),
            modelDetailList: o.filter(function(t) {
                return 0 == t.sub;
            })
        });
    },
    qxSubscribe: function(s) {
        this.setModelSubStatus(s.currentTarget.dataset.id, 0), t.req("getGoods/setsub", {
            type_id: 3,
            goods_id: s.currentTarget.dataset.id
        }, "post").then(function(t) {
            if (wx.hideLoading(), 0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            wx.showToast({
                title: "操作成功",
                icon: "none"
            });
        });
    },
    allDy: function() {
        var s = this, n = this.data.brandId;
        t.req("getGoods/setsub", {
            type_id: 2,
            goods_id: n
        }, "post").then(function(t) {
            console.log(t), 0 == t.code && s.setBrandStatus(n, 1);
        });
    },
    deleteAll: function() {
        var s = this, n = this.data.brandId;
        t.req("getGoods/setsub", {
            type_id: 4,
            goods_id: n
        }, "post").then(function(t) {
            console.log(t), 0 == t.code && s.setBrandStatus(n, 0);
        });
    },
    DeleteAll: function() {
        var t = this;
        wx.showModal({
            title: "确定全部取消？",
            content: "取消后将不再受到上架通知",
            showCancel: !0,
            cancelText: "全部取消",
            cancelColor: "#565656",
            confirmText: "我在想想",
            confirmColor: "#6D84DD",
            success: function(s) {
                s.confirm || s.cancel && t.deleteAll();
            }
        });
    },
    setBrandStatus: function(t, s) {
        var n = this, e = this.data.modelLists.filter(function(t) {
            return t.brandId == n.data.brandId;
        });
        if (e.length) {
            var o = this.data.modelLists;
            o.forEach(function(t) {
                t.brandId == n.data.brandId && t.lists.forEach(function(t) {
                    t.sub = s;
                });
            });
            var i = e[0].lists;
            this.setData({
                modelLists: o,
                subscriptionList: i.filter(function(t) {
                    return 0 != t.sub;
                }),
                modelDetailList: i.filter(function(t) {
                    return 0 == t.sub;
                })
            }), wx.hideLoading();
        }
    },
    onLoad: function(t) {
        s.Page.init(), this.getModelLists(), console.log(this.data.subscriptionList);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});