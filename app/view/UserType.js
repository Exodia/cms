/**
 营销员、合同管理员、发票管理员、发运员
 */
Ext.define('AM.view.UserType', {
    extend: 'Ext.form.field.ComboBox',
    alias:'widget.user_type',
    fieldLabel:'职位',
    queryMode:'local',
    store:Ext.create('Ext.data.Store', {
        fields:['userType', 'des'],
        data:[
            {userType:0, des:'营销员'},
            {userType:1, des:'合同管理员'},
            {userType:2, des:'发票管理员'},
            {userType:3, des:'发运员'}
        ]
    }),
    valueField:'userType',
    displayField:'des',
    editable:false,
    forceSelection:true,
    labelWidth:30,
    width:120,
    padding:5
});