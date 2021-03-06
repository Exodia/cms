Ext.define('AM.view.datamgr.Panel', {
    extend: 'Ext.tab.Panel',
    requires: ['AM.view.datamgr.List'],
    alias: 'widget.datamgrpanel',

    items: [
        {
          xtype: 'data_list'
        },

        {
            title: '导入数据',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: {
                xtype: 'form',
                width: 400,
                bodyPadding: 10,
                frame: true,
                draggable: true,
                fileUpload: true,
                margin: '100',
                items: [
                    {
                        xtype: 'filefield',
                        name: 'data',
                        fieldLabel: '数据表路径',
                        labelWidth: 80,
                        msgTarget: 'side',
                        allowBlank: false,
                        anchor: '100%',
                        buttonText: '选择文件'
                    }
                ],

                buttons: [
                    {
                        text: '导入',
                        handler: function () {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    url: AM.API['dataImport'],
                                    waitMsg: '正在导入!',
                                    success: function (fp, o) {
                                        Ext.Msg.alert('成功', '文件已导入！');
                                    }
                                });
                            }
                        }
                    }
                ]
            }


        }
    ]
});