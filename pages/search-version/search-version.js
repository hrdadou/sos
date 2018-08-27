var t = getApp(), e = require("../../sdk/mta.analysis.js");

Page({
    data: {
        chooseItems: [ {
            name: "手机",
            type: 1
        }, {
            name: "平板",
            type: 3
        }, {
            name: "电脑",
            type: 2
        } ],
        modelList: [],
        modelDetailList: [],
        choose: 1,
        brandId: "",
        activeClass: "",
        showSerch: !1,
        hotModelList: [],
        histoaryList: [],
        mobileVersion: [],
        searchingList: [],
        noData: !1,
        inputVal: ""
    },
    cancelSerch: function() {
        this.setData({
            showSerch: !1,
            searchingList: [],
            inputVal: ""
        });
    },
    typeSelectEvent: function(t) {
        this.setData({
            choose: t.currentTarget.dataset.type,
            activeClass: {
                3: "two",
                2: "three",
                1: ""
            }[t.currentTarget.dataset.type]
        }), this.getModelList();
    },
    getModelList: function() {
        var e = this;
        t.req("ident/category", {
            type_id: this.data.choose
        }, "post").then(function(t) {
            if (0 == t.code) {
                var a = [];
                Array.isArray(t.data) && t.data.forEach(function(t) {
                    t.lists.forEach(function(t) {
                        a = a.concat(t);
                    });
                }), e.setData({
                    modelDetailList: t.data[0].lists,
                    brandId: t.data[0].brandId,
                    modelList: t.data,
                    mobileVersion: a
                });
            }
        });
    },
    modelClick: function(t) {
        this.setData({
            brandId: t.currentTarget.dataset.id,
            modelDetailList: this.data.modelList.filter(function(e) {
                return e.brandId == t.currentTarget.dataset.id;
            })[0].lists
        });
    },
    goNext: function(e) {
        var a = e.currentTarget.dataset;
        t.webUrlTo("/sell/phoneValuationFirst?quotedId=" + a.q + "&name=" + encodeURI(a.n) + "&mainType=" + this.data.choose);
    },
    onFocus: function() {
        this.setData({
            showSerch: !0
        });
    },
    getHoyModlNameList: function() {
        var e = this;
        t.req("ident/hots?num=6", {}, "post").then(function(t) {
            0 == t.code && e.setData({
                hotModelList: t.data
            });
        });
    },
    hotClick: function(e) {
        var a = e.currentTarget.dataset.quoted, o = e.currentTarget.dataset.serach ? this.data.searchingList.filter(function(t) {
            return t.quotedId == a;
        })[0] : this.data.hotModelList.filter(function(t) {
            return t.quotedId == a;
        })[0];
        this.saveStorage(o), t.webUrlTo("/sell/phoneValuationFirst?quotedId=" + o.quotedId + "&name=" + encodeURI(o.name) + "&mainType=1");
    },
    saveStorage: function(t) {
        var e = wx.getStorageSync("storageList") || [];
        e.filter(function(e) {
            return e.quotedId == t.quotedId;
        }).length || e.unshift(t), wx.setStorageSync("storageList", e);
    },
    clearStorage: function() {
        var t = this;
        wx.showModal({
            title: "确定清空全部历史记录？",
            cancelText: "取消",
            cancelColor: "#666971",
            confirmText: "确认",
            confirmColor: "#6D84DD",
            success: function(e) {
                e.confirm ? (wx.setStorageSync("storageList", []), t.setData({
                    histoaryList: wx.getStorageSync("storageList") || []
                })) : e.cancel;
            }
        });
    },
    serachOnchange: function(t) {
        var e = [], a = t.detail.value;
        return a.trim().length ? Array.isArray(this.data.mobileVersion) ? (e = this.data.mobileVersion.filter(function(t) {
            return t.name.toLowerCase().indexOf(a.toLowerCase()) > -1;
        }), void this.setData({
            searchingList: e,
            noData: e.length < 1
        })) : this.setData({
            noData: !0,
            searchingList: []
        }) : this.setData({
            noData: !1,
            searchingList: []
        });
    },
    onLoad: function(t) {
        e.Page.init(), console.log(t), this.setData({
            choose: t.mainType || 1,
            activeClass: {
                3: "two",
                2: "three",
                1: ""
            }[t.mainType || 1]
        }), this.getModelList();
    },
    onReady: function() {},
    onShow: function() {
        this.getHoyModlNameList(), this.setData({
            histoaryList: wx.getStorageSync("storageList") || []
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});