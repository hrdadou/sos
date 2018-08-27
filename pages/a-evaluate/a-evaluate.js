var o = getApp();

Page({
    data: {
        CauseReturn: "",
        rate: 5,
        picArray: [ "https://shop-img.rekoon.cn/img/sold_home_speak_star_choose.png", "https://shop-img.rekoon.cn/img/sold_home_speak_star_choose.png", "https://shop-img.rekoon.cn/img/sold_home_speak_star_choose.png", "https://shop-img.rekoon.cn/img/sold_home_speak_star_choose.png", "https://shop-img.rekoon.cn/img/sold_home_speak_star_choose.png" ],
        orderInfo: {},
        contentMaxLength: 60,
        images: [],
        options: {}
    },
    chooseImgs: function() {
        var t = this;
        wx.chooseImage({
            count: 6,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var a = e.tempFilePaths;
                a.forEach(function(e) {
                    wx.uploadFile({
                        url: o.globalData.baseUrl + "/api/img/upload",
                        filePath: e,
                        name: "file",
                        header: {
                            "Content-Type": "multipart/form-data",
                            Authorization: o.globalData.userInfo.token
                        },
                        success: function(o) {
                            t.setData({
                                images: t.data.images.concat(o.data)
                            });
                        }
                    });
                }), t.setData({
                    images: t.data.images.concat(a)
                });
            }
        });
    },
    getOrderDetail: function() {
        var t = this;
        o.req("order/first", {
            orderId: this.data.options.orderId
        }, "post").then(function(o) {
            if (0 != o.code) return wx.showToast({
                title: o.errMsg,
                icon: "none"
            });
            t.setData({
                orderInfo: o.data
            });
        });
    },
    showStar: function(o) {
        for (var t = o.currentTarget.dataset.index, e = [], a = 0; a < this.data.picArray.length; a++) e[a] = a <= t ? "https://shop-img.rekoon.cn/img/sold_home_speak_star_choose.png" : "https://shop-img.rekoon.cn/img/sold_home_speak_star_notchoose.png";
        this.setData({
            picArray: e,
            rate: t + 1
        });
    },
    onLoad: function(o) {
        this.setData({
            options: o
        }), this.getOrderDetail();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});