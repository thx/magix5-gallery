import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'content',
                text: '提示文案',
                type: 'string',
                def: '',
            }, {
                value: 'brand',
                text: '是否为m动画',
                type: 'boolean',
                def: 'false'
            }],
            columns: [{
                text: '模块加载loading',
                path: 2
            }, {
                text: '页面加载loading',
                path: 1
            }],
        });
    },
})
