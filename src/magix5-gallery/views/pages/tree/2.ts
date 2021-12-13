import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:2.html',
    render() {
        let list = [];
        let num = 5;
        let fn = (pValue) => {
            for (let i = 1; i < num; i++) {
                list.push({
                    value: pValue + '' + i,
                    text: Magix5.guid('测试_') + pValue + '' + i,
                    pValue
                })
            }
        }

        fn('');
        for (let i = 1; i < num; i++) {
            fn(i);
            for (let j = 1; j < num; j++) {
                fn(i + '' + j);
                for (let k = 1; k < num; k++) {
                    fn(i + '' + j + '' + k);
                }
            }
        }

        this.digest({
            list,
            bottomValues: []
        });
    },

    'change<change>'(e) {
        //  e.bottomValues
        //  e.bottomItems
        //  e.bottomValues
        //  e.realItem
        this.digest({
            bottomValues: e.bottomValues
        })
    }
});