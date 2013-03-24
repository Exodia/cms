//订单号 发运号 发运信息 包装箱种类  数量 时间 状态
Ext.define('AM.model.Transport', {
    extend:'Ext.data.Model',
    fields:['id', 'orderCode', 'transportCode', 'info', 'boxType', 'amount',  {
        name:'date',
        type: 'date',
        dateFormat: 'Y-m-d'
    }, 'status']
});