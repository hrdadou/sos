Page({
    data: {
        userInfo: {}
    },
    onLoad: function(n) {
        var o = JSON.parse(n.data);
        this.setData({
            userInfo: o
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});