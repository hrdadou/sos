var e = getApp();

Component({
    properties: {
        items: {
            type: Array,
            value: []
        },
        title: {
            type: String,
            value: "限时优惠"
        },
        more: {
            type: Boolean,
            value: !1
        },
        titleEng: {
            type: String,
            value: "Countdown Discount"
        },
        detailUrl: {
            type: String,
            value: "/buy/search?show=all&type=overTimeAsc"
        }
    },
    data: {
        SELL: 0
    },
    methods: {
        goMore: function() {
            e.webUrlTo(this.properties.detailUrl);
        },
        goDetail: function(t) {
            e.getFromIds(t.detail.formId);
            var o = t.currentTarget.dataset;
            e.webUrlTo("/buy/goods-detail?quotedId=" + o.quotedid + "&productId=" + o.productid);
        }
    }
});