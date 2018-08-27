Component({
    properties: {
        siginData: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        sign: function() {
            this.setData({
                nowSign: this.data.nowSign + 1
            }), wx.showToast({
                title: "签到成功!！",
                icon: "none"
            });
        }
    }
});