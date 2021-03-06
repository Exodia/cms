Ext.define('AM.controller.Transports', {
    extend: 'Ext.app.Controller',
    views: [
        'transport.List',
        'transport.Edit'
    ],
    stores: [
        'Transports'
    ],
    models: ['Transport', 'TransportDetail'],
    refs: [
        {
            ref: 'panel',
            selector: 'transport_panel'
        },
        {
            ref: 'list',
            selector: 'transport_general transport_list'
        },
        {
            ref: 'confirmButton',
            selector: '#J_TransportConfirm'
        },
        {
            ref: 'orderInput',
            selector: '#J_OrderText'
        }
    ],

    init: function () {
        this.control({
            '#J_TransportAdd': {
                click: function () {
                    var tab = Ext.widget('transport_edit', {
                        title: '新增发运信息',
                        transport: this.getModel('Transport').create({})
                    });

                    this.getPanel().add(tab);
                    this.getPanel().setActiveTab(tab);
                }
            },
            '#J_TransportConfirm': {
                click: this.confirmTransport
            },


            'transport_general transport_list': {
                selectionchange: this.checkEnable
            },

            'transport_edit button[action=save_transport]': {
                click: this.saveTransport
            }
        });
    },
    checkEnable: function (sm, rec) {
        var len = rec.length;
        this.getConfirmButton().setDisabled(len !== 1 || rec[0].get('status') === 1);
    },
    confirmTransport: function () {
        this.application.confirm('注意', '确定要执行<font color="red">发运确认</font>操作?', function () {
            var rec = this.getList().getSelectionModel().getSelection()[0];
            rec.set('status', 1);
            this.application.sync(this.getList().getStore(), this);
        }, this);
    },


    saveTransport: function (btn) {

        this.application.confirm('注意', '确定要保存?', function () {
            var editPanel = btn.up('transport_edit'),
                form = editPanel.down('form'),
                rec = editPanel.transport;

            if(!form.getForm().isValid()) {
                AM.error('错误', '数据格式错误! 请检查!');
                return;
            }

            var values = form.getValues();
            values.boxAmount = Number(values.boxAmount);
            rec.set(values);

            btn.setDisabled(true);
            this.application.save(rec, this, {
                success: function () {
                    btn.setText('已保存');

                    this.getStore('Transports').reload();
                },
                fail: function () {
                    btn.setDisabled(false);
                }

            });
        }, this);

    }



});