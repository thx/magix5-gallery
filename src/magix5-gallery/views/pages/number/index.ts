import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'num',
                text: '当前展示数值，只挑取其中的数值进行处理',
                type: 'string',
                def: ''
            }, {
                value: 'format',
                text: '以千位分隔符方式格式化一个数字',
                type: 'boolean',
                def: 'true'
            }, {
                value: 'precision',
                text: 'format=true时，保留小数位精度，若不配置该字段，则原数值展示',
                type: 'number',
                def: ''
            }, {
                value: 'animation',
                text: '是否展示动画',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'font-size',
                text: 'animation=true时，字体大小，单位px',
                type: 'number',
                def: '32px'
            }, {
                value: 'line-height',
                text: 'animation=true时，行高，单位px',
                type: 'number',
                def: '48px'
            }, {
                value: 'color',
                text: 'animation=true时，文字颜色',
                type: 'string',
                def: 'var(--mx5-font-color)'
            }, {
                value: 'delay',
                text: 'animation=true时，整体延迟多少ms开始动画，单位毫秒，正整数',
                type: 'number',
                def: '400'
            }, {
                value: 'duration',
                text: 'animation=true时，动画持续多少ms，单位毫秒，正整数',
                type: 'number',
                def: '400'
            }, {
                value: 'number-delay',
                text: 'animation=true时，单个数字延迟多少ms开始动画，单位毫秒，正整数。<br/>举例：数字123，delay=200ms，duration=400ms，number-delay=20ms，则数字1延迟200ms开始动画400ms，数字2延迟220ms开始动画400ms，数字1延迟240ms开始动画400ms',
                type: 'number',
                def: '0'
            }],
            columns: [/*{
                text: '纯数字展示',
                path: 3
            },*/ {
                text: '动画参数',
                path: 1
            }/*, {
                text: '自定义动画样式',
                path: 2
            }*/],
        });
    },
})
