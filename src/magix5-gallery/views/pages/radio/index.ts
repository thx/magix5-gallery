import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'name',
                text: 'radio的name值',
                type: 'string',
                def: ''
            }, {
                value: 'value',
                text: 'radio的value值',
                type: 'string',
                def: ''
            }, {
                value: 'text',
                text: '显示的文案值',
                type: 'string',
                def: ''
            }, {
                value: 'checked',
                text: '是否选中',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'disabled',
                text: '是否禁用',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'tip',
                text: '小问号提示',
                type: 'string',
                def: ''
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
                text: '文案提示打标',
                path: 1
            }],
        });
    },
})
