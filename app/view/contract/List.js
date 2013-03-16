Ext.define('AM.view.contract.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contract_list',
    store: 'Contracts',
    flex: 1,
    columns: [
        {header: '合同编号', dataIndex: 'codeNumber', flex: 1},
        {header: '合同对方', dataIndex: 'company', flex: 1},
        {header: '合同流水号', dataIndex: 'serialNumber', flex: 1},
        {header: '合同总价', dataIndex: 'totalPrice', flex: 1},
        {header: '合同总价(含税)', dataIndex: 'taxTotalPrice', flex: 1},
        {header: '合同状态', dataIndex: 'status', width: 60, renderer: function (v) {
            return AM.ContractStatus[v];
        }},
        {header: '已开票金额', dataIndex: 'computedPrice', flex: 1},
        {header: '经办日期', dataIndex: 'dealTime', flex: 1, renderer: function (v) {
            if (!v) {
                return '';
            }
            return Ext.Date.format(new Date(v), 'Y年m月d日');
        }}
    ],
    initComponent: function () {
        this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: this.store,
                dock: 'bottom',
                displayInfo: true
            }
        ];
        this.callParent(arguments);
    }

});