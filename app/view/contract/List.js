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
        {header: '合同总价(含税)', dataIndex: 'taxTotalPrcie', flex: 1},
        {header: '是否归档', dataIndex: 'fileStatus', width:60, renderer: function(v) {
            return ['否', '是'][v];
        }},
        {header: '已开票金额', dataIndex: 'computedPrice', flex: 1}
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