getApp();

Component({
    properties: {
        buy: {
            type: Boolean,
            value: !1
        },
        total: {
            type: String,
            value: 0,
            observer: function() {}
        },
        satisfy: {
            type: Number,
            value: 0
        },
        data: {
            type: Array,
            value: [],
            observer: function() {
                var t = this;
                this.properties.data.forEach(function(e) {
                    e.condition = t.data.condition[e.condition], e.price = parseInt(e.price);
                    for (var a = [], i = [], s = 0; s < e.evaluate; s++) a.push(1);
                    for (s = 0; s < 5 - e.evaluate; s++) a.push(2);
                    e.evl = a, e.evl_ = i;
                }), this.setData({
                    lists: this.properties.data,
                    total: this.properties.total,
                    satisfy: this.properties.satisfy
                });
            }
        }
    },
    data: {
        title: {},
        lists: [],
        condition: {
            10: "全新",
            99: "99新",
            95: "95新",
            9: "9成新",
            85: "85新",
            8: "85新"
        },
        total: 0,
        satisfy: 0
    },
    ready: function() {
        this.setData({
            title: this.properties.buy ? {
                name: "买家说",
                en: "Buyer Reviews"
            } : {
                name: "卖家说",
                en: "Seller Reviews"
            }
        });
    },
    methods: {
        allComment: function() {
            var t = 0;
            t = this.properties.buy ? 1 : 2, wx.navigateTo({
                url: "../a-comment/a-comment?buy=" + t
            });
        }
    }
});