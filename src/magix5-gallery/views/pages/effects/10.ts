import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:10.html',
    render() {
        let list = [];
        for (let j = 0; j < 6; j++) {
            list.push({
                title: `消费者洞察报告${j}`,
                tip: '手淘搜索流量获取的营销工具，通过精准关键词和人群定向，结合智能算法个性化匹配，为宝贝获取手机淘宝搜索结果页下的精准流量。',
                icon: `<img src="${(j % 3 == 0) ? 'https://img.alicdn.com/tfs/TB1_5qvOUz1gK0jSZLeXXb9kVXa-74-58.png' : ((j % 3 == 1) ? 'https://img.alicdn.com/tfs/TB1ngCRb9slXu8jSZFuXXXg7FXa-104-60.png' : 'https://img.alicdn.com/tfs/TB1H83oRsfpK1RjSZFOXXa6nFXa-152-152.png')}">`,
                btn: '查看详情',
                link: 'https://www.taobao.com/',
                outer: true
            })
        }

        let options = [{
            text: '卡片显示模式',
            value: 'mode',
            list: [{
                text: 'logo图文卡片平铺',
                value: 'flat-logo-list'
            }, {
                text: 'logo图文卡片轮播',
                value: 'carousel-logo-list'
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