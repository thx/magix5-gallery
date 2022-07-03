import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:11.html',
    render() {
        let list = [];
        for (let j = 0; j < 6; j++) {
            list.push({
                title: `消费者洞察报告${j}`,
                tip: '美妆行业新人群、新趋势、新场景机会，后风险时代的红海突围和蓝海挖掘，如何突破？',
                img: 'https://img.alicdn.com/tfs/TB1x5bkx.T1gK0jSZFrXXcNCXXa-2066-864.png',
                btns: [{
                    btn: '预览',
                }, {
                    btn: '下载',
                }]
            })
        }

        let options = [{
            text: '卡片显示模式',
            value: 'mode',
            list: [{
                text: '多按钮图文指标平铺',
                value: 'flat-btns-list'
            }, {
                text: '多按钮图文指标轮播',
                value: 'carousel-btns-list'
            }]
        }]

        let selected = {};
        for (let key in options) {
            let option = options[key];
            selected[option.value] = option.list[0].value;
        }

        this.digest({
            list,
            options,
            selected,
        });
    },
    'change<change>'(e) {
        let { selected } = this.get();
        let { option, item } = e.params;
        selected[option] = item
        this.digest({
            selected
        })
    },
    'select<select>'(e) {
        let { item, btn } = e;
        this.digest({
            selectedItem: item.title,
            selectedBtn: btn.btn
        })
    }
})