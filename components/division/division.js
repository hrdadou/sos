var e = getApp();

Component({
    properties: {
        apple: {
            type: Boolean,
            value: !1
        },
        list: {
            type: Array,
            value: []
        }
    },
    data: {},
    ready: function() {},
    methods: {
        sell: function(t) {
            e.getFromIds(t.detail.formId);
            var a = t.currentTarget.dataset;
            e.webUrlTo("/sell/phoneValuationFirst?quotedId=" + a.quotedid + "&name=" + encodeURI(a.name) + "&mainType=1");
        }
    }
});