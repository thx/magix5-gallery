import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'copy-node',
                text: '需要复制的节点id',
                type: 'string',
                def: ''
            }, {
                value: 'text',
                text: '不需要显示复制内容时，可直接配置 text ',
                type: 'string',
                def: ''
            }, {
                value: 'text-fn',
                text: `自定义处理复制function<pre>
text-fn: (trigger) => {
    // trigger 当前节点
    return '复制内容';
}
</pre>`,
                type: 'function',
                def: ''
            }],
            events: [{
                type: 'success',
                text: '复制成功触发',
                params: [{
                    value: 'text',
                    text: '复制的内容',
                    type: 'string'
                }]
            }, {
                type: 'error',
                text: '复制失败触发',
                params: [{
                    value: '-',
                    text: '-',
                    type: '-'
                }]
            }],
            columns: [{
                text: '静态显示复制',
                path: 1
            }, {
                text: '静态隐式复制',
                path: 2
            }, {
                text: '动态同步复制',
                path: 3
            }, {
                text: '动态异步复制',
                path: 4
            }],
        });
    },
})
