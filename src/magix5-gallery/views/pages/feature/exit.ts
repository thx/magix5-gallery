import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [],
            columns: [{
                text: '页面切换示例',
                path: 1
            }, {
                text: '对话框示例',
                path: 1
            }, {
                text: 'Tab切换示例',
                path: 1
            }],
            // lefts: [{
            //     text: 'demo3',
            //     value: 3
            // }, {
            //     text: 'demo4',
            //     value: 4
            // }],
            // rights: [{
            //     text: 'demo5',
            //     value: 5
            // }]
        });
    },
})
