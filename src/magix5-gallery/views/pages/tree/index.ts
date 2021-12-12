import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        let apis = [{
            value: 'list',
            text: `<pre>
页面展示数据列表，例如：
[{
    value: 1,
    pValue: '', //父节点value值，根节点无
    text: '计划1'
}, {
    value: 11,
    pValue: 1,
    text: '单元1-1'
}]
</pre>`,
            type: 'array',
            def: ''
        }, {
            value: 'bottom-values',
            text: '已选中的最底层value列表，传入bottom-values双向绑定也为bottom-values',
            type: 'array',
            def: ''
        }, {
            value: 'real-values',
            text: '已选中的汇总到父节点的value值，传入real-values双向绑定也为real-values<br/>与bottom-values互斥',
            type: 'array',
            def: ''
        }, {
            value: 'text-key',
            text: '渲染text时读取的key',
            type: 'string',
            def: 'text'
        }, {
            value: 'value-key',
            text: '渲染value时读取的key',
            type: 'string',
            def: 'value'
        }, {
            value: 'parent-key',
            text: '表示父节点value的字段',
            type: 'string',
            def: 'pValue'
        }, {
            value: 'need-all',
            text: '是否需要全选功能',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'read-only',
            text: '是否只是展示',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'has-line',
            text: '是否有连接线',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'need-expand',
            text: '是否需要展开收起功能',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'close',
            text: '默认状态下是否收起',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'searchbox',
            text: '是否开启搜索框<br/>搜索时展开高亮匹配项，并将匹配项滚动到可视范围之内',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'width',
            text: '搜索框宽度',
            type: 'number',
            def: '100%'
        }, {
            value: 'height',
            text: '树最大高度，超出时滚动',
            type: 'number',
            def: ''
        }]

        let events = [{
            type: 'change',
            text: '切换某个标签状态时触发',
            params: [{
                value: 'bottomValues',
                text: '已选中的最底层value列表，入参为bottom-values时返回',
                type: 'array'
            }, {
                value: 'bottomItems',
                text: '已选中的最底层完整对象，入参为bottom-values时返回',
                type: 'array'
            }, {
                value: 'realValues',
                text: '已选中的汇总到父节点的数据，入参为real-values时返回',
                type: 'array'
            }, {
                value: 'realItems',
                text: '已选中的汇总到父节点完整对象，入参为real-values时返回',
                type: 'array'
            }]
        }];

        let columns = [{
            text: '文案提示打标',
            path: 1
        }];

        this.set({
            apis,
            events,
            columns,
        });
    },
})
