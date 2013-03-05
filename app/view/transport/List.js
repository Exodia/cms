Ext.define('AM.view.transport.List', {
    extend:'Ext.grid.Panel',
    alias:'widget.transportlist',
    store:'Transports',
    statics:{
        unitTypes:['件']
    },
    selModel:{
        mode:'simple'
    },
    selType:'checkboxmodel',
    dockedItems:[
        {
            xtype:'toolbar',
            items:[
                {
                    iconCls:'icon-add',
                    itemId:'J_TransportAdd',
                    text:'新增',
                    scope:this
                },
                '-',
                {
                    iconCls:'icon-edit',
                    itemId:'J_TransportEdit',
                    text:'编辑',
                    disabled:true,
                    scope:this
                },
                '-',
                {
                    iconCls:'icon-delete',
                    itemId:'J_TransportDelete',
                    text:'删除',
                    scope:this,
                    disabled:true
                }
            ]
        }
    ],
    initComponent:function () {
        this.columns = [
            {header:'编码', dataIndex:'code', flex:1},
            {header:'名称', dataIndex:'name', flex:0.7},
            {header:'基本计量单位', dataIndex:'unit', flex:0.3, renderer:function (v) {
                return AM.view.transport.List.unitTypes[v];
            }},
            {header:'创建人', dataIndex:'creator', flex:0.5},
            {header:'创建时间', dataIndex:'time', flex:1, renderer:function (v) {
                return Ext.Date.format(new Date(v), 'Y年m月d日 H:i');
            }}
        ];
        this.callParent(arguments);
    }
});