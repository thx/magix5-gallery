import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:7.html',
    render() {
        let list = [{
            value: 1,
            text: '默认打标',
            tag: 'NEW',
        }, {
            value: 2,
            text: '自定义标颜色',
            tag: 'NEW',
            color: '#30ab66'
        }, {
            value: 3,
            text: '无打标',
        }, {
            value: 4,
            text: '自定义打标模块',
            tagContent: '<img src="https://img.alicdn.com/tfs/TB1pvD4dkP2gK0jSZPxXXacQpXa-100-34.png" style="max-width: none; width: 50px;"/>',
            tip: '自定义打标模块'
        }];

        this.digest({
            list,
            selected: list[1].value
        });
    },

    'changeData<click>'(e) {
        let list = [{
            value: 4,
            text: '新模块1',
            tag: 'NEW'
        }, {
            value: 5,
            text: '新模块2'
        }];
        let selected = list[0].value;
        this.digest({
            list,
            selected
        })
    },

    'changeTab<change>'(e) {
        this.digest({
            selected: e.selected
        })
    },
})