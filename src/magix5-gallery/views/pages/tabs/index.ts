import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {

        let apis = [{
            value: 'list',
            text: `<pre>
对象数组，格式如下：
[{
    value: 1,
    text: '选项1',
    link: '外链',
    tagContent: '自定义打标内容，优先级tagContent > tag',
    tag: '打标标签',
    color: '打标自定义颜色，默认红色，只对tag生效',
    tip: '提示信息',
    disabled: false  // 单选项禁用
}]</pre>`, type: 'array'
        }, {
            value: 'adc-list',
            text: `<pre>联动adc，直接传入adc组件树结构即可，数据格式如下：
[{
    code: "对应value",
    name: "对应text",
    description: "提示信息，对应tip",
    properties: {
        disabled: "是否禁用",
        tag: "打标",
        tagColor: "打标颜色",
        link: "外链地址",
    }
}]</pre>`,
            type: 'array'
        }, {
            value: 'selected',
            text: '当前选中值',
            type: 'string',
            def: '不传默认取list第一个'
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
            value: 'disabled',
            text: '是否禁用',
            type: 'boolean',
            def: 'false'
        }];

        let events = [{
            type: 'change',
            text: '切换tab时触发',
            params: [{
                value: 'selected',
                text: '当前选中value，同value',
                type: 'string'
            }, {
                value: 'value',
                text: '当前选中value',
                type: 'string'
            }, {
                value: 'text',
                text: '当前选中text',
                type: 'string'
            }, {
                value: 'item',
                text: '当前选中完整对象',
                type: 'object'
            }]
        }]

        let columns = [
            {
                text: '事件处理',
                path: 1,
            },
            {
                text: '双向绑定',
                path: 2,
            },
            {
                text: '自定义textKey/valueKey',
                path: 3,
            },
            {
                text: '禁用状态',
                path: 4,
            },
        ];

        this.set({
            apis,
            events,
            columns,
        });
    },
});
