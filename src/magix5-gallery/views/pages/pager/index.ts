import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        let apis = [{
            value: 'total',
            text: '总数',
            type: 'number'
        }, {
            value: 'page',
            text: '当前第几页',
            type: 'number',
            def: 1
        }, {
            value: 'offset',
            text: '偏移量，优先级 page > offset',
            type: 'number',
            def: 0
        }, {
            value: 'size',
            text: '每页多少条',
            type: 'number',
            def: 40
        }, {
            value: 'sizes',
            text: '可选分页数',
            type: 'array',
            def: '[10,20,30,40]'
        }, {
            value: 'jump',
            text: '是否有快捷跳转',
            type: 'boolean',
            def: 'true'
        }, {
            value: 'simplify',
            text: '只有翻页器，没有汇总数据版本',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'sizes-change',
            text: '是否可切换分页数',
            type: 'boolean',
            def: 'true'
        }, {
            value: 'mini',
            text: '顺序翻页版本',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'step',
            text: '页码过多时，中间显示多少条页码',
            type: 'number',
            def: '5'
        }, {
            value: 'mode',
            text: '展现样式<br/>mode=square：方形版<br/>mode=circle：圆形版',
            type: 'string',
            def: 'square'
        }]

        let events = [{
            type: 'change',
            text: '切换页码，分页数时均会触发',
            params: [{
                value: 'page',
                text: '当前页码',
                type: 'number'
            }, {
                value: 'size',
                text: '每页条数',
                type: 'number'
            }, {
                value: 'offset',
                text: '偏移量：offset = (page - 1) * size',
                type: 'number'
            }]
        }];

        let columns = [{
            text: '完整版',
            path: 1
        }, {
            text: '精简版',
            path: 2
        }, {
            text: '顺序翻页',
            path: 3
        }, {
            text: 'offset or page',
            path: 5
        }, {
            text: '对齐方式',
            path: 4
        }];
        // {
        //     text: '各种展现样式',
        //     path: 6
        // }

        this.set({
            apis,
            events,
            columns
        });
    }
});