Ext.define('AM.view.custom.List', {
    extend:'Ext.grid.Panel',
    alias:'widget.custom_list',
    store:'Customs',
    dockedItems:[
        {
            xtype:'toolbar',
            items:[
                {
                    iconCls:'icon-add',
                    itemId:'J_CustomAdd',
                    text:'新增客户',
                    scope:this
                },
                '-',
                {
                    iconCls:'icon-edit',
                    itemId:'J_CustomEdit',
                    text:'编辑',
                    disabled:true,
                    scope:this
                },
                '-',
                {
                    iconCls:'icon-delete',
                    itemId:'J_CustomDelete',
                    text:'删除',
                    scope:this,
                    disabled:true
                },
                '->',
                {
                    xtype:'combo',
                    queryMode:'local',
                    listeners: {
                        afterRender: function() {
                            this.setValue('按工号');
                        }
                    },

                    store:Ext.create('Ext.data.Store', {
                        fields:['type'],
                        data:[
                            {
                                type:'按工号'
                            },
                            {
                                type:'按姓名'
                            }
                        ]
                    }),
                    displayField:'type',
                    valueField:'type',
                    editable:false,
                    forceSelection:true,
                    width:80
                },
                {
                    xtype:'textfield',
                    itemId: 'J_CustomSearchText',
                    emptyText:'输入工号或者姓名查询'
                },
                Ext.create('Ext.Button', {
                    itemId: 'J_CustomSearch',
                    text: '查询',
                    cls: 'x-btn-default-small'
                })
            ]
        }
    ],
    initComponent:function () {
        this.columns = [
            {xtype: 'rownumberer', header: '序号'},
            {header:'工号', dataIndex:'workNum', flex:1},
            {header:'姓名', dataIndex:'name', flex:0.5},
            {header:'职位', dataIndex:'userType', flex:0.5, renderer:function (v) {
                return AM.UserType[v];
            }},
            {header:'住址', dataIndex:'address', flex:2},
            {header:'联系方式', dataIndex:'contact', flex:1},
            {header:'Email', dataIndex:'email', flex:1},
            {header:'销售组', dataIndex:'saleGroup', flex:0.5, renderer:function (v) {
                return AM.SaleGroup[v];
            }}

        ];
        this.callParent(arguments);
    }
});