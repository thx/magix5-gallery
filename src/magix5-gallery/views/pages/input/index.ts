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
                value: 'placeholder',
                text: '为空时控件中显示的内容',
                type: 'string',
                def: ''
            }, {
                value: 'small',
                text: '是否展示位小尺寸',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'type',
                text: '类型可选值<br/>输入框：text<br/>搜索框：search<br/>密码输入框：password',
                type: 'string',
                def: 'text'
            }, {
                value: 'show-delete',
                text: '是否显示一键清除icon',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'disabled',
                text: '是否禁用',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'autocomplete',
                text: '同input的autocomplete定义，<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input" target="_blank" class="color-brand">查看详情</a>',
                type: 'string',
                def: 'off'
            }],
            events: [{
                type: 'change',
                text: '输入内容有变化时触发',
                params: [{
                    value: 'value',
                    text: '输入框内容',
                    type: 'string'
                }]
            }],
            columns: [{
                text: '输入框',
                path: 1
            }, {
                text: '搜索框',
                path: 2
            }, {
                text: '前后缀',
                path: 3
            }, {
                text: '禁用',
                path: 4
            }],
        });
    },
})
