import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:12.html',
    render() {
        let list = [{
            code: 1,
            name: '模块1'
        }, {
            code: 2,
            name: '模块2',
            description: '模块2提示信息'
        }, {
            code: 3,
            name: '模块3',
            properties: {
                tag: 'NEW'
            }
        }, {
            code: 4,
            name: '模块4',
            properties: {
                tag: 'HOT',
                tagColor: 'green',
            }
        }, {
            code: 5,
            name: '模块5',
            properties: {
                disabled: true
            }
        }, {
            code: 6,
            name: '外链',
            properties: {
                link: 'https://www.taobao.com/'
            }
        }];

        this.digest({
            list,
            selected: list[1].code,
        });
    },

    'changeTab<change>'(e) {
        this.digest({
            selected: e.selected
        })
    },
})