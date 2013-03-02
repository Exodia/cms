/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-2-18
 * Time: 下午4:56
 */
Ext.define('AM.model.Material', {
    extend:'Ext.data.Model',
    fields:['id', 'code', 'name', 'type', 'unit'],
    validations: [
        {type: 'presence',  field: 'code'}
    ]
});