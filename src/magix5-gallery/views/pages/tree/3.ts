import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:3.html',
    render() {
        let list = [];
        let num = 3;
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
            }
        }

        this.digest({
            list
        });
    }
});