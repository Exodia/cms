Ext.application({
    requires:['Ext.container.Viewport', 'AM.view.user.Panel', 'AM.view.order.Panel', 'AM.view.contract.Panel'],
    name:'AM',

    appFolder:'app',
    controllers:[
        'Users',
        'Orders'
    ],
    launch:function () {
        Ext.create('Ext.container.Viewport', {
            layout:'fit',
            border: 5,
            style: {
                borderColor: '#dfe9f6',
                borderStyle: 'solid'
            },

            items:
                {
                    xtype:'tabpanel',
                    activeTab:0,
                    header:{
                       height:40
                    },
                    title:'<p style="color:red; font: 20px">LOGO</p>',
                    titleAlign:'center',
                    defaults:{
                        bodyStyle:'background-color:#dfe9f6',
                        layout: {
                            type: 'vbox',
                            align:'stretch'
                        }
                    },
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

        });
    }
});