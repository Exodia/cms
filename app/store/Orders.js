Ext.define('AM.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Order',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            create: 'data/order/read1.php',
            read: 'data/order/read.json',
//            read: 'http://d.taobao.com:8080/order/queryAll.action?_dc=1362491636705&page=1&start=0&limit=25',
            update: 'data/order/update.json',
            destroy: 'data/order/destroy.json'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
