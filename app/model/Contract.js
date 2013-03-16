//编号、客户、流水号、合同总价、合同总价（含税）、是否归档、已开票金额
Ext.define('AM.model.Contract', {
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
        model: 'AM.model.ContractDetail',
        foreignKey: 'contractId',
        associationKey: 'contractId',
        name: 'detail'
    },
    proxy: AM.createProxy('contract'),
    reader: AM.Reader,
    writer: AM.Writer
});


