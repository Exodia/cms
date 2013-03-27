Ext.define('AM.view.CustomField', {
    extend: 'AM.view.TplCombobox',
    requires: ['AM.store.Customs'],
    alias:'widget.custom_field',
    displayField: 'companyName',
    valueField: 'companyName',
    emptyText: '输入企业名称查询',
    autoSelect: false,
    store: Ext.create('Ext.data.Store', {
        fields:['companyName'],
        proxy: AM.createProxy('company'),
        reader: AM.Reader,
        writer: AM.Writer
    }),
    listeners: {
        select: function(combo, records) {
            var id = records[0].get('id'),
                form = combo.up('form'),
                idField = form.getForm().findField('customId');
            idField.setValue(id);
        }
    }

});