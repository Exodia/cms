Ext.define('AM.store.Customs', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Custom',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            create: 'data/custom/create.json',
            read: 'data/custom/read.json',
            update: 'data/custom/update.json',
            destroy: 'data/custom/destroy.json'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
