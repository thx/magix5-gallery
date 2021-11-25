import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'key',
                text: '描述',
                type: 'array',
                def: '[]'
            }],
            columns: [{
                text: 'demo',
                value: 4
            }],
        });

        this.assign(options);
    },
})
