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
                value: 'small',
                text: '是否为小号尺寸按钮',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'loading',
                text: 'loading状态，可选dot（三点），circle（圆形转圈）',
                type: 'string',
                def: ''
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
            }],
            columns: [{
                text: '主要品牌按钮',
                value: 1
            }, {
                text: '次要按钮',
                value: 2
            }],
            lefts: [{
                text: 'demo3',
                value: 3
            }, {
                text: 'demo4',
                value: 4
            }],
            rights: [{
                text: 'demo5',
                value: 5
            }]
        });

        this.assign(options);
    },
})
