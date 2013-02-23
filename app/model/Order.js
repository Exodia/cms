/*
 *订单*
 id: 订单号
 project: 项目号
 date: 订单日期
 custom: 订货客户
 sale_group: 销售组
 salesman: 销售员
 detail: 订单详情
 */
Ext.define('AM.model.Order', {
    extend:'Ext.data.Model',
    fields:['id', 'project', 'date', 'custom','sale_group', 'salesman'],

    hasMany:{
        model: 'AM.model.Order.Detail',
        name: 'detail'
    }
});
/*
 * 订单详情
 id:
 material_code:   物质编码
 material_name:  物料名称
 type:           规格型号
 unit: 单位
 amount:  数量
 unit_price: 单价
 unit_tax_price: 含税单价
 deadline: 客户要求交货日期
 * */
Ext.define('AM.model.Order.Detail', {
    extend:'Ext.data.Model',
    fields:[
        'id', 'material_code', 'material_name', 'type','unit',
        'amount', 'unit_price', 'unit_tax_price', 'deadline'
    ]
});

/*项目号、销售日期、销售客户、销售人、订单总额订单号、项目号、销售日期、销售客户、销售人、订单总额*/