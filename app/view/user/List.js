Ext.define('AM.view.user.List', {
    extend:'Ext.grid.Panel',
    alias:'widget.user_list',
    store:'Users',
    dockedItems:[
        {
            xtype:'toolbar',
            items:[
                {
                    iconCls:'icon-add',
                    itemId:'J_UserAdd',
                    text:'新增用户',
                    scope:this
                },
                '-',
                {
                    iconCls:'icon-edit',
                    itemId:'J_UserEdit',
                    text:'编辑',
                    disabled:true,
                    scope:this
                },
                '-',
                {
                    iconCls:'icon-delete',
                    itemId:'J_UserDelete',
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
                    itemId: 'J_SearchText',
                    emptyText:'输入工号或者姓名查询'
                },
                Ext.create('Ext.Button', {
                    itemId: 'J_UserSearch',
                    text: '查询',
                    cls: 'x-btn-default-small'
                })
            ]
        }
    ],
    initComponent:function () {
        this.columns = [
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