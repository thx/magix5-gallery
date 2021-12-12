import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:6.html',
    render() {
        let list = [{
            value: 1,
            text: 'test'
        }, {
            value: 2,
            text: 'TestABC'
        }, {
            value: 3,
            text: 'Another'
        }];
        this.digest({
            list,
            selected: list[1].value
        })
    },
    'change<change>'(e) {
        debugger
    }
})