Ext.define('AM.store.SalesMen', {
    extend: 'Ext.data.Store',
    model: 'AM.model.SalesMan',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            create: 'data/salesman/create.json',
            read: 'data/salesman/read.json',
            update: 'data/salesman/update.json',
            destroy: 'data/salesman/destroy.json'
        },
        listeners: AM.ProxyListeners,
        reader: AM.Reader
    }
});
