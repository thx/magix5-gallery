import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:4.html',
    render() {
        let list = [];
        let num = 5;
        let fn = (pValue) => {
            for (let i = 1; i < num; i++) {
                list.push({
                    value: pValue + '' + i,
                    text: Magix5.guid('测试_') + pValue + '_' + i,
                    pValue
                })
            }
        }

        fn('');
        for (let i = 1; i < num; i++) {
            fn(i);
        }

        this.digest({
            list,
            selected: 12
        });
    },

    'change<change>'(e) {
        //  e.bottomValues
        //  e.bottomItems
        //  e.realValues
        //  e.realItem
        this.digest({
            selected: e.selected
        })
    }
});