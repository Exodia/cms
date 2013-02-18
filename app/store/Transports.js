Ext.define('AM.store.Transports', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Transport',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            create: 'data/transport/createTransport.json',
            read: 'data/transport/transports.json',
            update: 'data/transport/updateTransport.json',
            destroy: 'data/transport/destroyTransport.json'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});