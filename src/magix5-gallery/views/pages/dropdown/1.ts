import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:1.html',
    render() {
        this.digest({
            selected: 2,
            list: [{
                value: 1,
                text: 'test'
            }, {
                value: 2,
                text: 'TestABC'
            }, {
                value: 3,
                text: 'Another'
            }]
        })
    },
    'change<change>'(event) {
        this.digest({
            selected: event.selected
        })
    }
})