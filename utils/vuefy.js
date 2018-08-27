function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

function e(t, e, n, a) {
    var c = t["$" + e] || [];
    Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: !0,
        get: function() {
            return t.$target && (c.push(t.$target), t["$" + e] = c), n;
        },
        set: function(t) {
            t !== n && (a && a(t), c.length && setTimeout(function() {
                c.forEach(function(t) {
                    return t();
                });
            }, 0), n = t);
        }
    });
}

module.exports = {
    watch: function(t, n) {
        Object.keys(n).forEach(function(a) {
            e(t.data, a, t.data[a], function(e) {
                n[a].call(t, e);
            });
        });
    },
    computed: function(n, a) {
        var c = Object.keys(a);
        Object.keys(n.data).forEach(function(t) {
            e(n.data, t, n.data[t]);
        });
        var r = c.reduce(function(e, c) {
            return n.data.$target = function() {
                n.setData(t({}, c, a[c].call(n)));
            }, e[c] = a[c].call(n), n.data.$target = null, e;
        }, {});
        n.setData(r);
    }
};