Component({
    properties: {
        timeOver: {
            type: String,
            value: ""
        }
    },
    data: {
        show: 0,
        time: new Date().getTime(),
        timehour: "",
        timeminute: "",
        timesecond: "",
        _time: 200
    },
    ready: function() {
        this.getTime();
    },
    methods: {
        setDates: function() {
            var e = this.properties.timeOver - this.data.time, t = parseInt(e / 36e5) < 10 ? "0" + parseInt(e / 36e5) : parseInt(e / 36e5), i = parseInt(e % 36e5 / 6e4) < 10 ? "0" + parseInt(e % 36e5 / 6e4) : parseInt(e % 36e5 / 6e4), a = parseInt(e % 6e4 / 1e3) < 10 ? "0" + parseInt(e % 6e4 / 1e3) : parseInt(e % 6e4 / 1e3);
            this.setData({
                timehour: t,
                timeminute: i,
                timesecond: a
            });
        },
        getTime: function() {
            var e = this;
            setTimeout(function() {
                e.setData({
                    time: new Date().getTime()
                }), e.setDates(), parseInt(e.data.timeOver) - parseInt(e.data.time) < 1e3 ? e.setData({
                    show: 2
                }) : (e.setData({
                    show: 1,
                    _time: 1e3
                }), e.getTime());
            }, this.data._time);
        }
    }
});