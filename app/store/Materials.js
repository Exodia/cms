Ext.define('AM.store.Materials', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Material',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            create: 'data/material/create.json',
            read: 'data/material/read.json',
            update: 'data/material/update.json',
            destroy: 'data/material/destroy.json'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
