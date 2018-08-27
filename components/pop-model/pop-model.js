Component({
    properties: {
        popType: {
            type: String,
            value: "bottom"
        }
    },
    data: {
        animationData: {},
        showModalStatus: !1
    },
    methods: {
        showModal: function() {
            var t = wx.createAnimation({
                duration: 300,
                timingFunction: "linear\t",
                delay: 0
            }), a = wx.createAnimation({
                duration: 300,
                timingFunction: "linear\t",
                delay: 0
            });
            this.animation = t, a.opacity(0).step(), "bottom" == this.properties.popType ? t.translateY(500).step() : t.opacity(0).step(), 
            this.setData({
                fade: a.export(),
                animationData: t.export(),
                showModalStatus: !0
            }), setTimeout(function() {
                a.opacity(.5).step(), "bottom" == this.properties.popType ? t.translateY(0).step() : t.opacity(1).step(), 
                this.setData({
                    fade: a.export(),
                    animationData: t.export()
                });
            }.bind(this), 300);
        },
        hideModal: function() {
            var t = wx.createAnimation({
                duration: 200,
                timingFunction: "linear\t",
                delay: 0
            }), a = wx.createAnimation({
                duration: 200,
                timingFunction: "linear\t",
                delay: 0
            });
            this.animation = t, "bottom" == this.properties.popType ? t.translateY(500).step() : t.opacity(0).step(), 
            a.opacity(0).step(), this.setData({
                fade: a.export(),
                animationData: t.export()
            }), setTimeout(function() {
                a.opacity(.5).step(), "bottom" == this.properties.popType ? t.translateY(0).step() : t.opacity(1).step(), 
                this.setData({
                    fade: a.export(),
                    animationData: t.export(),
                    showModalStatus: !1
                });
            }.bind(this), 200);
        }
    }
});