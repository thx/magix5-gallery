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
                text: '标题+内容',
                path: 1
            }, {
                text: '只标题区域',
                path: 2
            }, {
                text: '只内容区域',
                path: 3
            }],
        });
    },
})
