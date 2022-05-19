import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [
                {
                    value: 'list',
                    text: `列表,列表项如下:</br>
                    [{</br>
                        text: string</br>
                        value: string | number</br>
                        tag?: string</br>
                        color?: string</br>
                        tip?: string</br>
                        tips?:string </br>
                        img?: string</br>
                        disabled?: boolean</br>
                    }]
                    `,
                    type: 'array',
                    def: '[]',
                },
                {
                    value: 'selected',
                    text: '当前选中值	',
                    type: 'string',
                    def: 'list的第一项',
                },
                {
                    value: 'disabled',
                    text: '是否禁用	',
                    type: 'boolean',
                    def: 'false',
                },
                {
                    value: 'text-key',
                    text: '	渲染text时读取的key',
                    type: 'string',
                    def: 'text',
                },
                {
                    value: 'value-key',
                    text: '	渲染value时读取的key',
                    type: 'string',
                    def: 'value',
                },
            ],
            columns: [
                {
                    text: '事件处理',
                    path: 1,
                },
                {
                    text: '双向绑定',
                    path: 2,
                },
                {
                    text: '自定义textKey/valueKey',
                    path: 3,
                },
                {
                    text: '禁用状态',
                    path: 4,
                },
            ],
        });
    },
});
