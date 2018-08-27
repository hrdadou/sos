var t = getApp();

Component({
    properties: {
        url: {
            type: String,
            value: null
        }
    },
    data: {},
    methods: {
        goDetail: function(e) {
            var r = this;
            t.getFromIds(e.detail.formId), this.properties.url ? wx.navigateTo({
                url: this.properties.url,
                fail: function(t) {
                    wx.switchTab({
                        url: r.properties.url
                    });
                }
            }) : this.triggerEvent("fevent");
        }
    }
});