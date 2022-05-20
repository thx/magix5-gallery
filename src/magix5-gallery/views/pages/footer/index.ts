import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'mode',
                text: '页脚类型，简单版（simple）还是复杂版本',
                type: 'string',
                def: ''
            }, {
                value: 'products',
                text: '是否需要妈妈产品线信息',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'width',
                text: '产品线信息宽度，products = true时生效',
                type: 'number',
                def: '1000'
            }, {
                value: 'dark',
                text: '产品线信息深底色白字',
                type: 'boolean',
                def: 'false'
            },
            {
                value: 'biz-code',
                text: '特殊产品线的定制展示需求，目前已有定制如下：<br/>1. 策略中心（ adStrategy ）<br/>2. 联盟（ union ）',
                type: 'string',
                def: ''
            }],
            columns: [{
                text: '常规版',
                path: 1
            }, {
                text: '极简版',
                path: 2
            }, {
                text: '包含营销平台',
                path: 3
            }],
        });
    },
})
