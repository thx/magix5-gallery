import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init() {
        let apis = [
            {
                value: 'list',
                text: `<pre>对象数组，格式如下：：
[{
    text: string, 
    value: string | number, 
    tag?: string,  // 打标标签
    color?: string, // 打标自定义颜色，默认红色
    tip?: string, // 提示信息
    disabled?: boolean, // 当前选项禁用
    img?: string, // 竖版右侧图片，正方形
}]
</pre>`,
                type: 'array',
                def: '[]',
            },
            {
                value: 'adc-list',
                text: `<pre>联动adc，直接传入adc组件树结构即可，数据格式如下：
[{
    code: "对应value",
    name: "对应text",
    textription: "提示信息，对应tip",
    properties: {
        disabled: "是否禁用",
        tag: "打标",
        tagColor: "打标颜色",
    }
}]</pre>`,
                type: 'array',
                def: '[]',
            },
            {
                value: 'selected',
                text: '当前选中值	',
                type: 'string',
                def: 'list的第一项',
            },
            {
                value: 'disabled',
                text: '是否禁用	',
                type: 'boolean',
                def: 'false',
            },
            {
                value: 'text-key',
                text: '	渲染text时读取的key',
                type: 'string',
                def: 'text',
            },
            {
                value: 'value-key',
                text: '	渲染value时读取的key',
                type: 'string',
                def: 'value',
            },
        ];

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
        }];

        let columns = [
            {
                text: '事件处理',
                path: 1,
            },
            {
                text: '打标+提示',
                path: 2,
            },
            // {
            //     text: '双向绑定',
            //     path: 8,
            // }, 
            {
                text: '同步校验阻断',
                path: 14,
            },
            {
                text: '自定义key',
                path: 3,
            },
            {
                text: '部分or整体禁用',
                path: 4,
            },
            {
                text: 'adc-list',
                path: 5,
            },
            {
                text: '多种展现形式',
                path: 6,
            }
        ];

        this.set({
            apis,
            events,
            columns,
        });
    },
});
