Component({
    properties: {
        show: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        _posclick: function() {
            this.triggerEvent("hidden");
        }
    }
});