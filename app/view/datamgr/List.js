Ext.define('AM.view.datamgr.List', {
    extend:'Ext.grid.Panel',
    requires:['AM.view.datamgr.Edit'],
    alias:'widget.data_list',
    store:'Materials',
    title: "物料总览",
    dockedItems:[
        {
            xtype:'toolbar',
            items:[
                {
                    iconCls:'icon-add',
                    itemId:'J_DataAdd',
                    text:'新增',
                    scope:this
                },
                '-',
                {
                    iconCls:'icon-edit',
                    itemId:'J_DataEdit',
                    text:'编辑',
                    disabled:true,
                    scope:this
                }
            ]
        }
    ],
    initComponent:function () {
        this.columns = [
            {header:'物质编码', dataIndex:'code', flex:1},
            {header:'物料名称', dataIndex:'name', flex:0.5},
            {header:'规格型号', dataIndex:'type', flex:0.5},
            {header:'计量单位', dataIndex:'unit', flex:0.5},
            {header:'成本价格', dataIndex:'costPrice', flex:1},
            {header:'销售指导价格', dataIndex:'sellPrice', flex:1}
        ];
        this.callParent(arguments);
    }
});