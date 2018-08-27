Component({
    properties: {
        goodsList: {
            type: Array,
            value: [],
            observer: function(t) {
                t.length ? (t.forEach(function(t) {
                    t.image.indexOf("https") < 0 && (t.image = "https://img.rekoon.cn/" + t.image);
                }), this.setData({
                    list: t
                })) : this.setData({
                    list: []
                });
            }
        },
        title: {
            type: String,
            value: ""
        }
    },
    data: {
        list: []
    },
    methods: {
        toGoodsDetail: function(t) {
            wx.navigateTo({
                url: "/pages/a-productDetail/a-productDetail?goodsId=" + t.currentTarget.dataset.goodsid
            });
        }
    }
});