Ext.Loader.setPath({
    'Ext.ux':'./libs/ext/examples/ux',
    'App.util':'./app/util',
    'App.widget': './app/widget'
});

Ext.require('Ext.data.writer.Json', function() {
    Ext.data.writer.Json.override({
        getRecordData:function (record) {
            var me = this, i, association, childStore, data = {};
            data = me.callParent([record]);

            /* Iterate over all the hasMany associations */
            for (i = 0; i < record.associations.length; i++) {
                association = record.associations.get(i);
                if (association.type == 'hasMany') {
                    data[association.name] = [];
                    childStore = eval('record.' + association.name + '()');

                    //Iterate over all the children in the current association
                    childStore.each(function (childRecord) {

                        //Recursively get the record data for children (depth first)
                        var childData = this.getRecordData.call(this, childRecord);
                        if (childRecord.dirty | childRecord.phantom | (childData != null)) {
                            data[association.name].push(childData);
                            record.setDirty();
                        }
                    }, me);
                }
            }
            return data;
        }
    });
});


Ext.application({
    requires:['Ext.container.Viewport', 'Ext.ux.GroupTabPanel', 'Ext.window.MessageBox',
        'AM.view.NavBar', 'AM.view.user.Panel', 'AM.view.order.Panel','AM.view.datamgr.Panel'
        /*, 'AM.view.contract.Panel',*/
        /*   'AM.view.transport.Panel', 'AM.view.invoice.Panel', 'AM.view.composite.Panel',
         'AM.view.composite.Panel', 'AM.view.custom.Panel', 'AM.view.datamgr.Panel'*/
    ],
    name:'AM',

    appFolder:'app',
    controllers:[
        'NavBar',
        'Users',
        'Orders'
//        'Transports'
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
    sync:function (store, controller) {
        store.sync({
            failure:function () {
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
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:[{
                xtype: 'navbar',
                height: 30
            },{
                xtype:'grouptabpanel',
                flex: 1,
                activeGroup:0,
                style: {
                  borderTop: 'none'
                },
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
                                active:true,
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
                                xtype:'panel'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                title:'发运管理',
                                iconCls:'x-icon-trans',
                                style:'padding:5px;',
                                xtype:'panel'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                title:'发票管理',
                                iconCls:'x-icon-invoices',
                                style:'padding:5px;',
                                xtype:'panel'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                title:'综合管理',
                                iconCls:'x-icon-composite',
                                style:'padding:5px;',
                                xtype:'panel'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                title:'客户管理',
                                iconCls:'x-icon-customs',
                                style:'padding:5px;',
                                xtype:'panel'
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
            }]

        });
    }
});