Component({
    properties: {},
    data: {},
    methods: {
        gohome: function() {
            wx.switchTab({
                url: "/pages/a-jifenShop/a-jifenShop"
            });
        }
    }
});