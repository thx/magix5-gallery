import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'content',
                text: '按钮显示文案',
                type: 'string',
                def: ''
            }, {
                value: 'type',
                text: '按钮类型',
                type: 'string',
                def: 'false'
            }, {
                value: 'disabled',
                text: '是否禁用',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'disabled-tip',
                text: '禁用时hover显示禁用原因',
                type: 'string',
                def: ''
            }, {
                value: 'small',
                text: '是否为小号尺寸按钮',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'loading',
                text: '是否loading中',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'color',
                text: '按钮背景颜色',
                type: '合法色值',
                def: ''
            }, {
                value: 'color-hover',
                text: 'hover按钮背景颜色',
                type: '合法色值',
                def: '配置了color才生效<br/>默认=color'
            }, {
                value: 'color-text',
                text: '按钮文字颜色',
                type: '合法色值',
                def: '配置了color才生效<br/>默认=#ffffff'
            }, {
                value: 'color-hover-text',
                text: 'hover按钮文案颜色',
                type: '合法色值',
                def: '配置了color才生效<br/>默认=color-text'
            }, {
                value: 'tag-content',
                text: '打标文案，支持html片段',
                type: 'string',
                def: ''
            }, {
                value: 'tag-color',
                text: '打标颜色，品牌色按钮默认红色，禁用按钮默认灰色，其他默认品牌色',
                type: '合法色值',
                def: ''
            }, {
                value: 'link-href',
                text: '规定链接指向的页面的 URL',
                type: 'URL',
                def: ''
            }, {
                value: 'link-target',
                text: `<pre>规定在何处打开链接文档，可选值同a标签target：
_blank
_parent
_self
_top
framename</pre>`,
                type: 'string',
                def: '_blank',
            }],
            columns: [{
                text: '主要按钮',
                path: 1
            }, {
                text: '次要按钮',
                path: 2
            }, {
                text: '白色按钮',
                path: 3
            }, {
                text: '状态切换',
                path: 5
            }],
            lefts: [{
                text: '自定义颜色',
                path: 4
            }],
            rights: [{
                text: '外链',
                path: 6
            }]
        });
    },
})
