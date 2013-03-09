Ext.define('AM.view.CustomField', {
    extend: 'AM.view.TplCombobox',
    requires: ['AM.store.Customs'],
    alias:'widget.custom_field',
    displayField: 'companyName',
    valueField: 'companyName',
    emptyText: '输入单位名称查询',
    autoSelect: false,
    store: Ext.create('AM.store.Customs'),
    listeners: {
        select: function(combo, records) {
            var id = records[0].get('id'),
                form = combo.up('order_form'),
                idField = form.getForm().findField('customId');
            idField.setValue(id);
        }
    }

});