import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:12.html',
    render() {
        this.digest({
            list: [{
                value: 1,
                text: 'test'
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
            selected: [2, 3],
            // selected: '2,3',
        });
    },
    'change<change>'(event) {
        this.digest({
            selected: event.selected
        })
    }
})