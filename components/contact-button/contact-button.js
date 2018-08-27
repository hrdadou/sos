var t = getApp();

Component({
    properties: {
        show: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        openContact: function(e) {
            t.getFromIds(e.detail.formId);
        }
    }
});