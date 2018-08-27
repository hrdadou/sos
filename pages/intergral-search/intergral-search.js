var a = getApp();

Page({
    data: {
        searchVal: "",
        goodsList: [],
        query: {
            title: "",
            pageSize: 20,
            page: 1
        },
        showLoading: !1,
        pageFlag: !0,
        loads: !0,
        noGoods: !1,
        empty: !1
    },
    onchange: function(a) {
        this.setData({
            searchVal: a.detail.value
        });
    },
    clearSearchVal: function() {
        this.setData({
            searchVal: ""
        });
    },
    searchGoods: function() {
        console.log("搜索"), this.setData({
            goodsList: [],
            loads: !0,
            query: {
                page: 1,
                pageSize: 20,
                title: this.data.searchVal
            }
        }), this.getGoodsList();
    },
    getGoodsList: function() {
        var t = this;
        this.setData({
            pageFlag: !1,
            showLoading: !0
        }), a.req("integral/signinGoods", this.data.query).then(function(a) {
            if (0 != a.code) return wx.showToast({
                title: a.errMsg,
                icon: "none"
            });
            t.setData({
                empty: 1 == t.data.query.page && 0 == a.data.data.length
            }), wx.stopPullDownRefresh();
            var e = a.data.data.length == t.data.query.pageSize;
            t.setData({
                showLoad: !1,
                pageFlag: e,
                loads: e,
                goodsList: t.data.goodsList.concat(a.data.data)
            });
        });
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {},
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