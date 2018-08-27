Page({
    data: {
        imgUrl: "https://img.rekoon.cn/banner/%E6%9C%8D%E5%8A%A1%E4%BF%9D%E9%9A%9C--%E5%8D%96.png"
    },
    tosell: function() {
        console.log(1), wx.switchTab({
            url: "../a-sell/a-sell"
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});