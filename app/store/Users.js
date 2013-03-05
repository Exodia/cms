Ext.define('AM.store.Users', {
    extend: 'Ext.data.Store',
    model: 'AM.model.User',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            create: 'data/user/create.php',
            read: 'data/user/read.json',
            update: 'data/user/updateUsers.json',
            destroy: 'data/user/destroyUsers.json'
        },
        writer: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            encode: true
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});