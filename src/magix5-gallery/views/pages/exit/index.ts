import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apisList: [],
            columns: [{
                text: 'view监控',
                path: 1
            }, {
                text: 'dialog',
                path: 2
            }, {
                text: '扩展思考',
                path: 3
            }]
        });
    },
})
