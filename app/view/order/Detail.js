Ext.define('AM.view.order.Detail', {
    extend:'Ext.panel.Panel',
    alias: 'widget.order_detail',
    requires:['AM.view.order.DetailList', 'AM.view.order.Form'],
    title:'订单详情',
    closable: true,
    layout: 'border',
    initComponent: function() {
        this.items = [{
            xtype: 'order_form',
            order: this.order,
            orderStatus: this.orderStatus,
            resizable: true,
            region: 'west'
        },{
            xtype:'order_detail_list',
            order: this.order,
            orderStatus: this.orderStatus,
            region: 'center'
        }];

        if(this.orderStatus !== 'view') {
            this.items.push({
                region: 'south',
                buttons:[{
                    text: '保存',
                    action: 'add_save'
                }]
            });
        } else {
            this.items.push({
                region: 'south',
                buttons:[{
                    text: '打印',
                    action: 'print'
                }]
            })
        }

        this.callParent(arguments);
    }
});