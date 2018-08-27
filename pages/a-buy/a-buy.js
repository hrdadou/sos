var t = getApp(), e = require("../../sdk/mta.analysis.js"), n = 0;

Page({
    data: {
        limits: [ {
            name: "7天可退",
            img: "https://img.rekoon.cn/integra/jd_version/mp/buy_home_guarantee2.png"
        }, {
            name: "360天质保",
            img: "https://img.rekoon.cn/integra/jd_version/mp/buy_home_guarantee3@2x.png"
        }, {
            name: "权威质检",
            img: "https://img.rekoon.cn/integra/jd_version/mp/buy_home_guarantee1@2x.png"
        }, {
            name: "顺丰包邮",
            img: "https://img.rekoon.cn/integra/jd_version/mp/sold_home_guarantee4@2x.png"
        } ],
        hotSales: [],
        newItems: [],
        commenList: [],
        commenTotal: 0,
        numbers: 0,
        showContact: !0,
        count: 0,
        posShow: !1,
        imagesUrl_buy: [],
        indicatorDots: !1,
        interval: 5e3,
        duration: 300,
        showIndex: 0,
        hotsBtn: !1,
        newBtn: !1,
        showLoad: !0,
        BannerList: []
    },
    buyCart: function() {
        t.webUrlTo("/buy/cart");
    },
    hidden: function() {
        this.setData({
            posShow: !this.data.posShow
        });
    },
    getCount: function() {
        var e = this;
        t.req("user/cart/count", {}, "post").then(function(t) {
            e.setData({
                count: t.data
            });
        });
    },
    getHotSales: function(e) {
        var n = this;
        t.req("buy/hotSale", {}, "get").then(function(t) {
            if (0 == t.code) {
                var o = t.data.saleList;
                n.setData({
                    hotsBtn: -1 != [ 6 ].indexOf(o.length)
                }), o.forEach(function(t) {
                    t.price = parseInt(t.price), t.overTime = 1e3 * t.overTime;
                }), o.length % 2 != 0 && o.pop(), n.setData({
                    hotSales: o,
                    showLoad: !1
                }), e && e();
            }
        });
    },
    getCommentNumber: function() {
        var e = this;
        t.req("buy/product/comment/number", {
            quotedId: 48
        }, "post").then(function(t) {
            0 == t.code && e.setData({
                numbers: t.data.number
            });
        });
    },
    getNewItems: function(e) {
        var n = this;
        t.req("buy/product/new", {}, "post").then(function(t) {
            if (0 == t.code) {
                var o = t.data;
                n.setData({
                    newBtn: -1 != [ 6, 8 ].indexOf(o.length)
                }), o.forEach(function(t) {
                    t.price = parseInt(t.price), t.overTime = 1e3 * t.overTime;
                }), o.length % 2 != 0 && o.pop(), n.setData({
                    newReady: !0,
                    newItems: t.data
                }), e && e();
            }
        });
    },
    getCommentList: function(e) {
        var n = this;
        t.req("buy/product/comment/get", {}, "post").then(function(t) {
            0 == t.code && (t.data.lists.forEach(function(t) {
                t.time = t.created_at.slice(0, 10);
            }), n.setData({
                commenList: t.data.lists,
                commenTotal: t.data.total
            }), e && e());
        });
    },
    detailGo: function() {
        wx.navigateTo({
            url: "../a-subscription/a-subscription"
        });
    },
    clickImg: function(e) {
        var n = e.currentTarget.dataset.posturl;
        n && (n.indexOf("pages") < 0 ? t.webUrlTo(n) : wx.navigateTo({
            url: n,
            fail: function() {
                wx.switchTab({
                    url: n
                });
            }
        }));
    },
    closePop: function() {
        this.selectComponent("#modelPop").hideModal();
    },
    closeInvite: function() {
        this.selectComponent("#modelPopInvite").hideModal();
    },
    getBannerList: function(e) {
        var n = this;
        if (this.data.BannerList.length) return e(this.data.BannerList);
        t.req("global/carousel", {
            p: 2
        }).then(function(t) {
            if (0 != t.code) return wx.showToast({
                title: t.errMsg,
                icon: "none"
            });
            n.setData({
                BannerList: t.data
            }), e && e(n.data.BannerList);
        });
    },
    _change: function(t) {
        this.setData({
            showIndex: t.detail.current
        });
    },
    modelPage: function(e) {
        t.webUrlTo(1 == e.currentTarget.dataset.model ? "/buy/search?show=all&apple=1" : "/buy/search?show=all&apple=0");
    },
    initData: function() {
        this.getHotSales(), this.getNewItems(), this.getCommentList(), this.getCommentNumber();
    },
    jifenShop: function() {
        wx.switchTab({
            url: "/pages/a-jifenShop/a-jifenShop"
        });
    },
    sellTo: function() {
        wx.switchTab({
            url: "/pages/a-sell/a-sell"
        });
    },
    closeUpdate: function() {
        this.selectComponent("#modelUpdate").hideModal();
    },
    showUpdate: function() {
        var e = this;
        t.req("small/judgeV2New").then(function(t) {
            0 == t.data && e.selectComponent("#modelUpdate").showModal();
        });
    },
    onLoad: function(t) {
        e.Page.init(), wx.getStorageSync("token") && this.showUpdate();
    },
    scroll: function(t) {},
    scrollTopEvent: function() {},
    onPageScroll: function(t) {
        var e = t.scrollTop;
        e > n && e > 100 && (n = e, this.setData({
            showContact: !1
        })), e < n && (n = e, this.setData({
            showContact: !0
        }));
    },
    onReady: function() {},
    onShow: function(t) {
        var e = this;
        this.getBannerList(function(t) {
            e.setData({
                showIndex: 0,
                imagesUrl_buy: t
            });
        }), this.initData(), wx.getStorageSync("token") && this.getCount();
    },
    jifenPage: function() {
        var e = this;
        t.req("small/sendcoruscate", {
            openid: t.globalData.userInfo.openid
        }).then(function(t) {
            0 == t.code && 1 == t.data.status && e.selectComponent("#modelPop").showModal();
        });
    },
    hideModel: function() {
        this.selectComponent("#modelPop").hideModal();
    },
    onHide: function() {
        this.setData({
            imagesUrl_buy: []
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        wx.vibrateShort(), this.getNewItems(), this.getHotSales(function() {
            t.getCommentList(function() {
                wx.stopPullDownRefresh();
            });
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        return "button" === e.from && console.log(e.target), {
            title: "加入「焕熊」，各类数码产品0元拿",
            imageUrl: "https://img.rekoon.cn/intergal/search/hiabao.jpg",
            path: "/pages/a-jifenShop/a-jifenShop?fid=" + t.globalData.userInfo.openid,
            success: function(t) {}
        };
    }
});