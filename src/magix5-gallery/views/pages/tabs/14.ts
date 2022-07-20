import Magix5, { isNumeric } from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:14.html',
    render() {
        let list = [{
            value: 1,
            text: '菜单1',
        }, {
            value: 2,
            text: '菜单2',
        }, {
            value: 3,
            text: '菜单3',
        }];

        let values = {};
        list.forEach(item => {
            values[item.value] = '';
        })

        this.digest({
            selected: list[0].value,
            list,
            values,
        });
    },

    'changeValue<change>'(e) {
        let { values, selected } = this.get();
        values[selected] = e.value;
        this.digest({
            values,
        })
    },

    'changeTab<change>'(e) {
        let { selected, values } = this.get();
        if (isNumeric(values[selected])) {
            this.digest({
                error: false,
                selected: e.value,
            })
        } else {
            e.preventDefault();
            this.digest({
                error: true,
            })
        }
    },
})