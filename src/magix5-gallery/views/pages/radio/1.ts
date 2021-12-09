import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:1.html',
    render() {
        let list = [];
        for (let i = 1; i < 5; i++) {
            list.push({
                value: i,
                text: `选项${i}`,
                tip: '提示信息',
                tag: '打标',
            })
        }

        this.digest({
            list,
            selected1: 1,
            selected2: 1,
            selected3: 1,
            selected4: 1,
            selected5: 1,
            selected6: 1,
        });
    },

    'change<change>'(e) {
        let { index, value } = e.params;
        this.digest({
            [`selected${index}`]: value
        })
    }
});