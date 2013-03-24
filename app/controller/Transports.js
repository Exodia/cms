Ext.define('AM.controller.Transports', {
    extend:'Ext.app.Controller',
    views:[
        'transport.List'
    ],
    stores:[
        'Transports'
    ],
    models:['Transport'],
    refs:[
        {
            ref:'list',
            selector:'transport_general transport_list'
        },
        {
            ref:'confirmButton',
            selector:'#J_TransportConfirm'
        },
        {
            ref:'addButton',
            selector:'#J_TransportAdd'
        }
    ],

    init:function () {
        this.control({
            '#J_TransportAdd':{
                click:function () {
                    Ext.widget('transportedit', {
                        title: '新增发运信息'
                    });
                }
            },

            '#J_TransportConfirm':{
                click:this.confirmTransport
            },

            'transport_general transport_list':{
                selectionchange:this.checkEnable
            },

            'transportedit button[action=save]':{
                click:this.updateTransport
            }
        });
    },
    checkEnable:function (sm, rec) {
        var len = rec.length;
        this.getConfirmButton().setDisabled(len !== 1 || rec[0].get('status') === 1);
    },
    confirmTransport: function () {
        this.application.confirm('注意', '确定要执行<font color="red">发运确认</font>操作?', function(){
            var rec = this.getList().getSelectionModel().getSelection()[0];
            rec.set('status', 1);
            this.application.sync(this.getList().getStore(), this);
        }, this);


    }


});