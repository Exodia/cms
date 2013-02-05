/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-1-26
 * Time: 下午6:29
 */
Ext.define('AM.model.User', {
    extend: 'Ext.data.Model',

    fields: ['id', 'name', 'user_type', 'address', 'contact', 'email']
});