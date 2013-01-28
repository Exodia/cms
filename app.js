Ext.application({
    requires:['Ext.container.Viewport', 'AM.view.user.Panel', 'AM.view.order.Panel', 'AM.view.contract.Panel'],
    name:'AM',

    appFolder:'app',
    controllers:[
        'Users'
    ],
    launch:function () {
        Ext.create('Ext.container.Viewport', {
            layout:'fit',
            items:[
                {
                    xtype:'tabpanel',
                    activeTab:0,
                    header:{
                       height:50
                    },
                    title:'<p style="color:red; font: 20px">LOGO</p>',
                    titleAlign:'center',
                    items:[
                        {
                            xtype:'userpanel'
                        },
                        {
                            xtype:'orderpanel'
                        },
                        {
                            xtype:'contractpanel'
                        }
                    ]
                }
            ]
        });
    }
});