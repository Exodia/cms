Ext.define('AM.view.contract.SearchPanel', {
    extend:'Ext.form.Panel',
    alias:'widget.contract_search_panel',
    border:false,
    style: {
      borderRadius: 'none'
    },
    autoScroll: true,
    collapsible: true,
    collapsed: true,
    collapseDirection: 'right',
    title: '查询合同',
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
        fieldLabel: '合同号',
        name: 'contractCode'
    },{
        fieldLabel: '流水号',
        name: 'serialNumber'
    }, {
        fieldLabel: '合同状态',
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
                {id:2, text:'审核不通过'},
                {id:3, text:'已归档'}
            ]
        })
    },{
        fieldLabel: '经办日期',
        xtype: 'datefield',
        editable: false,
        name: 'dealTime'
    }, {
        text: '查询',
        xtype: 'button',
        margin: 40,
        width: 100,
        height: 35,
        action: 'search_contract'
    }]
});