Ext.define('AM.view.invoice.Detail', {
    extend:'Ext.panel.Panel',
    alias: 'widget.invoice_detail',
    requires:['AM.view.invoice.DetailList', 'AM.view.invoice.Form'],
    title:'合同详情',
    closable: true,
    layout: 'border',
    initComponent: function() {
        this.items = [{
            xtype: 'invoice_form',
            invoice: this.invoice,
            invoiceStatus: this.invoiceStatus,
            resizable: true,
            region: 'west'
        },{
            xtype:'invoice_detail_list',
            invoiceStatus: this.invoiceStatus,
            invoice: this.invoice,
            region: 'center'
        }];

        if(this.invoiceStatus == 'add') {
            this.items.push({
                region: 'south',
                buttons:[{
                    text: '保存',
                    action: 'add_save'
                }]
            });
        }

        this.callParent(arguments);
    }
});