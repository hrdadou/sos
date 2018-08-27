var t = getApp(), n = require("../../sdk/mta.analysis.js"), e = 0;

Page({
    data: {
        limits: [ {
            name: "5天保价",
            img: "https://img.rekoon.cn/sold_home_guarantee1.png"
        }, {
            name: "3天保卖",
            img: "https://img.rekoon.cn/sold_home_guarantee2.png"
        }, {
            name: "顺丰上门",
            img: "https://img.rekoon.cn/sold_home_guarantee4.png"
        }, {
            name: "安全托管",
            img: "https://img.rekoon.cn/icon/buy/buy_home_guarantee2.png"
        } ],
        posShow: !1,
        appleList: [],
        anzhuoList: [],
        img_url: [],
        cheoseList: [ {
            id: 1,
            url: "https://img.rekoon.cn/integra/sold_home_ic_phone1.png",
            title: "手机换钱"
        }, {
            id: 3,
            url: "https://img.rekoon.cn/integra/sold_home_ic_pad2.png",
            title: "平板换钱"
        }, {
            id: 2,
            url: "https://img.rekoon.cn/integra/sold_home_ic_computer3.png",
            title: "笔记本换钱"
        } ],
        commentList: [],
        commentTotal: 0,
        satisfy: 0,
        showContact: !0,
        indicatorDots: !1,
        interval: 5e3,
        duration: 300,
        showIndex: 0,
        showLoad: !0,
        BannerList: []
    },
    serviceAssurance: function() {
        wx.navigateTo({
            url: "../a-safe/a-safe"
        });
    },
    goSell: function(t) {
        var n = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/search-version/search-version?mainType=" + n
        });
    },
    hidden: function() {
        this.setData({
            posShow: !this.data.posShow
        });
    },
    goSellComment: function(n) {
        var e = this;
        t.req("sell/comment/get", {}, "post").then(function(t) {
            0 === t.code && (t.data.list.data.forEach(function(t) {
                t.price = parseInt(t.price);
            }), e.setData({
                commentList: t.data.list.data,
                commentTotal: t.data.list.total,
                satisfy: t.data.number
            }), n && n());
        });
    },
    assess: function() {
        wx.navigateTo({
            url: "/pages/search-version/search-version"
        });
    },
    getProductList: function() {
        var n = this;
        t.req("ident/hots", {}, "post").then(function(t) {
            if (0 == t.code) {
                t.data;
                t.data.forEach(function(t) {
                    t.avgPrice = parseInt(t.avgPrice);
                });
                var e = t.data.filter(function(t, n, e) {
                    return 14 == t.brandId;
                }), a = t.data.filter(function(t, n, e) {
                    return 14 != t.brandId;
                });
                n.setData({
                    showLoad: !1,
                    appleList: e,
                    anzhuoList: a
                });
            }
        });
    },
    onPageScroll: function(t) {
        var n = t.scrollTop;
        n > e && n > 100 && (e = n, this.setData({
            showContact: !1
        })), n < e && (e = n, this.setData({
            showContact: !0
        }));
    },
    clickImg: function(n) {
        var e = n.currentTarget.dataset.posturl;
        console.log(e), e.indexOf("pages") < 0 ? t.webUrlTo(e) : wx.navigateTo({
            url: e,
            fail: function() {
                wx.switchTab({
                    url: e
                });
            }
        });
    },
    getBannerList: function(n) {
        var e = this;
        if (this.data.BannerList.length) return n(this.data.BannerList);
        t.req("global/carousel", {
            p: 3
        }).then(function(t) {
            if (0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            e.setData({
                BannerList: t.data
            }), n && n(e.data.BannerList);
        });
    },
    _change: function(t) {
        this.setData({
            showIndex: t.detail.current
        });
    },
    onLoad: function(t) {
        n.Page.init(), this.goSellComment();
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.getBannerList(function(n) {
            t.setData({
                showIndex: 0,
                img_url: n
            });
        });
    },
    onHide: function() {
        this.setData({
            img_url: []
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.vibrateShort(), this.goSellComment(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function(n) {
        return "button" === n.from && console.log(n.target), {
            title: "加入「焕熊」，各类数码产品0元拿",
            imageUrl: "https://img.rekoon.cn/intergal/search/hiabao.jpg",
            path: "/pages/a-jifenShop/a-jifenShop?fid=" + t.globalData.userInfo.openid,
            success: function(t) {}
        };
    }
});