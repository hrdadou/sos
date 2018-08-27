var e = getApp();

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                e ? this.selectComponent("#modelPop").showModal() : this.selectComponent("#modelPop").hideModal();
            }
        }
    },
    data: {
        phone: null,
        code: null,
        isSend: !1,
        codeNum: 60,
        canNext: !1
    },
    methods: {
        phoneChange: function(e) {
            this.setData({
                phone: e.detail.value
            }), this.data.phone && this.data.code && this.setData({
                canNext: !0
            });
        },
        codeChange: function(e) {
            this.setData({
                code: e.detail.value
            }), this.data.phone && this.data.code && this.setData({
                canNext: !0
            });
        },
        timer: function() {
            var e = this;
            setTimeout(function() {
                if (1 == e.data.codeNum) return e.setData({
                    isSend: !1
                });
                e.setData({
                    codeNum: e.data.codeNum - 1
                }), e.timer();
            }, 1e3);
        },
        show: function() {
            this.selectComponent("#modelPop").showModal();
        },
        close: function() {
            this.selectComponent("#modelPop").hideModal();
        },
        submit: function() {
            var t = this;
            if (this.data.canNext) {
                wx.showLoading({
                    title: "请稍后..."
                });
                var o = {
                    phone: this.data.phone,
                    code: this.data.code,
                    miniopenid: e.globalData.userInfo.openid
                };
                e.req("user/phone/bind", o, "post").then(function(o) {
                    0 != o.code ? wx.showToast({
                        title: o.errMsg,
                        icon: "none"
                    }) : (e.globalData.userInfo = {}, e.getWxUserInfo(function(e) {
                        wx.hideLoading(), wx.showToast({
                            title: e.phone ? "绑定成功" : "绑定失败",
                            icon: "none"
                        }), t.selectComponent("#modelPop").hideModal();
                    }));
                });
            }
        },
        sendCode: function() {
            var t = this;
            e.req("user/sendCode", {
                userName: this.data.phone
            }, "post").then(function(e) {
                if (0 != e.code) return wx.showToast({
                    title: e.errMsg,
                    icon: "none"
                });
                wx.showToast({
                    title: "发送成功",
                    icon: "none"
                }), t.setData({
                    isSend: !0
                }), t.timer();
            });
        }
    }
});