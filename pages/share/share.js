Page({
    data: {
        webUrl: ""
    },
    onLoad: function(a) {
        this.setData({
            webUrl: unescape(a.url)
        });
    }
});