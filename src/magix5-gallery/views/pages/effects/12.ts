import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:12.html',
    render() {
        let list = [];
        for (let j = 0; j < 6; j++) {
            list.push({
                title: `消费者洞察报告${j}`,
                icon: '<img src="https://img.alicdn.com/tfs/TB12EX_mrY1gK0jSZTEXXXDQVXa-200-200.png" />',
                btn: '查看详情',
                link: 'https://www.taobao.com/',
                outer: true,
                links: [{
                    title: '[预通知]淘宝/天猫直通车商品推广',
                    link: 'https://www.tmall.com/',
                    outer: true
                }, {
                    title: '[预通知]淘宝/天猫直通车商品推广',
                    link: 'https://www.tmall.com/',
                    outer: true
                }, {
                    title: '[预通知]淘宝/天猫直通车商品推广',
                    link: 'https://www.tmall.com/',
                    outer: true
                }]
            })
        }

        let options = [{
            text: '卡片显示模式',
            value: 'mode',
            list: [{
                text: '多链接图文指标平铺',
                value: 'flat-links-list'
            }, {
                text: '多链接图文指标轮播',
                value: 'carousel-links-list'
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
    }
})