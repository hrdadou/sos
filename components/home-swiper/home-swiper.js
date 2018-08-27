var e = getApp();

Component({
    properties: {
        sell: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        img_url: [],
        imagesUrl: [ {
            bannerUrl: "/buy/bannertwo",
            imgUrl: "https://img.rekoon.cn/bannerbm.png"
        }, {
            bannerUrl: "/buy/red/collageShare?head=0",
            imgUrl: "https://img.rekoon.cn/banner/news/activity_200_banner.png"
        }, {
            bannerUrl: "/buy/bannerThree",
            imgUrl: "https://img.rekoon.cn/banner/news/banner1000.png"
        } ],
        imagesUrl_buy: [ {
            bannerUrl: "/buy/banner",
            imgUrl: "https://img.rekoon.cn/app_banner2.png"
        }, {
            bannerUrl: "/buy/red/collageShare?head=0",
            imgUrl: "https://img.rekoon.cn/banner/news/activity_200_banner.png"
        }, {
            bannerUrl: "/buy/bannerThree",
            imgUrl: "https://img.rekoon.cn/banner/news/banner1000.png"
        } ],
        indicatorDots: !1,
        interval: 5e3,
        duration: 300,
        showIndex: 0
    },
    ready: function() {
        this.setData({
            img_url: this.properties.sell ? this.data.imagesUrl : this.data.imagesUrl_buy
        });
    },
    methods: {
        clickImg: function(n) {
            var r = n.currentTarget.dataset.posturl;
            -1 !== r.indexOf("collageShare") ? wx.navigateTo({
                url: "/pages/collage/collage?head=0"
            }) : e.webUrlTo(r);
        },
        _change: function(e) {
            this.setData({
                showIndex: e.detail.current
            });
        }
    }
});