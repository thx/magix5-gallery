import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:8.html',
    render() {
        this.digest({
            list: [{
                value: 1,
                text: '模块1',
            }, {
                value: 2,
                text: '模块2',
                disabled: true,
            }, {
                value: 3,
                text: '模块3'
            }],
            selected1: 2,
            selected2: 1,
            selected3: 3,
        });
    }
})