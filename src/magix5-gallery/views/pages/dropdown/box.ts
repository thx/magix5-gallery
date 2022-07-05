import Magix5, { Router } from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        let apis = [{
            value: 'multiple',
            text: '是否为多选',
            type: 'boolean',
            def: 'false',
            isMulti: true
        }, {
            value: 'need-all',
            text: '多选下拉框是否需要全选功能，默认true',
            type: 'boolean',
            def: 'true',
            isMulti: true
        }, {
            value: 'need-group',
            text: '多选下拉框是否需要分组全选功能，默认false',
            type: 'boolean',
            def: 'false',
            isMulti: true
        }, {
            value: 'list',
            text: `<pre>列表数组
1. 简单数组[1,2,3]
2. 对象数组，如[{
    value:1,
    text: "a",
    tip: "选项提示信息", 
    disabled: true/false,  //该选项是否禁用
    disabledTip: '禁用原因，没有可不配',
    pValue: '', //可选个，父节点value值
    opers: ['edit', 'delete'], // 支持操作项的下拉框
}]</pre>`,
            type: 'array'
        }, {
            value: 'selected',
            text: '当前选中值',
            type: 'string|array',
            def: '单选选中值：单值<br/><br/>多选选中值，支持：<br/>1. 逗号分隔，如1,2,3，此时双向绑定返回值逗号分隔；<br/>2. 数组[1,2,3]，此时双向绑定返回值为数组；<br/><br/>不传默认为空，返回默认为逗号分隔'
        }, {
            value: 'trigger-type',
            text: '浮层唤起方式，可选点击（click），鼠标悬浮展开（hover）',
            type: 'string',
            def: 'click'
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
            value: 'parents',
            text: `<pre>
分组数组，格式如下：
[{
    text: '组文案',
    value: '分组值，对应list的pValue'
}]
</pre>`,
            type: 'array',
            def: ''
        }, {
            value: 'parent-key',
            text: '表示父节点value的字段',
            type: 'string',
            def: 'pValue'
        }, {
            value: 'searchbox',
            text: '是否开启搜索框',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'height',
            text: '下拉框最大高度',
            type: 'number',
            def: '280'
        }, {
            value: 'empty-text',
            text: '没有选择时的提示文案<br/>单选：配置该值时，会对应添加一个value=\'\'的选项<br/>多选：当没有选中项时显示该文案',
            type: 'string',
            def: ''
        }, {
            value: 'name',
            text: '下拉框名称，展示位name：selected',
            type: 'string',
            def: ''
        }, {
            value: 'disabled',
            text: '是否禁用',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'mode',
            text: '显示模式，可选值：<br/>text：纯文案<br/>tag：可操作标签',
            type: 'string',
            def: 'text',
            isMulti: true,
        }, {
            value: 'submit-checker',
            text: '自定义提交校验函数',
            type: 'function',
            def: `<pre>
(selected) => {
    // selected 当前选中值
    return new Promise(resolve => {
        // 错误提示信息，无错误信息才继续提交
        let errorMsg = '';
        resolve(errorMsg);
    })
}
</pre>`,
            isMulti: true,
        }, {
            value: 'min',
            text: '选择个数下限，min > 0时，点击确定时若len < min，不允许提交',
            type: 'number',
            def: '',
            isMulti: true,
        }, {
            value: 'max',
            text: '选择个数上限，len >= max时不允许再选择',
            type: 'number',
            def: '',
            isMulti: true,
        }, {
            value: 'continuous',
            text: '是否要求选择连续的数据<br/>continuous = true时，点击确定时若选择不是连续数据，不允许提交<br/>提示请选择连续的(${name} || 数据)',
            type: 'boolean',
            def: 'false',
            isMulti: true,
        }, {
            value: 'size',
            text: '展示尺寸<br/>small：小号<br/>normal：正常尺寸<br/>large：大号尺寸',
            type: 'string',
            def: 'normal'
        }, {
            value: 'over',
            text: '数据量超过20个时，是否一行显示4个，默认true，若希望一行显示一个指定over=false即可',
            type: 'boolean',
            def: 'true',
            isMulti: true,
        }, {
            value: 'tip',
            text: '额外的提示信息',
            type: 'string',
            def: ''
        }];

        // 事件
        let events = [{
            type: 'change',
            text: '',
            params: [{
                value: 'values',
                text: '当前选中value数组',
                type: 'array'
            }, {
                value: 'texts',
                text: '当前选中text数组',
                type: 'array'
            }, {
                value: 'value',
                text: '当前选中value值，等于values.join(",")',
                type: 'string'
            }, {
                value: 'text',
                text: '当前选中text值，等于texts.join(",")',
                type: 'string'
            }, {
                value: 'selected',
                text: '当前选中值，初始化为什么类型就保持什么类型，默认string',
                type: 'string|array'
            }, {
                value: 'operationType',
                text: '当选项包含操作项时，返回的操作项类型，当前支持的类型 edit || delete',
                type: 'string'
            }, {
                value: 'operationItem',
                text: '当选项包含操作项时，返回的当前操作项。<br/>如果为编辑，则为编辑的对象（当前选中 = 当前编辑）；<br/>如果为移除，则为被移除的对象（当前选中 != 当前编辑）；',
                type: 'object'
            }]
        }];

        let columns = [
            {
                text: '单选',
                path: 11,
            },
            {
                text: '多选',
                path: 12,
            },
            {
                text: '混合模式',
                path: 13,
            },
            {
                text: '部分or整体禁用',
                path: 14,
            }
        ];

        this.set({
            apis,
            events,
            columns,
        });
    },
})
