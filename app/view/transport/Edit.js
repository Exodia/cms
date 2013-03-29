Ext.define('AM.view.transport.Edit', {
    extend: 'Ext.panel.Panel',
    requires: ['AM.view.transport.EditList'],
    alias: 'widget.transport_edit',
    layout: 'border',
    frame: true,
    closable: true,
    buttons: [
        {
            text: '保存',
            action: 'save_transport'
        }
    ],



    initComponent: function () {

        this.items = [
            {
                xtype: 'transport_edit_list',
                transport: this.transport,
                region: 'center'
            },
            {
                xtype: 'form',
                region: 'west',
                padding: '20',
                width: 120,
                frame: true,
                collapsible: true,
                resizable: true,
                items: [
                    {
                        labelAlign: 'top',
                        fieldLabel: '包装箱类型',
                        xtype: 'textfield',
                        width: 70,
                        allowBlank: false,
                        name: 'boxType'
                    },
                    {
                        labelAlign: 'top',
                        fieldLabel: '包装箱数量',
                        margin: '50 0',
                        width: 70,
                        minValue: 0,
                        allowBlank: false,
                        xtype: 'numberfield',
                        name: 'boxAmount'
                    }
                ]
            }
        ];


        this.callParent(arguments);
    }
});