import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'value',
                text: '值',
                type: 'string',
                def: ''
            }, {
                value: 'prefix',
                text: '输入框前缀，前缀仅做内容类型表意提示，无交互行为，组件提供一些默认预留字<br/>search：搜索框<br/>money：金额输入<br/>user：用户输入<br/>其余内容：原样输出',
                type: 'string',
                def: ''
            }, {
                value: 'suffix',
                text: '输入框后缀，后缀可放置一些有交互行为的操作icon，或者纯提示类的语义表达<br/>组件提供一些默认预留字<br/>search：强调搜索框<br/>delete：一键移除，操作点<br/>password：密码框，可操作切换是否显示<br/>其余情况：原样输出，纯展示',
                type: 'string',
                def: ''
            }, {
                value: 'size',
                text: '展示尺寸<br/>small：小号<br/>normal：正常尺寸<br/>large：大号尺寸',
                type: 'string',
                def: 'normal'
            }, {
                value: 'search-list',
                text: `<pre>搜索类型列表
{
    text: "类型",
    value: "类型value",
} </pre>`,
                type: 'object',
                def: '[]'
            }, {
                value: 'search-value',
                text: '当前选中搜索类型',
                type: 'string',
                def: 'search-list[0].value'
            }, {
                value: 'search-width',
                text: '搜索框宽度，默认预留两个字符宽度，可配置 100px 或者 50%',
                type: 'string',
                def: '两个字符宽度'
            }, {
                value: 'disabled',
                text: '是否禁用',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'maxlength',
                text: 'value 的最大长度',
                type: 'number',
                def: ''
            }, {
                value: 'placeholder',
                text: '为空时控件中显示的内容',
                type: 'string',
                def: ''
            }, {
                value: 'autocomplete',
                text: '同input的autocomplete定义，<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input" target="_blank" class="color-brand">查看详情</a>',
                type: 'string',
                def: ''
            }],
            events: [{
                type: 'change',
                text: '输入框value变化，或者有类型筛选变化时触发',
                params: [{
                    value: 'value',
                    text: '当前选中value',
                    type: 'string'
                }, {
                    value: 'searchValue',
                    text: '多类型输入下，当前选中类型value',
                    type: 'string'
                }]
            }],
            columns: [{
                text: '输入框',
                path: 1,
            }, {
                text: '前缀后缀',
                path: 2,
            }, {
                text: '搜索框',
                path: 3,
            }, {
                text: '分类型搜索',
                path: 4,
            }, {
                text: '字符计数',
                path: 5,
            }, {
                text: '展现尺寸',
                path: 6,
            }, {
                text: '禁用',
                path: 7,
            }],
        });
    },
})
