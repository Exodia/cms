//订单号 发运号 发运信息 包装箱种类  数量 时间 状态
Ext.define('AM.model.Transport', {
    extend: 'Ext.data.Model',
    fields: ['id', 'orderCode', 'transportCode', 'info', 'boxType', 'boxAmount', 'transportAmount', {
        name: 'date',
        type: 'date',
        dateFormat: 'Y-m-d'
    }, 'status'],

    hasMany: {
        model: 'AM.model.TransportDetail',
        foreignKey: 'transportId',
        associationKey: 'transportId',
        name: 'detail'
    },
    proxy: AM.createProxy('transport'),
    reader: AM.Reader,
    writer: AM.Writer
});