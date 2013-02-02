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
                header:{
                    height:40
                },
                title:'<p style="color:red; font: 20px">LOGO</p>',
                titleAlign:'center',
                defaults:{
                    bodyStyle:'background-color:#dfe9f6',
                    layout:{
                        type:'vbox',
                        align:'stretch'
                    }
                },
                items:[{
//                        mainItem:1,
                    items:[{
                        title:'用户管理',
                        iconCls:'x-icon-users',
                        style:'padding:5px;',
                        xtype:'userpanel'
                     }]
                    },
                     {
                         items:[{
                             title:'订单管理',
                             iconCls:'x-icon-users',
                             style:'padding:5px;',
                             xtype:'orderpanel'
                         }]
                     },
                     {
                         items:[{
                             title:'合同管理',
                             iconCls:'x-icon-users',
                             style:'padding:5px;',
                             xtype:'contractpanel'
                         }]
                     }
                ]
            }

        });
    }
});