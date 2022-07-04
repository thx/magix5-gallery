import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:4.html',
    render() {
        this.digest({
            list: [{
                value: 1,
                text: '模块1'
            }, {
                value: 2,
                text: '模块2',
                disabled: true,
            }, {
                value: 3,
                text: '模块3',
                disabled: true,
            }, {
                value: 4,
                text: '模块4',
                disabled: true,
            }, {
                value: 5,
                text: '模块5'
            }, {
                value: 6,
                text: '模块6'
            }],
            selected1: 3,
            selected2: 1,
            selected3: 2,
        });
    }
});
