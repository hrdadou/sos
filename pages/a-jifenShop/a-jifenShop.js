var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./banner.js")), a = getApp(), e = require("../../sdk/mta.analysis.js"), o = require("../../sdk/fm-1.0.1.js");

Page({
    data: {
        goodsList: [],
        query: {
            pageSize: 20,
            page: 1,
            cid: 0,
            start_integral: "",
            end_integral: "",
            status: "",
            salesVolume: "",
            integralBy: ""
        },
        pos: !1,
        pageFlag: !0,
        loads: !0,
        totalJifen: null,
        titleList: [],
        imagesUrl_buy: [],
        BannerList: [],
        showIndex: 0,
        indicatorDots: !1,
        interval: 5e3,
        duration: 300,
        showLoad: !0,
        rectItem: {},
        allNum: 1,
        options: {
            show: "全部"
        },
        tabScrollTop: 0,
        hasChangeTask: 1,
        hasChangeToast: !1,
        hidden: !1,
        empty: !1,
        showLoading: !1
    },
    modelPage: function(t) {
        var a = t.currentTarget.dataset.model, e = {
            1: "/pages/a-task/a-task?tab=3",
            2: "/pages/a-sell/a-sell",
            3: "/pages/a-activity-sign/a-activity-sign",
            4: "/pages/a-buy/a-buy"
        };
        0 == a ? (wx.pageScrollTo({
            scrollTop: this.data.tabScrollTop,
            duration: 50
        }), this.selectComponent("#select").modelClick({
            currentTarget: {
                dataset: {
                    id: 21,
                    name: "楚楚街优选"
                }
            }
        })) : wx.navigateTo({
            url: e[a],
            fail: function() {
                wx.switchTab({
                    url: e[a]
                });
            }
        });
    },
    isHaveTaskChange: function() {
        var t = this;
        a.req("integral/userNewTask").then(function(a) {
            if (0 != a.code) return wx.showToast({
                title: a.errMsg,
                icon: "none"
            });
            1 == a.data && (t.setData({
                hasChangeToast: !0
            }), setTimeout(function() {
                t.setData({
                    hasChangeToast: !1
                });
            }, 3e3)), t.setData({
                hasChangeTask: a.data
            });
        });
    },
    toSearch: function() {
        wx.navigateTo({
            url: "/pages/intergral-search/intergral-search"
        });
    },
    _change: function(t) {
        this.setData({
            showIndex: t.detail.current
        });
    },
    gojifenPage: function() {
        wx.navigateTo({
            url: "/pages/a-activity-sign/a-activity-sign"
        });
    },
    onChange: function(t) {
        this.data.pos && wx.pageScrollTo({
            scrollTop: this.data.tabScrollTop,
            duration: 0
        }), this.setData({
            loads: !0,
            "query.cid": t.detail,
            "query.page": 1,
            goodsList: []
        }), this.getGoodsList();
    },
    selectChange: function(t) {
        var a = t.detail;
        if ("none" == a) return wx.pageScrollTo({
            scrollTop: this.data.tabScrollTop,
            duration: 50
        });
        wx.pageScrollTo({
            scrollTop: this.data.tabScrollTop,
            duration: 50
        }), a.page = 1, a.pageSize = 20, this.setData({
            loads: !0,
            query: a,
            goodsList: []
        }), this.getGoodsList();
    },
    getTotalJifen: function() {
        var t = this;
        a.req("integral/userRaccoon").then(function(a) {
            if (0 != a.code) return wx.showToast({
                title: a.errMsg,
                icon: "none"
            });
            t.setData({
                totalJifen: a.data.integral
            });
        });
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
    getAItem: function(t) {
        var a = this;
        if (this.setData({
            allNum: 2
        }), this.data.options.show) {
            var e = 0, o = 0;
            this.data.titleList.forEach(function(t, n) {
                a.data.options.show == t.name && (e = t.id, o = n);
            }), this.selectComponent("#tabs").selectItItem({
                currentTarget: {
                    offsetLeft: t.detail[o].left - 12,
                    dataset: {
                        id: e,
                        index: o
                    }
                }
            });
        }
    },
    getTitleList: function() {
        var t = this;
        a.req("integral/addressBar").then(function(a) {
            if (0 != a.code) return wx.showToast({
                title: a.errMsg,
                icon: "none"
            });
            a.data.forEach(function(t) {
                t.id = t.cid;
            }), t.setData({
                titleList: a.data
            });
        });
    },
    closeInvite: function() {
        this.selectComponent("#modelPopInvite").hideModal();
    },
    getMoreJifen: function() {
        e.Event.stat("click", {
            name: "0元好物点击进入任务列表"
        }), wx.navigateTo({
            url: "/pages/a-task/a-task"
        });
    },
    clickImg: function(t) {
        var o = t.currentTarget.dataset.posturl.replace(/(\s*$)/g, "");
        -1 != o.indexOf("jd-exchange") && e.Event.stat("click", {
            name: "首页-开通白条"
        }), o.indexOf("pages") < 0 ? a.webUrlTo(o) : wx.navigateTo({
            url: o,
            fail: function() {
                wx.switchTab({
                    url: o
                });
            }
        });
    },
    closePop: function() {
        this.selectComponent("#modelPop").hideModal();
    },
    goInviteInterge: function() {
        wx.switchTab({
            url: "/pages/a-sell/a-sell"
        });
    },
    initFm: function() {
        var t = this;
        a.getWxUserInfo(function(e) {
            if (!a.globalData.userInfo.openid) return setTimeout(function() {
                t.initFm();
            }, 200);
            if (!wx.getStorageSync("isHasShowModels")) {
                t.selectComponent("#modelPopInvite").showModal();
                try {
                    wx.setStorageSync("isHasShowModels", 1);
                } catch (t) {
                    wx.setStorage({
                        key: "isHasShowModels",
                        data: 1
                    });
                }
            }
            var n = t;
            new o(a.globalData._fmOpt).getInfo({
                page: n,
                openid: a.globalData.userInfo.openid,
                unionid: a.globalData.userInfo.unionId,
                success: function(t) {
                    console.log(t);
                },
                fail: function(t) {
                    console.log(t);
                },
                complete: function(t) {}
            });
        }, "getRes");
    },
    onPageScroll: function(t) {
        t.scrollTop > this.data.tabScrollTop ? this.setData({
            pos: !0
        }) : this.setData({
            pos: !1
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.createSelectorQuery().select("#scrollFlag").boundingClientRect(function(t) {
            a.setData({
                tabScrollTop: t.top
            });
        }).exec(), this.getGoodsList(), this.initFm(), e.Page.init(), this.setData({
            options: Object.assign(this.data.options, t)
        }), wx.showShareMenu({
            withShareTicket: !0
        }), this.getTotalJifen(), this.getTitleList();
    },
    onReady: function() {},
    onShow: function() {
        this.isHaveTaskChange(), this.getTotalJifen(), this.setData({
            showIndex: 0,
            imagesUrl_buy: t.default
        });
    },
    getB: function() {
        a.req("global/carousel?p=1").then(function(t) {});
    },
    getBannerList: function(t) {
        var e = this;
        if (this.data.BannerList.length) return "function" == typeof t && t(this.data.BannerList);
        a.req("global/carousel", {
            p: 1
        }).then(function(a) {
            if (0 != a.code) return wx.showToast({
                title: a.errMsg,
                icon: "none"
            });
            e.setData({
                BannerList: a.data
            }), "function" == typeof t && t(a.data);
        });
    },
    onHide: function() {
        this.setData({
            imagesUrl_buy: []
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.vibrateShort(), this.getTotalJifen(), this.setData({
            goodsList: [],
            query: {
                pageSize: 20,
                page: 1,
                cid: 0,
                start_integral: "",
                end_integral: "",
                status: "",
                salesVolume: "",
                integralBy: ""
            }
        }), this.selectComponent("#select").resetData(), this.getGoodsList();
    },
    onReachBottom: function() {
        this.data.pageFlag && (this.setData({
            "query.page": this.data.query.page + 1
        }), this.getGoodsList());
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "加入「焕熊」，各类数码产品0元拿",
            imageUrl: "https://img.rekoon.cn/intergal/search/hiabao.jpg",
            path: "/pages/a-jifenShop/a-jifenShop?fid=" + a.globalData.userInfo.openid,
            success: function(t) {}
        };
    }
});