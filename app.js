Ext.Loader.setPath({
    'Ext.ux':'./libs/ext/examples/ux'
});

Ext.application({
    requires:['Ext.container.Viewport', 'Ext.ux.GroupTabPanel', 'AM.view.user.Panel', 'AM.view.order.Panel', 'AM.view.contract.Panel'],
    name:'AM',

    appFolder:'app',
    controllers:[
        'Users',
        'Orders'
    ],
    launch:function () {
        Ext.create('Ext.container.Viewport', {
            layout:'fit',
            items:{
                xtype:'grouptabpanel',
                activeGroup:0,
                items:[
                    {
                        mainItem:0,
                        items:[
                            {
                                title:'用户管理',
                                iconCls:'x-icon-users',
                                style:'padding:5px;',
                                leaf:true,
                                xtype:'userpanel'
                            }
                        ]},
                    {
                        items:[
                            {
                                title:'订单管理',
                                iconCls:'x-icon-orders',
                                style:'padding:5px;',
                                xtype:'orderpanel'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                title:'合同管理',
                                 iconCls:'x-icon-contracts',
                                style:'padding:5px;',
                                xtype:'contractpanel'
                            }
                        ]
                    },{
                        items:[
                            {
                                title:'发运管理',
                                iconCls:'x-icon-trans',
                                style:'padding:5px;',
                                xtype:'contractpanel'
                            }
                        ]
                    },{
                        items:[
                            {
                                title:'发票管理',
                              iconCls:'x-icon-invoices',
                                style:'padding:5px;',
                                xtype:'contractpanel'
                            }
                        ]
                    },{
                        items:[
                            {
                                title:'综合管理',
                                iconCls:'x-icon-composite',
                                style:'padding:5px;',
                                xtype:'contractpanel'
                            }
                        ]
                    },{
                        items:[
                            {
                                title:'客户管理',
                                iconCls:'x-icon-customs',
                                style:'padding:5px;',
                                xtype:'contractpanel'
                            }
                        ]
                    },{
                        items:[
                            {
                                title:'数据管理',
                                 iconCls:'x-icon-data',
                                style:'padding:5px;',
                                xtype:'contractpanel'
                            }
                        ]
                    }
                ]
            }

        });
    }
});