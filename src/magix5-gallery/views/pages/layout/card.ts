import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apisList: [{
                text: 'mx-layout API',
                list: [{
                    value: 'sticky',
                    text: '是否需要吸顶',
                    type: 'boolean',
                    def: 'false'
                }]
            }, {
                text: 'mx-layout.title API',
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
            }, {
                text: 'mx-layout.body API',
                list: [{
                    value: 'content',
                    text: '内容',
                    type: 'string',
                    def: ''
                }]
            }],
            columns: [{
                text: '标题+内容',
                path: 1
            }, {
                text: '只标题区域',
                path: 2
            }, {
                text: '只内容区域',
                path: 3
            }],
        });
    },
})
