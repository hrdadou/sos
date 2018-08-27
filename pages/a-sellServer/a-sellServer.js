var n = require("../../sdk/mta.analysis.js");

Page({
    data: {
        topUrl: "https://img.rekoon.cn/banner2%20copy.png",
        bottomUrl: "https://img.rekoon.cn/banner1_pic_liucheng.png"
    },
    tosell: function() {
        console.log(1), wx.switchTab({
            url: "../a-sell/a-sell"
        });
    },
    onLoad: function(o) {
        n.Page.init();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});