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
                value: 'mode',
                text: '按钮模式<br/>primary：主要品牌按钮<br/>secondary：次要跟随按钮（默认）<br/>white：白色<br/>hollow：空心按钮',
                type: 'string',
                def: 'secondary'
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
                value: 'disabled-width',
                text: '禁用时hover显示禁用原因浮层宽度',
                type: 'number',
                def: '200'
            }, {
                value: 'disabled-placement',
                text: '禁用时hover提示框在目标的方位，top，bottom，left，right<br/>与目标距离10px',
                type: 'string',
                def: 'bottom'
            }, {
                value: 'size',
                text: '展示尺寸<br/>small：小号<br/>normal：正常尺寸<br/>large：大号尺寸',
                type: 'string',
                def: 'normal'
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
                text: '打标文案',
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
            }, {
                value: 'icon',
                text: '图标配置',
                type: '',
                def: ''
            }],
            columns: [{
                text: '主要品牌按钮',
                path: 1,
            }, {
                text: '次要按钮',
                path: 2,
            }, {
                text: '跟随按钮',
                path: 3,
            }, {
                text: '白色按钮',
                path: 4,
            }, {
                text: '按钮跳转外链',
                path: 5,
            }, {
                text: '状态切换',
                path: 6,
            }, {
                text: '自定义按钮',
                path: 4,
            }, {
                text: 'icon配置',
                path: 4,
            }, {
                text: '按钮尺寸',
                path: 4,
            }, {
                text: '使用样式class',
                path: 4,
            }],
        });
    },
})
