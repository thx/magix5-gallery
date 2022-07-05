import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:11.html',
    render() {
        this.digest({
            list: [{
                value: 1,
                text: 'test',
                tip: '提示信息'
            }, {
                value: 2,
                text: 'TestABC'
            }, {
                value: 3,
                text: 'Another'
            }, {
                value: 4,
                text: '测试'
            }],
            selected: 2,
        });
    },
    'change<change>'(event) {
        this.digest({
            selected: event.selected
        })
    }
})