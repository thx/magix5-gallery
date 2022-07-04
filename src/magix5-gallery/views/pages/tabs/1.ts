import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:1.html',
    render() {
        let list = [{
            value: 1,
            text: '模块1'
        }, {
            value: 2,
            text: '模块2'
        }, {
            value: 3,
            text: '模块3'
        }, {
            value: 4,
            text: '模块4'
        }];

        this.digest({
            list,
            selected: list[0].value
        });
    },

    'changeTab<change>'(e) {
        this.digest({
            selected: e.selected
        })
    }
})