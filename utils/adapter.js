Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.adapterAddress = function(e) {
    return {
        id: e.addressId,
        name: e.name,
        tel: e.phone,
        address: e.provinceName + e.cityName + e.countyName + e.details,
        isDefault: e.isDefault
    };
}, exports.adapterWalletDetail = function(e) {
    return {
        amount: e.amount,
        desc: e.desc,
        time: e.created_at,
        type: parseInt(e.type),
        forzen: parseFloat(e.forzen)
    };
}, exports.adapterOrder = function(e) {
    for (var t = 0; t < e.length; t++) {
        var a = e[t];
        1 === parseInt(a.refundStatus) && (a.status = "-1"), a.status = parseInt(a.status);
    }
    return e;
};