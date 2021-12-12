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
                value: 'delay',
                text: '整体延迟多少ms开始动画，单位毫秒',
                type: 'number',
                def: '400'
            }, {
                value: 'duration',
                text: '动画持续多少ms，单位毫秒',
                type: 'number',
                def: '400'
            }, {
                value: 'number-delay',
                text: '单个数字延迟多少ms开始动画，单位毫秒。举例：<ul style="list-style: square inside;"><li>数字123，delay=200ms，duration=400ms，number-delay=20ms，则数字1延迟200ms开始动画400ms，数字2延迟220ms开始动画400ms，数字1延迟240ms开始动画400ms</li><li>数字123，delay=200ms，duration=400ms，number-delay= -20ms，则数字1延迟200ms开始动画400ms，数字2延迟180ms开始动画400ms，数字1延迟160ms开始动画400ms</li></ul>',
                type: 'number',
                def: '0'
            }, {
                value: 'font-size',
                text: '字体大小，单位px',
                type: 'number',
                def: '32'
            }, {
                value: 'line-height',
                text: '行高，默认字体大小1.5倍，单位px',
                type: 'number',
                def: '48'
            }, {
                value: 'color',
                text: '文字颜色',
                type: 'string',
                def: '#333333'
            }],
            columns: [{
                text: '动画参数',
                path: 1
            }, {
                text: '自定义样式',
                path: 2
            }],
        });
    },
})
