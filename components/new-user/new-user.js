var e = getApp();

Component({
    properties: {},
    data: {},
    ready: function() {
        this.getNew();
    },
    methods: {
        closePop: function() {
            this.selectComponent("#modelPop").hideModal(), e.globalData.isNewUser = 2;
        },
        getNew: function() {
            var t = this;
            e.getWxUserInfo(function(o) {
                if (!e.globalData.isNewUser) return setTimeout(function() {
                    t.getNew();
                }, 300);
                1 == e.globalData.isNewUser && t.selectComponent("#modelPop").showModal();
            }, "getRes");
        }
    }
});