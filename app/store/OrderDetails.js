Ext.define('AM.store.OrderDetails', {
    extend: 'Ext.data.Store',
    model: 'AM.model.OrderDetail',
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        listeners: AM.ProxyListeners,
        api: AM.API['orderDetail'],
        reader: AM.Reader
    }
});
