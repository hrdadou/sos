var t = getApp();

Page({
    bindRegionChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            region: t.detail.value
        });
    },
    data: {
        region: [ "广东省", "广州市", "海珠区" ],
        customItem: "全部",
        multiIndex: [ 0, 0, 0 ],
        objectMultiArray: [],
        objectMultiArray2: [ [ {
            id: 0,
            name: "无脊柱动物"
        }, {
            id: 1,
            name: "脊柱动物"
        } ], [ {
            id: 0,
            name: "扁性动物"
        }, {
            id: 1,
            name: "线形动物"
        }, {
            id: 2,
            name: "环节动物"
        }, {
            id: 0,
            name: "软体动物"
        }, {
            id: 0,
            name: "节肢动物"
        } ], [ {
            id: 0,
            name: "猪肉绦虫"
        }, {
            id: 1,
            name: "吸血虫"
        } ] ],
        adressList: []
    },
    bindMultiPickerChange: function(t) {
        console.log(t), this.setData({
            multiIndex: t.detail.value
        });
    },
    bindchange: function(t) {},
    getAdressList: function() {
        var e = this;
        t.req("integral/userArea").then(function(t) {
            e.setData({
                adressList: t.data
            });
        });
    },
    bindMultiPickerColumnChange: function(t) {
        var e = JSON.parse(JSON.stringify(this.data.objectMultiArray2));
        console.log("修改的列为", t.detail.column, "，值为", t.detail.value);
        var i = {
            objectMultiArray: this.data.objectMultiArray,
            multiIndex: this.data.multiIndex
        };
        i.multiIndex[t.detail.column] = t.detail.value;
        var n = t.detail.column;
        0 == n ? (console.log(0), i.objectMultiArray[1] = e[1].filter(function(e) {
            return e.id == t.detail.value;
        }), i.objectMultiArray[2] = e[2].filter(function(e) {
            return e.id == t.detail.value;
        })) : 1 == n && (i.objectMultiArray[2] = e[2].filter(function(e) {
            return e.id == t.detail.value;
        })), this.setData(i);
    },
    onLoad: function(t) {
        this.getAdressList(), this.setData({
            objectMultiArray: this.data.objectMultiArray2
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});