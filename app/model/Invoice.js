//编号、客户、流水号、合同总价、合同总价（含税）、是否归档、已开票金额
Ext.define('AM.model.Invoice', {
    extend: 'Ext.data.Model',
    fields: ['id', 'codeNumber',  'customId', 'companyName', 'serialNumber', 'type', 'salesManId',
        'salesManName', 'totalPrice', 'taxTotalPrice', 'status', 'computedPrice',
        {
            name: 'dealTime',
            type: 'date',
            dateFormat: 'Y-m-d'
        }
    ],
    hasMany: {
        model: 'AM.model.InvoiceDetail',
        foreignKey: 'invoiceId',
        associationKey: 'invoiceId',
        name: 'detail'
    },
    proxy: AM.createProxy('invoice'),
    reader: AM.Reader,
    writer: AM.Writer
});


