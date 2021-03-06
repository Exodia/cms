Ext.define('AM.view.contract.Form', {
    extend: 'Ext.form.Panel',
    requires: ['AM.view.CompanyField', 'AM.view.HiddenField'],
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
                fieldLabel: '合同号',
                name: 'codeNumber'
            },
            {
                name: 'companyName',
                xtype: this.contractStatus === 'add' ? 'company_field' : 'textfield',
                fieldLabel: '合同对方',
                allowBlank: false
            },
            {
                name: 'type',
                fieldLabel: '合同类别'
            }


        ];


        if (this.contractStatus !== 'add') {
            this.items.unshift({
                fieldLabel: '合同流水号',
                name: 'serialNumber',
                allowBlank: false
            });
            this.items.push({
                fieldLabel: '经办日期',
                name: 'dealTime',
                editable: false,
                format: 'Y年m月d日',
                submitFormat: 'Y-m-d',
                xtype: 'datefield'
            });
        }

        this.items.push({
                name: 'totalPrice',
                fieldLabel: '合同总价',
                disabled: this.contractStatus !== 'view'
            },
            {
                name: 'taxTotalPrice',
                fieldLabel: '合同总价(含税)',
                disabled: this.contractStatus !== 'view'
            }, {
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
            });

        this.callParent(arguments);
    }
});