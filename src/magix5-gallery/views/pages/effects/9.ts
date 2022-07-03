import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:9.html',
    render() {
        let list = [];
        for (let j = 0; j < 6; j++) {
            list.push({
                title: `你的直通车为啥赚不到钱开翻车呢${j}`,
                subTitle: '秋秋引流实战训练营',
                tip: '经常遇到有商家问，我的商品单价很低，能否做直通车推广？一个商品才卖那么几元，直通.',
                icon: '<img src="https://img.alicdn.com/tfs/TB12EX_mrY1gK0jSZTEXXXDQVXa-200-200.png" />',
                btn: '查看详情',
                link: 'https://www.taobao.com/',
                outer: true
            })
        }

        let options = [{
            text: '卡片显示模式',
            value: 'mode',
            list: [{
                text: 'icon图文卡片平铺',
                value: 'flat-icon-list'
            }, {
                text: 'icon图文卡片轮播',
                value: 'carousel-icon-list'
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