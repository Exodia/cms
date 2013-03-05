Ext.define('AM.view.order.Form', {
    extend:'Ext.form.Panel',
    requires:['AM.view.SaleGroup', 'AM.view.Custom', 'AM.view.SalesMan'],
    alias:'widget.orderform',
    layout:'border',
    collapsible:true,
    frame:true,
    region:'west',
    layout:'vbox',
    padding:15,
    autoScroll:true,
    defaultType:'textfield',

    width:200,
    initComponent:function () {
        this.defaults = {
            labelAlign:'top',
            margin:'15 0',
            width:150,
            readOnly: this.orderStatus === 'view'
        };

        this.items = [
            {
                fieldLabel:'项目号',
                name:'project',
                allowBlank:false
            },
            {
                fieldLabel:'订单日期',
                name:'date',
                format:'Y年m月d日',
                xtype:'datefield'
            },
            {
                xtype:'custom',
                name:'custom'
            },
            {
                fieldLabel:'销售组',
                width:150,
                padding:0,
                name:'sale_group',
                xtype:'salegroup'
            },
            {
                fieldLabel:'销售员',
                name:'salesman',
//                xtype: 'combo'
                xtype:'salesman'
            }
        ];

        this.orderStatus === 'view' && this.items.unshift({
            fieldLabel:'订单编号',
            name:'id'
        });

        this.callParent(arguments);
    }
});