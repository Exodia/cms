Ext.define('AM.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Order',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            create: 'data/order/create.json',
            read: 'data/order/read.json',
            update: 'data/order/update.json',
            destroy: 'data/order/destroy.json'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            encode: true
        }
    }
});
