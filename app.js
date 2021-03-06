Ext.Loader.setPath({
    'Ext.ux': './libs/ext/examples/ux',
    'App.util': './app/util',
    'App.widget': './app/widget'
});

Ext.SSL_SECURE_URL = './img/blank.gif';

Ext.require('Ext.data.writer.Json', function () {
    Ext.data.writer.Json.override({
        getRecordData: function (record) {
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
    requires: ['Ext.container.Viewport', 'Ext.ux.GroupTabPanel', 'Ext.window.MessageBox',
        'AM.view.NavBar', 'AM.view.user.Panel', 'AM.view.order.Panel', 'AM.view.custom.Panel',
        'AM.view.contract.Panel', 'AM.view.invoice.Panel', 'AM.view.composite.Panel',
        'AM.view.datamgr.Panel', 'AM.view.transport.Panel'
    ],
    name: 'AM',

    appFolder: 'app',
    controllers: [
        'NavBar',
        'Users',
        'Orders',
        'AuditOrders',
        'Contracts',
        'AuditContracts',
        'Invoices',
        'Customs',
        'Transports',
        'DataMgr'
    ],

    confirm: function (title, msg, fn, scope) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            fn: fn,
            scope: scope,
            buttons: Ext.MessageBox.OKCANCEL,
            buttonText: {
                ok: '确定',
                cancel: '取消'
            },
            icon: Ext.MessageBox.WARNING
        });
    },
    sync: function (store, controller) {
        store.sync({
            failure: function (batch) {
                store.rejectChanges();
            },
            success: function (batch) {
                var ret = Ext.JSON.decode(batch.operations[0].response.responseText);
                ret.msg && Ext.Msg.alert('操作成功', ret.msg);
            },
            callback: function () {
                if(typeof this.getList == 'function') {
                    var sm = this.getList().getSelectionModel();
                    sm.deselect(sm.getSelection());
                }
            },

            scope: controller
        });
    },
    save: function (record, controller, fn) {
        fn = fn || {};
        record.save({
            failure: function (record, operation) {
                record.cancelEdit();
                fn.error && fn.error.apply(this, arguments);
            },
            success: function (record, operation) {
                record.endEdit();
                var ret = Ext.JSON.decode(operation.response.responseText);
                ret.msg && Ext.Msg.alert('操作成功', ret.msg);
                fn.success && fn.success.apply(this, arguments);
            },
            callback: fn.callback,
            scope: controller
        });
    },
    getTabs: function() {
        var tabs = [
            {
                items: [
                    {
                        iconCls: 'x-icon-users',
                        leaf: true,
                        xtype: 'user_panel'
                    }
                ]
            },
            {
                items: [
                    {
                        title: '订单管理',
                        iconCls: 'x-icon-orders',
                        xtype: 'order_panel'
                    }
                ]
            },
            {
                items: [
                    {
                        title: '合同管理',
                        iconCls: 'x-icon-contracts',
                        style: 'padding:5px;',
                        xtype: 'contract_panel'
                    }
                ]
            },
            {
                items: [
                    {
                        title: '发运管理',
                        iconCls: 'x-icon-trans',
                        style: 'padding:5px;',
                        xtype: 'transport_panel'
                    }
                ]
            },
            {
                items: [
                    {
                        title: '发票管理',
                        iconCls: 'x-icon-invoices',
                        style: 'padding:5px;',
                        xtype: 'invoice_panel'
                    }
                ]
            },
            {
                items: [
                    {
                        title: '综合管理',
                        iconCls: 'x-icon-composite',
                        style: 'padding:5px;',
                        xtype: 'composite_panel'
                    }
                ]
            },
            {
                items: [
                    {
                        iconCls: 'x-icon-customs',
                        xtype: 'custom_panel'
                    }
                ]
            },
            {
                items: [
                    {
                        title: '数据管理',
                        iconCls: 'x-icon-data',
                        style: 'padding:5px;',
                        xtype: 'datamgrpanel'
                    }
                ]
            }
        ];

        switch(window.LoginUser.userType) {
            case 0:
                return tabs;
            /*
            * 营销员
            * 1)订单管理；
            * 2)合同管理；
            * 3)发运管理；
            * 4)发票管理
            * 6)客户管理
            * 7)数据导入
             * */
            case 1:
                return [tabs[1], tabs[2], tabs[3], tabs[4], tabs[6], tabs[7]];
            /*
            * 发运管理员
            * 3)发运
            * 1)订单
            * 2)合同
            * */
            case 2:
                return [tabs[1], tabs[2], tabs[3]];

            /*
            * 发票管理
            * 4)发票
            * 2)合同
            * 1)订单
            * */
            case 3:
               return [tabs[1], tabs[2], tabs[4]];

        }


        return tabs;
    },
    launch: function () {


        Ext.create('Ext.container.Viewport', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items: [
                {
                    xtype: 'navbar',
                    height: 30
                },
                {
                    xtype: 'grouptabpanel',

                    flex: 1,
                    style: {
                        borderTop: 'none'
                    },


                    items: this.getTabs()
                }
            ]

        });
    }
});