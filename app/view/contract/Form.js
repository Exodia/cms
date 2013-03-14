Ext.define('AM.view.contract.Form', {
    extend: 'Ext.form.Panel',
    requires: ['AM.view.CustomField', 'AM.view.HiddenField'],
    alias: 'widget.contract_form',
    layout: 'border',
    collapsible: true,
    frame: true,
    region: 'west',
    layout: 'vbox',
    padding: 15,
    autoScroll: true,
    defaultType: 'textfield',

    width: 200,
    initComponent: function () {
        this.defaults = {
            labelAlign: 'top',
            margin: '15 0',
            width: 150,
            readOnly: this.contractStatus === 'view'
        };


        this.items = [
            {
                fieldLabel: '合同流水号',
                name: 'serialNumber',
                allowBlank: false
            },
            {
                fieldLabel: '合同号',
                name: 'codeNumber'
            },
            {
                name: 'company',
                xtype: this.contractStatus === 'add' ? 'custom_field' : 'textfield',
                fieldLabel: '合同对方'
            },
            {
                name: 'type',
                fieldLabel: '合同类别'
            },
            {
                name: 'totalPrice',
                fieldLabel: '合同总价'
            },
            {
                name: 'taxTotalPrice',
                fieldLabel: '合同总价(含税)'
            },
            {
                fieldLabel: '经办日期',
                name: 'dealTime',
                editable: false,
                format: 'Y年m月d日',
                submitFormat: 'Y-m-d',
                xtype: 'datefield'
            },
            {
                fieldLabel: '经办人',
                disabled: this.contractStatus !== 'view',
                name: 'salesManName'
            },
            {
                name: 'salesManId',
                xtype: 'hidden_field'
            },
            {
                name: 'customId',
                xtype: 'hidden_field'
            }

        ];

        this.callParent(arguments);
    }
});