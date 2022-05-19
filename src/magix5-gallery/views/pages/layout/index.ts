import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apisList: [{
                text: 'mx-layout.row API',
                list: [{
                    value: 'sticky',
                    text: '是否需要吸顶',
                    type: 'boolean',
                    def: 'false'
                }]
            }, {
                text: 'mx-layout.col API',
                list: [{
                    value: 'content',
                    text: '标题',
                    type: 'string',
                    def: ''
                }, {
                    value: 'icon-tip',
                    text: '小问号提示信息',
                    type: 'string',
                    def: ''
                }, {
                    value: 'tip',
                    text: '提示信息',
                    type: 'string',
                    def: ''
                }, {
                    value: 'link',
                    text: '右侧链接',
                    type: 'url',
                    def: ''
                }, {
                    value: 'link-text',
                    text: '右侧链接文案',
                    type: 'string',
                    def: '查看详情'
                }, {
                    value: 'border',
                    text: '是否需要底边分割线',
                    type: 'boolean',
                    def: 'true'
                }]
            }],
        });
    },
})
