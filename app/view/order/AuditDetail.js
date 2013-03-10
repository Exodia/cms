Ext.define('AM.view.order.AuditDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.order_audit_detail',
    requires: ['AM.view.order.ViewDetailList', 'AM.view.order.Form'],
    title: '订单审核',
    closable: true,
    border: false,
    padding: 0,
    layout: 'border',

    initComponent: function () {
        this.items = [
            {
                xtype: 'order_form',
                order: this.order,
                orderStatus: 'view',
                resizable: true,
                region: 'west'
            },
            {
                xtype: 'panel',
                autoScroll: true,
                border: false,
                frame: true,
                layout: {
                  type: 'vbox',
                    align: 'stretch'
                },
                region: 'center',
                buttons: [
                    {
                        text: '审核通过',
                        action: 'pass_order'
                    },
                    {
                        text: '审核不通过',
                        action: 'reject_order'
                    }
                ],
                items: [
                    {
                        xtype: 'order_view_list',
                        flex: 1,
                        collapsible: true,
                        title: '订单当前详情',
                        order: this.order,
                        params: {
                            'orderId': this.order.get('id')
                        }
                    },
                    {
                        xtype: 'order_view_list',
                        title: '订单历史详情',
                        flex: 1,
                        collapsible: true,
                        order: this.order,
                        params: {
                            'orderId': this.order.get('id'),
                            'history': true
                        },
                        margin: '50 0 0'
                    }
                ]
            }
        ];


        this.callParent(arguments);
    }
});