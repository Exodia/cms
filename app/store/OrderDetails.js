Ext.define('AM.store.OrderDetails', {
    extend: 'Ext.data.Store',
    model: 'AM.model.OrderDetail',
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: AM.API['orderDetail'].read,
            update: 'tt'
//            read: 'http://d.taobao.com:8080/order/queryAll.action?_dc=1362491636705&page=1&start=0&limit=25',
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
