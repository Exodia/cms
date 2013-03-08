Ext.define('AM.view.order.Audit', {
    extend:'Ext.grid.Panel',
    alias:'widget.orderaudit',
    store:'Orders',
    title:'订单审核',
    flex: 1,
    initComponent:function () {
        this.columns = [
            {header:'订单号', dataIndex:'id', flex:1},
            {header:'项目号', dataIndex:'project', flex:1},
            {header:'销售日期', dataIndex:'date', flex:1, renderer:function (v) {
                return Ext.Date.format(new Date(v), 'Y年m月d日 H:i');
            }},
            {header:'销售客户', dataIndex:'customName', flex:1},
            {header:'销售员', dataIndex:'salesManName', flex:1},
            {header:'订单总额(元)', dataIndex:'total_price', flex:1}
        ];

        this.callParent(arguments);
    }
});