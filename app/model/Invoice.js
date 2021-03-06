Ext.define('AM.model.Invoice', {
    extend: 'Ext.data.Model',
    fields: ['id', 'invoiceCode', 'companyName', 'salesManId',
        'salesManName', 'contractCode', 'invoiceMoney', 'status',
        {
            name: 'invoiceDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        'info'
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


