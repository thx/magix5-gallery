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
            viewId: this.id,
            list,
            selected1: [1, 2, 3],
            selected2: '1,2,3',
            selected3: [1, 2, 3],
            selected4: [1, 2, 3],
            selected5: [1, 2, 3],
            selected6: [1, 2, 3],
            num: 4,
            line: 4,
            page: 1,
            checkboxes: []
        });
    },

    'change<change>'(e) {
        let { index, value } = e.params;
        this.digest({
            [`selected${index}`]: value
        })
    }
});