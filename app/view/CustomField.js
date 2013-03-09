Ext.define('AM.view.CustomField', {
    extend: 'AM.view.TplCombobox',
    requires: ['AM.store.Customs'],
    alias:'widget.custom_field',
    displayField: 'companyName',
    valueField: 'id',
    emptyText: '输入单位名称查询',
    store: Ext.create('AM.store.Customs')

});