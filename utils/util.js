var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    builder_url: function(o, n) {
        if (n) {
            if (void 0 === o || null === o || "" === o) return "";
            if (void 0 === n || null === n || "object" !== (void 0 === n ? "undefined" : t(n))) return "";
            o += -1 !== o.indexOf("?") ? "" : "?";
            for (var e in n) o += (-1 !== o.indexOf("=") ? "&" : "") + e + "=" + n[e];
        }
        return o;
    },
    formatTime: function(t) {
        var n = t.getFullYear(), e = t.getMonth() + 1, r = t.getDate(), i = t.getHours(), u = t.getMinutes(), f = t.getSeconds();
        return [ n, e, r ].map(o).join("/") + " " + [ i, u, f ].map(o).join(":");
    }
};