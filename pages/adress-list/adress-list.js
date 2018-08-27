var s = getApp(), e = require("../../sdk/mta.analysis.js");

Page({
    data: {
        adressList: []
    },
    getAdressList: function() {
        var e = this;
        s.req("user/address/get", {}, "post").then(function(s) {
            e.setData({
                adressList: s.data.lists
            });
        });
    },
    setAdress: function(e) {
        s.webUrlTo("/user/editreceivingaddress?addressId=" + e.currentTarget.dataset.addressid);
    },
    addAdress: function() {
        s.webUrlTo("/user/setreceivingaddress");
    },
    setAdressDefault: function(e) {
        var t = this, a = e.currentTarget.dataset;
        s.req("user/address/setDefault", {
            addressId: a.adressid
        }, "post").then(function(s) {
            if (0 == s.code) {
                var e = t.data.adressList;
                e.forEach(function(s, e) {
                    e == a.index ? s.isDefault = "1" : s.isDefault = "0";
                }), t.setData({
                    adressList: e
                }), setTimeout(function() {
                    wx.navigateBack();
                }, 200);
            }
        });
    },
    onLoad: function(s) {},
    onReady: function() {},
    onShow: function() {
        e.Page.init(), this.getAdressList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});