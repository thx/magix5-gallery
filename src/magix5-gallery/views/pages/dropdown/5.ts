import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:5.html',
    render() {
        let list = [{
            text: '请选择',
            value: 0,
            opers: []
        }, {
            text: '选项1',
            value: 1,
            opers: ['edit', 'delete'],
        }, {
            text: '选项2',
            value: 2,
            opers: ['edit', 'delete'],
        }, {
            text: '选项3',
            value: 3,
            opers: ['edit', 'delete'],
        }];

        this.digest({
            list,
            selected: list[0].value,
            operationType: '',
            operationItem: {},
        });
    },
    'change<change>'(e) {
        let { selected, operationType, operationItem, } = e;
        let { list } = this.get();
        if (operationType == 'delete') {
            for (let i = 0; i < list.length; i++) {
                if (list[i].value == operationItem.value) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
        this.digest({
            selected,
            operationType,
            operationItem,
        })
    }
})