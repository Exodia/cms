Ext.Loader.setPath({
    'Ext.ux':'./libs/ext/examples/ux',
    'App.util':'./app/util'
});

Ext.application({
    requires:['Ext.container.Viewport', 'Ext.ux.GroupTabPanel', 'Ext.window.MessageBox',
        'AM.view.user.Panel', 'AM.view.order.Panel', 'AM.view.contract.Panel',
        'AM.view.transport.Panel', 'AM.view.invoice.Panel', 'AM.view.composite.Panel',
        'AM.view.composite.Panel', 'AM.view.custom.Panel', 'AM.view.datamgr.Panel'
    ],
    name:'AM',

    appFolder:'app',
    controllers:[
        'Users',
        'Orders'
    ],

    error:function (title, msg, fn, scope) {
        Ext.Msg.show({
            title:title,
            msg:msg,
            fn:fn,
            scope:scope,
            buttons:Ext.MessageBox.OK,
            buttonText:{
                ok:'确定'
            },
            icon:Ext.MessageBox.ERROR
        });
    },
    confirm:function (title, msg, fn, scope) {
        Ext.Msg.show({
            title:title,
            msg:msg,
            fn:fn,
            scope:scope,
            buttons:Ext.MessageBox.OKCANCEL,
            buttonText:{
                ok:'确定',
                cancel:'取消'
            },
            icon:Ext.MessageBox.WARNING
        });
    },
    sync: function(store, controller) {
        store.sync({
            failure: function () {
                this.application.error('错误', '操作失败，请重试！');
                store.rejectChanges();
                var sm = this.getList().getSelectionModel();
                sm.select(sm.getSelection());
            },
            scope:controller
        });
    },
    launch:function () {
        Ext.create('Ext.container.Viewport', {
            layout:'fit',
            items:{
                xtype:'grouptabpanel',
                activeGroup:0,
                items:[
                    {
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
                    },
                    {
                        items:[
                            {
                                title:'发运管理',
                                iconCls:'x-icon-trans',
                                style:'padding:5px;',
                                xtype:'transportpanel'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                title:'发票管理',
                                iconCls:'x-icon-invoices',
                                style:'padding:5px;',
                                xtype:'invoicepanel'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                title:'综合管理',
                                iconCls:'x-icon-composite',
                                style:'padding:5px;',
                                xtype:'compositepanel'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                title:'客户管理',
                                iconCls:'x-icon-customs',
                                style:'padding:5px;',
                                xtype:'custompanel'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                title:'数据管理',
                                iconCls:'x-icon-data',
                                style:'padding:5px;',
                                xtype:'datamgrpanel'
                            }
                        ]
                    }
                ]
            }

        });
    }
});