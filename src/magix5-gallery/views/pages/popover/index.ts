import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'content',
                text: '提示内容',
                type: 'string',
                def: ''
            },],
            columns: [{
                text: 'demo',
                path: 1
            }],
        });
    },
})
