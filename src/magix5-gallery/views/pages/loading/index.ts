import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'brand',
                text: '是否为m动画',
                type: 'boolean',
                def: 'false'
            }],
            columns: [{
                text: '品牌色loading',
                path: 2
            }, {
                text: '统一品牌m动画',
                path: 1
            }],
        });
    },
})
