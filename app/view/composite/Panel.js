Ext.define('AM.view.composite.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.composite_panel',
    title: '综合管理',
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            url: AM.API['composite'],
            layout: {
                type: 'vbox',
                align: 'left'
            },
            frame: true,
            defaults: {
                bodyPadding: 4,
                defaultType: 'textfield',
                width: 300,
                defaults: {
                    anchor: '100%',
                    allowBlank: false
                }
            },
            padding: '5',
            items: [
                {
                    xtype: 'fieldset',
                    title: '订单号管理',
                    layout: 'anchor',
                    items: [
                        {
                            fieldLabel: '订单号前缀',
                            name: 'orderPrefix'
                        },
                        {
                            fieldLabel: '订单号起始号',
                            xtype: 'numberfield',
                            minValue: 0,
                            maxValue: 9999,
                            name: 'orderStartNum'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '合同流水号管理',
                    layout: 'anchor',
                    items: [
                        {
                            fieldLabel: '合同流水号前缀',
                            name: 'contractPrefix'
                        },
                        {
                            fieldLabel: '合同流水号起始号',
                            xtype: 'numberfield',
                            minValue: 0,
                            maxValue: 9999,
                            name: 'contractStartNum'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    handler: function () {
                        var form = this.up('form');
                        if (!form.getForm().isValid()) {
                            AM.error('错误', '数据格式不正确,请检查!');
                        } else {
                            form.submit({
                                success: AM.success,
                                failure: function (form, action) {
                                    try {
                                        var res = Ext.decode(action.response.responseText);
                                        AM.error('操作失败', res && res.msg);

                                    } catch(e) {
                                        AM.error('操作失败');
                                    }
                                }
                            });
                        }
                    },
                    width: 50,
                    text: '设置'
                }
            ]
        }
    ]
});