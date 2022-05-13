import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'target',
                text: '渲染magix3区块的cdn地址',
                type: 'string',
                def: ''
            }, {
                value: 'params',
                text: '渲染区块时传递的参数',
                type: 'object',
                def: ''
            }, {
                value: 'preloads',
                text: '在渲染view前预加载的其它模块',
                type: 'string[]',
                def: ''
            }, {
                value: 'hook-events',
                text: '如果magix3组件内部使用jquery的trigger方法派发事件，则需要配置该项进行拦截处理，否则magix5将无法收到jquery的trigger事件',
                type: '',
                def: ''
            }],
            columns: [{
                text: '输入框',
                path: 'magix3-1'
            }],
        });
    },
})
