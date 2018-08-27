var t = getApp(), a = require("../../sdk/mta.analysis.js");

Page({
    miniTo: function() {},
    getAItem: function(t) {
        var a = this;
        if (this.setData({
            allNum: 2
        }), this.data.options.show) {
            var e = 0, i = 0;
            this.data.titleList.forEach(function(t, n) {
                a.data.options.show == t.name && (e = t.id, i = n);
            }), this.selectComponent("#tabs").selectItItem({
                currentTarget: {
                    offsetLeft: t.detail[i].left - 12,
                    dataset: {
                        id: e,
                        index: i
                    }
                }
            });
        }
    },
    toDoSomething: function(e) {
        var i = e.currentTarget.dataset.id;
        if (22 == i && (a.Event.stat("click", {
            name: "任务列表-保卖估值"
        }), wx.switchTab({
            url: "../a-sell/a-sell"
        })), 30 == i && (a.Event.stat("click", {
            name: "任务列表-白条"
        }), wx.navigateTo({
            url: "/pages/jd-exchange/jd-exchange"
        })), 32 == i && (a.Event.stat("click", {
            name: "任务列表-立即换章"
        }), wx.switchTab({
            url: "/pages/a-sell/a-sell"
        })), 21 == i && (a.Event.stat("click", {
            name: "任务列表-订阅"
        }), wx.navigateTo({
            url: "../a-subscription/a-subscription"
        })), 23 == i) {
            if (a.Event.stat("click", {
                name: "任务列表-签到"
            }), 0 != this.data.isSigin) return;
            wx.navigateTo({
                url: "/pages/a-activity-sign/a-activity-sign"
            });
        }
        24 == i && (a.Event.stat("click", {
            name: "任务列表-去分享"
        }), t.getClickSource(0), wx.navigateTo({
            url: "/pages/a-code-page/a-code-page"
        })), 9 == i && this.onShareAppMessage(), 10 != i && 12 != i && 15 != i || (a.Event.stat("click", {
            name: "任务列表-首次买入"
        }), this.buy()), 11 != i && 13 != i && 16 != i || (a.Event.stat("click", {
            name: "任务列表-首次闲置"
        }), this.sell()), 14 == i && (a.Event.stat("click", {
            name: "任务列表-去邀请"
        }), this.selectComponent("#modelPop").showModal()), 9 == i && this.onShareAppMessage(), 
        18 == i && this.setData({
            bugInput: !this.data.bugInput
        });
    },
    addClickSource: function() {
        t.getClickSource(1);
    },
    formSubmit: function(a) {
        if (console.log(a.detail.value.content), "" == a.detail.value.content) wx.showToast({
            title: "请输入您的反馈",
            icon: "none"
        }); else {
            var e = this.data.userId, i = a.detail.value.content;
            t.req("integral/submitBug", {
                user_id: e,
                event_desc: i,
                rule_id: 18
            }, "post").then(function(t) {
                console.log(t);
            }), this.setData({
                bugInput: !this.data.bugInput
            });
        }
    },
    getSiginTimeLine: function() {
        var a = this;
        t.req("integral/singinSolt", {}, "post").then(function(t) {
            0 == t.code && (a.setData({
                isSigin: t.data.isSigin
            }), a.getTaskList());
        });
    },
    record: function() {
        var t = this.data.userId;
        wx.navigateTo({
            url: "../activity-detail/activity-detail?userId=" + t
        });
    },
    buy: function() {
        wx.switchTab({
            url: "../a-buy/a-buy"
        });
    },
    sell: function() {
        wx.switchTab({
            url: "../a-sell/a-sell"
        });
    },
    bug: function() {
        this.setData({
            bugInput: !this.data.bugInput
        });
    },
    activeRlues: function() {
        this.setData({
            maskFlag: !this.data.maskFlag
        });
    },
    closeActiveRlues: function() {
        this.setData({
            maskFlag: !this.data.maskFlag
        });
    },
    close: function() {
        this.setData({
            bugInput: !this.data.bugInput
        });
    },
    data: {
        scrollLeft: 0,
        titleList: [ {
            name: "焕熊专区",
            id: "1",
            icon: "https://img.rekoon.cn/intergal/search/ic_rekoon_n@2x.png",
            icon_h: "https://img.rekoon.cn/intergal/search/ic_rekoon_h@2x.png"
        }, {
            name: "生活专区",
            id: "3",
            icon: "https://img.rekoon.cn/intergal/search/anse.png",
            icon_h: "https://img.rekoon.cn/intergal/search/ic_game_h%20copy@2x.png"
        } ],
        count: 0,
        integral: 0,
        userId: "",
        openId: "asalskdal",
        fristBuyed: !0,
        fristSelled: !0,
        maskFlag: !0,
        bugInput: !0,
        taskList: [],
        showLoad: !0,
        isSigin: 0,
        currentTab: 1,
        allNum: 1,
        gameList: [ {
            status: 0,
            game_id: "1",
            game_img: "",
            game_url: "page/login/login",
            game_params: '{"channel":"ldxcx"}',
            app_id: "wx6ee495cc895ca028",
            game_name: "呆呆打僵尸"
        }, {
            status: 0,
            game_id: "2",
            game_img: "",
            game_url: "",
            game_params: '{"chid":1970,"subchid":"cqll78"}',
            app_id: "wx79ade44c39cefc7f",
            game_name: "传奇来了"
        } ]
    },
    getBannerList: function() {
        var a = this;
        t.req("dockgame/dockingList").then(function(e) {
            a.setData({
                extraGoods: {
                    bearUserId: t.globalData.userInfo.userId
                },
                bannerList: e.data,
                goodsNum: e.data[0].number
            });
        });
    },
    dockingClick: function(a) {
        t.req("dockgame/dockingClickCount", {
            userid: t.globalData.userInfo.userId,
            adid: a.currentTarget.dataset.id
        }), a.currentTarget.dataset.appid || wx.navigateTo({
            url: "/" + a.currentTarget.dataset.url
        });
    },
    selectThisTab: function(t) {
        var a = t.currentTarget.dataset.id, e = {
            1: 0,
            2: 410,
            3: 800
        };
        this.setData({
            scrollLeft: e[a]
        }), this.setData({
            currentTab: t.currentTarget.dataset.id
        });
    },
    handleGameCLick: function(a) {
        var e = a.currentTarget.dataset;
        if (0 == e.status) return wx.showToast({
            title: "试玩结束,即将重新开放～",
            icon: "none"
        });
        t.req("user/game/vlist", {
            gameId: e.gameid,
            userId: t.globalData.userInfo.userId
        }, "post");
    },
    masker: function() {
        this.setData({
            maskFlag: !this.data.maskFlag
        });
    },
    offMasker: function() {
        this.setData({
            maskFlag: !this.data.maskFlag
        });
    },
    hideenModel: function() {
        this.selectComponent("#modelPop").hideModal();
    },
    gohaibao: function() {
        t.getClickSource(2), wx.navigateTo({
            url: "/pages/a-code-page/a-code-page"
        });
    },
    getTaskList: function() {
        var a = this;
        t.req("user/first").then(function(e) {
            console.log(e.data), a.data.options.tab && a.selectThisTab({
                currentTarget: {
                    dataset: {
                        id: a.data.options.tab
                    }
                }
            }), a.setData({
                userId: e.data.userId,
                integral: e.data.integral
            });
            var i = a.data.userId;
            t.req("integral/taskLists?userId=" + i, "post").then(function(t) {
                console.log(t), wx.stopPullDownRefresh();
                var e = t.data;
                1 == a.data.isSigin && e.forEach(function(t) {
                    23 == t.id && (t.isSigin = 1);
                }), a.setData({
                    showLoad: !1,
                    taskList: t.data,
                    pendingTaskList: e.filter(function(t) {
                        return "待完成" == t.button;
                    }),
                    readyTaskList: e.filter(function(t) {
                        return "已完成" == t.button || 1 == t.isSigin;
                    }),
                    buttonReadyList: e.filter(function(t) {
                        return "disabled" != t.url && "待完成" != t.button && 17 != t.id && 1 != t.isSigin;
                    }),
                    lastList: e.filter(function(t) {
                        return 17 == t.id || 26 == t.id;
                    })
                });
            });
        });
    },
    getGameList: function() {
        var a = this;
        t.getWxUserInfo(function(e) {
            if (!e.openid) return setTimeout(function() {
                a.getGameList();
            }, 300);
            t.req("user/game/list", {
                userId: t.globalData.userInfo.userId
            }).then(function(t) {
                a.setData({
                    gameIntergal: t.data[0].number
                }), t.data.forEach(function(t) {
                    t.game_params = JSON.parse(t.game_param + "");
                }), a.setData({
                    gameList: t.data
                });
            });
        }, "Res");
    },
    onLoad: function(t) {
        this.setData({
            options: t
        }), a.Page.init(), this.getBannerList(), this.getGameList(), wx.showShareMenu({
            withShareTicket: !0
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getSiginTimeLine();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getSiginTimeLine();
    },
    onReachBottom: function() {},
    getGid: function(a) {
        wx.login({
            success: function(e) {
                t.globalData.code = e.code, t.globalData.shareTicket && wx.getShareInfo({
                    shareTicket: t.globalData.shareTicket,
                    success: function(e) {
                        t.decryptData(e.iv, e.encryptedData).then(function(t) {
                            0 == t.code && a(t.data.openGId);
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {
        var a = this;
        if (console.log(this.data.count), !(this.data.count >= 5)) {
            var e = this, i = e.data.openId, n = "/pages/a-jifenShop/a-jifenShop?fid=" + t.globalData.userInfo.openid;
            return console.log(i), {
                title: "加入「焕熊」，各类数码产品0元拿",
                path: n,
                imageUrl: "https://img.rekoon.cn/intergal/search/hiabao.jpg",
                success: function(i) {
                    a.hideenModel(), e.getGid(function(a) {
                        t.req("integral/userShare?openGid=" + a);
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            };
        }
        wx.showModal({
            title: "提示",
            content: "您已达到每日转发次数，明天再来吧"
        });
    }
});