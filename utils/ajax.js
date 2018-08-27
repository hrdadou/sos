var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = require("./baseUrl").BASE_URL + "/api/";

module.exports = {
    get: function(t, e) {
        console.log(t), wx.request({
            url: o + t,
            method: "GET",
            data: "",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e(t.data);
            },
            error: function(t) {
                console.log(t.data);
            }
        });
    },
    post: function(t, e, n) {
        wx.request({
            url: o + t,
            method: "POST",
            data: e,
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                n(t.data);
            },
            error: function(t) {
                console.log(t.data);
            }
        });
    },
    request: function(e, n, a) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "GET";
        return new Promise(function(s, u) {
            wx.request({
                url: o + n,
                method: r,
                data: a,
                header: {
                    Authorization: e
                },
                success: function(e) {
                    if (200 != e.statusCode) {
                        var a = o.indexOf("test") >= 0 ? n + "错误码" + e.statusCode : "";
                        return wx.showToast({
                            title: "系统繁忙" + a,
                            icon: "none"
                        });
                    }
                    return 0 == e.data.code || "object" != t(e.data) ? "object" == t(e.data) && s(e.data) : e.data.errMsg && "请登录" != e.data.errMsg ? (wx.showToast({
                        title: e.data.errMsg,
                        icon: "none"
                    }), u(e.data)) : void 0;
                },
                fail: function(t) {
                    return u(t), wx.showToast({
                        title: "系统繁忙",
                        icon: "none"
                    });
                }
            });
        });
    }
};