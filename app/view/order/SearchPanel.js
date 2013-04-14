Ext.define('AM.view.order.SearchPanel', {
    extend: 'Ext.form.Panel',
    requires:['AM.view.SaleGroup'],
    alias: 'widget.search_panel',
    border: false,
    style: {
        borderRadius: 'none'
    },
    autoScroll: true,
    collapsible: true,
    collapsed: true,
    collapseDirection: 'right',
    title: '查询订单',
    frame: true,
    width: 200,
    dock: 'left',
    defaults: {
        labelAlign: 'top',
        xtype: 'textfield',
        padding: 10,
        width: 170
    },
    items: [
        {
            fieldLabel: '订单号',
            name: 'orderCode'
        },
        {
            fieldLabel: '订单开始时段',
            xtype: 'datefield',
            editable: true,
            name: 'startDate',
            format: 'Y年m月d日',
            submitFormat: 'Y-m-d'
        },
        {
            fieldLabel: '订单结束时段',
            xtype: 'datefield',
            editable: true,
            name: 'endDate',
            format: 'Y年m月d日',
            submitFormat: 'Y-m-d'
        },

        {
            xtype: 'sale_group',
            name: 'saleGroup'
        },
        {
            fieldLabel: '订单状态',
            name: 'status',
            xtype: 'combo',
            queryMode: 'local',
            editable: false,
            forceSelection: true,
            valueField: 'id',
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'text'],
                data: [
                    {id: 0, text: '待审核'},
                    {id: 1, text: '审核通过'},
                    {id: 2, text: '审核未通过'},
                    {id: 3, text: '取消'},
                    {id: 4, text: '已绑定'}
                ]
            })
        },
        {
            text: '查询',
            xtype: 'button',
            margin: 40,
            width: 100,
            height: 35,
            action: 'search_order'
        }
    ]
});