Ext.define('AM.view.order.SearchPanel', {
    extend:'Ext.form.Panel',
    alias:'widget.search_panel',
    border:false,
    style: {
      borderRadius: 'none'
    },
    autoScroll: true,
    collapsible: true,
    collapsed: true,
    collapseDirection: 'right',
    title: '查询订单',
    frame: true,
    width: 200,
    dock: 'left',
    defaults: {
       labelAlign: 'top',
       xtype: 'textfield',
       padding: 10,
       width:170
    },
    items: [{
        fieldLabel: '订单号',
        name: 'orderId'
    }, {
        fieldLabel: '销售日期',
        name: 'date',
        xtype: 'datefield',
        editable: false,
        format: 'Y年m月d日',
        submitFormat: 'Y-m-d'
    }, {
        fieldLabel: '销售员',
        name: 'salesManName'
    }, {
        fieldLabel: '合同号',
        name: 'contractId'
    }, {
        fieldLabel: '订单状态',
        name: 'status',
        xtype: 'combo',
        queryMode: 'local',
        editable: false,
        forceSelection: true,
        valueField: 'id',
        store:Ext.create('Ext.data.Store', {
            fields:['id', 'text'],
            data:[
                {id:0, text:'待审核'},
                {id:1, text:'审核通过'},
                {id:2, text:'审核未通过'},
                {id:3, text:'取消'},
                {id:4, text:'已绑定'}
            ]
        })
    },{
        text: '查询',
        xtype: 'button',
        margin: 40,
        width: 100,
        height: 35,
        action: 'search_order'
    }]
});