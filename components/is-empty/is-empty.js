Component({
    properties: {
        url: {
            type: String,
            value: "https://img.rekoon.cn/integral/null.png"
        },
        text: {
            type: String,
            value: "您还没有用焕熊章换到商品哦～"
        },
        btn: {
            type: String,
            value: "去赚焕熊章"
        },
        show: {
            type: Boolean,
            value: !1
        },
        position: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        click: function() {
            this.triggerEvent("click");
        }
    }
});