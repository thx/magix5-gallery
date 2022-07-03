import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:13.html',
    render() {
        let list = [];
        for (let i = 0; i < 6; i++) {
            list.push({
                title: '精准扶持',
                tip: '搜索结果页消费者费者搜索结果页消费者费者搜索结果页消费者费者搜索结果页消费者费者',
                icon: '<img src="https://img.alicdn.com/imgextra/i2/O1CN01dYZaHt1yCHnbmdaCS_!!6000000006542-2-tps-136-136.png" />',
                iconHover: '<img src="https://img.alicdn.com/imgextra/i3/O1CN01nxpxiF1bI1bAR14aB_!!6000000003441-2-tps-136-136.png" />',
                btn: '立即投放',
                link: 'https://www.taobao.com/',
                outer: true,
            })
        }
        list[0].leftTag = '<img style="height: 24px;" src="https://img.alicdn.com/imgextra/i4/O1CN01DQ1g3t1rfs4Y7c0Mb_!!6000000005659-2-tps-130-46.png" />';

        let options = [{
            text: '卡片显示模式',
            value: 'mode',
            list: [{
                text: 'hover背景色图文卡片平铺',
                value: 'flat-hover-list'
            }, {
                text: 'hover背景色图文卡片轮播',
                value: 'carousel-hover-list'
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