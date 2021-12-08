import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'content',
                text: '提示内容',
                type: 'string'
            }, {
                value: 'width',
                text: '提示框宽度',
                type: 'number',
                def: 200
            }, {
                value: 'placement',
                text: `<pre>提示框在目标的方位，与目标距离10px
bl：bottom left 下方，左对齐
br：bottom right 下方，右对齐
bc：bottom center 下方，居中对齐
tl：top left 上方，左对齐
tr：top right 上方，右对齐
tc：top center 上方，居中对齐
rt：right top 右侧，上对齐
rb：right bottom 右侧，下对齐
rc：right center 右侧，居中对齐
lt：left top 左侧，上对齐
lb：left bottom 左侧，下对齐
lc：left center 左侧，居中对齐
</pre>`,
                type: 'string',
                def: 'bottom'
            }, {
                value: 'left',
                text: '最终定位相对于屏幕左侧，配置 left + top 时忽略 placement',
                type: 'number',
                def: ''
            }, {
                value: 'top',
                text: '最终定位相对于屏幕高侧，配置 left + top 时忽略 placement',
                type: 'number',
                def: ''
            }, {
                value: 'offset',
                text: `<pre>在placement / (left + top) 基础上微量偏移
offset: {
    left: -10,
    top: 10
}</pre>`,
                type: 'object',
                def: ''
            }, {
                value: 'auto',
                text: '默认自动展开提示框',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'view',
                text: '自定义提示内容view，配置的view以view为准，绝对路径',
                type: 'string'
            }, {
                value: 'view-data',
                text: '自定义提示内容view需要传入的数据',
                type: 'object&nbsp;&nbsp;|&nbsp;&nbsp;array',
                def: ''
            }, {
                value: 'type',
                text: '展现样式<br/>dark：深底色<br/>white：白底色',
                type: 'string',
                def: 'white'
            }, {
                value: 'z-index',
                text: '自定义z-index',
                type: 'number',
                def: '999999'
            }, {
                value: 'show-delay',
                text: '显示延迟时间，单元毫秒，默认100',
                type: 'number',
                def: '100'
            }, {
                value: 'hide-delay',
                text: '消失延迟时间，单元毫秒，默认200',
                type: 'number',
                def: '200'
            }],
            columns: [{
                text: '深色 / 浅色版',
                path: 2
            }, {
                text: '定位',
                path: 1
            }],
        });
    },
})
