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
                value: 'width',
                text: '宽度',
                type: 'number',
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
                value: 'max-length',
                text: 'value 的最大长度',
                type: 'number',
                def: ''
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
                value: 'auto-complete',
                text: '同input的autocomplete定义，<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input" target="_blank" class="color-brand">查看详情</a>',
                type: 'string',
                def: ''
            }],
            columns: [{
                text: 'demo',
                value: 1
            }],
        });
    },
})
