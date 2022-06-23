import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            columns: [{
                text: '默认样式',
                path: 1,
            }, {
                text: '左文字个数',
                path: 2,
            }],
        });
    },
})
