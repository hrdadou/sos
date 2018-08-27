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
            console.log("close"), this.triggerEvent("hidden");
        }
    }
});