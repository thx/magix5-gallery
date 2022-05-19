import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
let { applyStyle } = Magix5;
applyStyle('@:./1.css');
export default View.extend({
    tmpl: '@:2.html',
    render() {
        let list = [{
            value: 'dot-in-center',
            text: 'dot-in-center(默认)'
        }, {
            value: 'dot-in-left',
            text: 'dot-in-left'
        }, {
            value: 'dot-in-right',
            text: 'dot-in-right'
        }, {
            value: 'dot-out-center',
            text: 'dot-out-center'
        }, {
            value: 'line-in-center',
            text: 'line-in-center'
        }, {
            value: 'line-in-left',
            text: 'line-in-left'
        }, {
            value: 'line-in-right',
            text: 'line-in-right'
        }, {
            value: 'line-out-center',
            text: 'line-out-center'
        }]

        let verticals = [{
            value: 'false',
            text: '水平(默认)'
        }, {
            value: 'true',
            text: '垂直'
        }]

        this.digest({
            viewId: this.id,
            cur: list[list.length - 1],
            list,
            curVer: verticals[0],
            verticals
        });
    },
    'change<change>'(e) {
        this.digest({
            cur: e.params.item
        })
    },
    'changeVer<change>'(e) {
        this.digest({
            curVer: e.params.item
        })
    }
});