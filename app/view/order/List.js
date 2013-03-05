Ext.define('AM.view.order.List', {
    extend:'Ext.grid.Panel',
    alias:'widget.orderlist',
    store:'Orders',
    flex: 1,
    initComponent:function () {
        this.columns = [
            {header:'订单号', dataIndex:'id', flex:1},
            {header:'项目号', dataIndex:'project', flex:1},
            {header:'销售日期', dataIndex:'date', flex:1, renderer:function (v) {
                if(!v) {
                    return '';
                }
                return Ext.Date.format(new Date(v), 'Y年m月d日 H:i');
            }},
            {header:'销售客户', dataIndex:'custom', flex:1, renderer: function(v) {
                return v.name;
            }},
            {header:'销售员', dataIndex:'salesman', flex:1, renderer: function(v) {
                return v.name;
            }},
            {header:'订单总额(元)', dataIndex:'total_price', flex:1},
            {header:'订单状态', dataIndex:'status', flex:1}
        ];

        this.callParent(arguments);
    }
});