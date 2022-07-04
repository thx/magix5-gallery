import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:6.html',
    render() {
        this.digest({
            list: [{
                text: '投影版',
                value: 'shadow'
            }, {
                text: '分割线（默认样式）',
                value: 'spliter'
            }],
            data: [{
                text: '模块1',
                value: 1,
            }, {
                text: '模块2',
                value: 2,
            }, {
                text: '模块3',
                value: 3,
            }]
        });
    }
});
