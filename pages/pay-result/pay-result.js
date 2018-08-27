var a = getApp(), e = require("../../sdk/mta.analysis.js");

Page({
    data: {
        webUrl: ""
    },
    onShow: function() {},
    onLoad: function(r) {
        e.Page.init();
        var t = 1 == r.num ? "/buy/order-detail?orderId" : "/buy/pay-result?returnId";
        this.setData({
            webUrl: "" + a.globalData.web_url + t + "=" + r.orderId + "&openid=" + a.globalData.userInfo.openid + "&token=" + a.globalData.userInfo.token
        });
    }
});