import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:8.html',
    render() {
        let list = [];
        for (let j = 0; j < 2; j++) {
            list.push({
                title: `卡片${j}`,
                tip: '报告洞察每个环节的消费者触达效率，同时提供了相应的优化建议，有效挖掘市场机会。',
                img: 'https://img.alicdn.com/tfs/TB1x5bkx.T1gK0jSZFrXXcNCXXa-2066-864.png'
            })
        }

        this.digest({
            list,
            selected: {},
        });
    },
    'select<select>'(e) {
        this.digest({
            selected: e.item
        })
    }
})