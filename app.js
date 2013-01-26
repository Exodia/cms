Ext.application({
    requires:['Ext.container.Viewport', 'AM.view.user.Panel'],
    name:'AM',

    appFolder:'app',
    controllers:[
        'Users'
    ],
    launch:function () {
        Ext.create('Ext.container.Viewport', {
            layout:'fit',
            items:{
                xtype:'tabpanel',
                items:[
                    {
                        xtype:'userpanel'

                    }
                ]
            }
        });
    }
});