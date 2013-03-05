Ext.define('AM.model.Material', {
    extend:'Ext.data.Model',
    fields:['id', 'code', 'name', 'type', 'unit'],
    validations: [
        {type: 'presence',  field: 'code'}
    ]
});