/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-2-26
 * Time: 上午11:13
 */
Ext.define('AM.view.order.DetailList', {
    extend:'Ext.grid.Panel',
    alias:'widget.order_detail_list',
    store:'Orders',
    columns: [{
        header: '物质编码',
        dataIndex: 'detail.material_code',
        flex: 1
    }, {
        header: '物料名称',
        dataIndex: 'material_name',
        flex: 1
    }, {
        header: '规格型号',
        dataIndex: 'type',
        flex: 1
    }, {
        header: '计量单位',
        dataIndex: 'unit',
        width: 50
    }, {
        header: '数量',
        dataIndex: 'amount',
        flex: 0.5
    }, {
        header: '单价(元)',
        dataIndex: 'unit_price',
        flex: 0.5
    }, {
        header: '含税单价(元)',
        dataIndex: 'unit_tax_price',
        flex: 0.5
    }, {
        header: '金额(元)',
        dataIndex: 'price',
        flex: 0.5
    }, {
        header: '含税金额(元)',
        dataIndex: 'tax_price',
        flex: 0.5
    }, {
        header: '客户要求交货日期',
        dataIndex: 'detail.deadline',
        flex: 1,
        renderer: function(v) {
            return Ext.Date.format(new Date(v), 'Y年m月d日 H:i');
        }
    }],
    initComponent: function() {
        this.callParent(arguments);
        console.log(this.getStore())
       /* var detail = this.getStore().detail();
        this.getView().bindStore(detail);
        console.log(detail)*/
    }
});