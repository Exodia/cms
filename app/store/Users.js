/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-1-26
 * Time: 下午6:21
 */
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