import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'mode',
                text: 'icon类型<br/>solid：可选实心打标<br/>hollow：空心打标<br/>opacity：透明背景色',
                type: 'string',
                def: 'solid'
            }, {
                value: 'type',
                text: [
                    '展示类型',
                    'common：灰色类型提示（默认）',
                    'error：红色错误类型提示',
                    'warn：黄色警告类型提示',
                    'pass：绿色通过类型提示',
                    'highlight：品牌色图标强调提示'
                ].join('<br>'),
                type: 'string',
                def: 'common'
            }, {
                value: 'color',
                text: '自定义颜色，实心的背景色，空心的边框+字体颜色，设置了color的时候忽略type',
                type: 'hex格式色号',
                def: ''
            }, {
                value: 'color-text',
                text: '自定义文案颜色',
                type: 'hex格式色号',
                def: ''
            }, {
                value: 'tip',
                text: 'hover提示信息',
                type: 'string',
                def: ''
            }, {
                value: 'tip-width',
                text: 'hover提示信息宽度',
                type: 'number',
                def: '200'
            }, {
                value: 'tip-placement',
                text: 'hover提示框在目标的方位，top，bottom，left，right<br/>与目标距离10px',
                type: 'string',
                def: 'bottom'
            }, {
                value: 'tip-align',
                text: 'hover提示框与目标的对齐方式，top，bottom，left，right，center',
                type: 'string',
                def: 'center'
            }, {
                value: 'tip-view',
                text: 'hover提示框自定义提示内容view',
                type: 'string',
                def: ''
            }, {
                value: 'tip-data',
                text: 'hover提示框自定义提示内容view需要传入的数据',
                type: 'object',
                def: '{}'
            }],
            columns: [{
                text: '实心icon',
                path: 1,
            }, {
                text: '空心icon',
                path: 2,
            }, {
                text: '透明度icon',
                path: 3,
            }, {
                text: '带提示信息',
                path: 4,
            }, {
                text: '自定义颜色',
                path: 5,
            }],
        });
    },
})
