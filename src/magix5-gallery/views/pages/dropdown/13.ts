import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:13.html',
    render() {
        this.digest({
            selected: [3, 5],
            // selected: 2, // 数组或者字符串均可
            list: [{
                value: 1,
                text: '单选1'
            }, {
                value: 3,
                text: '多选1',
                multiple: true
            }, {
                value: 4,
                text: '多选2',
                multiple: true
            }, {
                value: 5,
                text: '多选3',
                multiple: true
            }, {
                value: 2,
                text: '单选2'
            }]
        });
    },
    'change<change>'(event) {
        this.digest({
            selected: event.selected
        })
    }
})