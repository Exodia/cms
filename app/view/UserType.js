/**
 营销员、合同管理员、发票管理员、发运员
 */
Ext.define('AM.view.UserType', {
    extend: 'Ext.form.field.ComboBox',
    alias:'widget.usertype',
    name:'user_type',
    fieldLabel:'职位',
    queryMode:'local',
    store:Ext.create('Ext.data.Store', {
        fields:['user_type', 'des'],
        data:[
            {user_type:0, des:'营销员'},
            {user_type:1, des:'合同管理员'},
            {user_type:2, des:'发票管理员'},
            {user_type:3, des:'发运员'}
        ]
    }),
    valueField:'user_type',
    displayField:'des',
    editable:false,
    forceSelection:true,
    labelWidth:30,
    width:120,
    padding:5
});