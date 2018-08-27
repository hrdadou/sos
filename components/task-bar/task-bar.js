Component({
    properties: {
        getAll: {
            type: Number,
            value: null
        },
        title: {
            type: Array,
            value: [],
            observer: function(t) {
                var e = this;
                t.length && setTimeout(function() {
                    e.getMaxWidth(), 1 != e.properties.getAll ? e.selectItItem({
                        currentTarget: {
                            offsetLeft: 0,
                            dataset: {
                                id: t[0].cid,
                                index: 0
                            }
                        }
                    }) : e.getItems();
                });
            }
        }
    },
    data: {
        scrollLeft: 0,
        showItem: 0,
        showIndex: 0,
        offsetLeft: 0,
        maxWidth: 3e3,
        lineWidth: 100,
        itemLeft: 15,
        paddingWidth: 30
    },
    ready: function() {},
    methods: {
        getItems: function() {
            var t = this;
            wx.createSelectorQuery().in(this).selectAll(".item").boundingClientRect(function(e) {
                e.length && t.triggerEvent("getAItem", e);
            }).exec();
        },
        getMaxWidth: function() {
            var t = this;
            wx.createSelectorQuery().in(this).selectAll(".item").boundingClientRect(function(e) {
                var i = 0;
                e.forEach(function(t) {
                    i += t.width;
                }), t.setData({
                    maxWidth: i,
                    lineWidth: e[0].width - t.data.paddingWidth
                });
            }).exec();
        },
        selectItItem: function(t) {
            var e = this;
            wx.createSelectorQuery().in(this).selectAll(".item").boundingClientRect(function(i) {
                if (i.length) {
                    var n = i[t.currentTarget.dataset.index].width;
                    e.setData({
                        lineWidth: n - e.data.paddingWidth
                    });
                }
            }).exec(), this.setData({
                offsetLeft: t.currentTarget.offsetLeft,
                showItem: t.currentTarget.dataset.id,
                showIndex: t.currentTarget.dataset.index,
                scrollLeft: t.currentTarget.dataset.index >= 2 ? t.currentTarget.offsetLeft - 140 : 0
            }), this.triggerEvent("onChange", this.data.showItem);
        }
    }
});