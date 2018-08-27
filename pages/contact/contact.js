var n = getApp(), o = require("../../sdk/mta.analysis.js");

Page({
    data: {},
    submit: function(o) {
        n.getFromIds(o.detail.formId);
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        o.Page.init();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});