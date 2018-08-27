var e = getApp(), t = require("../../sdk/mta.analysis.js");

Page({
    data: {
        timeOver: "",
        show: 0,
        time: new Date().getTime(),
        timehour: "",
        timeminute: "",
        timesecond: "",
        _time: 200,
        payParams: {},
        orderId: "",
        o: {},
        showModel: !1
    },
    success: function() {
        this.setData({
            showModel: !1
        }), this.pay(this.data.o);
    },
    cancel: function() {
        this.setData({
            showModel: !1
        }), e.webUrlTo("/buy/order-detail?orderId=" + this.data.orderId);
    },
    goResult: function(e) {
        var t = this;
        setTimeout(function() {
            1 == e ? t.setData({
                showModel: !0
            }) : wx.navigateTo({
                url: "../pay-result/pay-result?orderId=" + t.data.orderId + "&num=" + e
            });
        });
    },
    pay: function(e) {
        var t = this;
        wx.requestPayment({
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            package: "prepay_id=" + e.prepay_id,
            signType: e.signType,
            paySign: e.paySign,
            success: function(e) {
                t.goResult();
            },
            fail: function(e) {
                t.goResult(1);
            }
        });
    },
    onLoad: function(e) {
        console.log(e), this.setData({
            orderId: e.orderId,
            o: e
        }), this.getOverTime(), this.pay(e);
    },
    onShow: function() {
        t.Page.init();
    },
    getOverTime: function() {
        var t = this;
        e.req("order/first", {
            orderId: this.data.orderId
        }, "post").then(function(e) {
            0 == e.code && (t.setData({
                timeOver: 1e3 * e.data.lastPayTime
            }), t.getTime());
        });
    },
    setDates: function() {
        var e = this.data.timeOver - this.data.time, t = parseInt(e / 36e5) < 10 ? "0" + parseInt(e / 36e5) : parseInt(e / 36e5), a = parseInt(e % 36e5 / 6e4) < 10 ? "0" + parseInt(e % 36e5 / 6e4) : parseInt(e % 36e5 / 6e4), i = parseInt(e % 6e4 / 1e3) < 10 ? "0" + parseInt(e % 6e4 / 1e3) : parseInt(e % 6e4 / 1e3);
        this.setData({
            timehour: t,
            timeminute: a,
            timesecond: i
        });
    },
    getTime: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                time: new Date().getTime()
            }), e.setDates(), parseInt(e.data.timeOver) - parseInt(e.data.time) < 1e3 ? e.setData({
                show: 2
            }) : (e.setData({
                show: 1,
                _time: 1e3
            }), e.getTime());
        }, this.data._time);
    }
});