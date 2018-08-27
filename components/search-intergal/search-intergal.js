Component({
    properties: {
        typeList: {
            type: Array,
            value: [],
            observer: function() {
                console.log(222222);
            }
        }
    },
    data: {
        goodsScreenStatus: [ {
            name: "进行中",
            status: 1
        }, {
            name: "已换完",
            status: 0
        } ],
        intergalIconUrlStatus: "3",
        currentModelId: 0,
        currentModelName: "全部",
        showCurrentModel: !1,
        sales: "",
        intergalNums: "",
        showScreening: !1,
        selectGoodsStatus: null,
        startIntergal: "",
        endIntergal: ""
    },
    methods: {
        onchangeStart: function(t) {
            this.setData({
                startIntergal: t.detail.value
            });
        },
        onchangeEnd: function(t) {
            this.setData({
                endIntergal: t.detail.value
            });
        },
        selectGoodsStatusClick: function(t) {
            this.setData({
                selectGoodsStatus: t.currentTarget.dataset.status
            });
        },
        modelClick: function(t) {
            this.setData({
                currentModelId: t.currentTarget.dataset.id,
                currentModelName: t.currentTarget.dataset.name,
                showCurrentModel: !1
            }), this.emit();
        },
        showModelContent: function() {
            this.setData({
                showScreening: !1,
                showCurrentModel: !this.data.showCurrentModel
            }), this.triggerEvent("change", "none");
        },
        onSalesTop: function() {
            this.setData({
                intergalNums: "",
                intergalIconUrlStatus: 3,
                sales: "" == this.data.sales ? "desc" : "",
                showCurrentModel: !1,
                showScreening: !1
            }), this.emit();
        },
        onIntergalTop: function() {
            var t = "", e = "3", s = this.data.intergalNums;
            "" == s ? (t = "asc", e = "1") : "asc" == s ? (t = "desc", e = "2") : "desc" == s && (t = "asc", 
            e = "1"), this.setData({
                sales: "",
                showCurrentModel: !1,
                showScreening: !1,
                intergalNums: t,
                intergalIconUrlStatus: e
            }), this.emit();
        },
        onScreenClick: function() {
            this.setData({
                showScreening: !this.data.showScreening,
                showCurrentModel: !1
            }), this.triggerEvent("change", "none");
        },
        closeAllModal: function() {
            this.setData({
                showCurrentModel: !1,
                showScreening: !1
            });
        },
        submitThis: function() {
            if (parseInt(this.data.startIntergal) > parseInt(this.data.endIntergal)) return wx.showToast({
                title: "最高章数不能小于最低章数",
                icon: "none"
            });
            this.closeAllModal(), this.emit();
        },
        resetForm: function() {
            this.setData({
                selectGoodsStatus: null,
                startIntergal: "",
                endIntergal: ""
            });
        },
        emit: function() {
            this.triggerEvent("change", {
                integralBy: this.data.intergalNums,
                cid: this.data.currentModelId,
                salesVolume: this.data.sales,
                rest: this.data.selectGoodsStatus,
                start_integral: this.data.startIntergal,
                end_integral: this.data.endIntergal
            });
        },
        preventTouchMove: function() {},
        resetData: function() {
            this.setData({
                intergalIconUrlStatus: "3",
                currentModelId: 0,
                currentModelName: "全部",
                showCurrentModel: !1,
                sales: "",
                intergalNums: "",
                showScreening: !1,
                selectGoodsStatus: null,
                startIntergal: "",
                endIntergal: ""
            });
        }
    }
});