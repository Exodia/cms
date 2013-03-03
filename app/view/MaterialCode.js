/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-2-24
 * Time: 下午3:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.MaterialCode', {
    extend: 'Ext.form.field.ComboBox',
    requires: ['AM.store.Materials'],
    alias:'widget.materialcode',
    store: 'Materials',
//    valueNotFoundText: '未找到匹配结果',
    forceSelection: true,
    queryMode: 'local',
    typeAhead: true,
    valueField: 'code',
    displayField: 'code',
    listeners: {
        focus: function() {
            var self = this,
                store = this.getStore();
            if(this.getValue()) {
                return;
            }
            if(store.isLoading()) {
                store.on('load', function(store, records, success) {
                    if(success) {
                        self.select(records[0].get('code'));
                        self.fire('select', self, records);
                    }
                });
            } else {
                self.select(store.first().get('code'));
                self.fireEvent('select', self, store.getRange());
            }
        }
    }

});