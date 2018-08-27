Page({
    data: {
        name: "",
        quotedid: "",
        path: ""
    },
    onLoad: function(n) {
        var o = JSON.parse(n.data);
        this.setData({
            name: o.name,
            quotedid: o.quotedid,
            path: "https://shop.rekoon.cn/sell/phoneValuationFirst ? quotedId = ${data.quotedid} & name=${ data.name} & mainType=1"
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