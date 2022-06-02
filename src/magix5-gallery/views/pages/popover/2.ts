import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:2.html',
    async render() {
        await this.digest({
            custom: {
                list: [{
                    name: '消耗',
                    key: 'charge',
                    type: 'double'
                }, {
                    name: '展现量',
                    key: 'adPv',
                    type: 'integer'
                }, {
                    name: '点击量',
                    key: 'click',
                    type: 'integer'
                }, {
                    name: '点击率',
                    key: 'ctr',
                    type: 'percent'
                }, {
                    name: '点击率2',
                    key: 'ctr2',
                    type: 'percent'
                }, {
                    name: '点击率1',
                    key: 'ctr1',
                    type: 'percent'
                }, {
                    name: '点击率3',
                    key: 'ctr3',
                    type: 'percent'
                }, {
                    name: '点击率4',
                    key: 'ctr4',
                    type: 'percent'
                }]
            }
        });
    },
})