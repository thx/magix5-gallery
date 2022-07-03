import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:7.html',
    render() {
        let list = [];
        for (let j = 0; j < 2; j++) {
            list.push({
                title: `消费者洞察报告${j}_0`,
                tip: '2020-03-08',
                img: 'https://img.alicdn.com/tfs/TB1x5bkx.T1gK0jSZFrXXcNCXXa-2066-864.png',
                btn: '查看详情',
                link: 'https://www.taobao.com/',
                outer: true,
                quotaes: [
                    { value: '12.33%', text: '新增粉丝率' },
                    { value: '1233', text: '新粉数' },
                    { value: '122', text: '老客数' }
                ],
                quotaeTip: ''
            }, {
                title: `消费者洞察报告${j}_1`,
                tip: '2020-03-08',
                img: 'https://img.alicdn.com/tfs/TB1x5bkx.T1gK0jSZFrXXcNCXXa-2066-864.png',
                btn: '查看详情',
                link: 'https://www.taobao.com/',
                outer: true,
                quotaes: [
                    { value: '12.33%', text: '新增粉丝率' },
                    { value: '1233', text: '新粉数' }
                ],
                quotaeTip: ''
            }, {
                title: `消费者洞察报告${j}_2`,
                tip: '2020-03-08',
                img: 'https://img.alicdn.com/tfs/TB1x5bkx.T1gK0jSZFrXXcNCXXa-2066-864.png',
                btn: '查看详情',
                link: 'https://www.taobao.com/',
                outer: true,
                quotaes: [],
                quotaeTip: '说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明'
            })
        }

        let options = [{
            text: '卡片显示模式',
            value: 'mode',
            list: [{
                text: '大卡片图文指标平铺',
                value: 'flat-common-quota'
            }, {
                text: '大卡片图文指标轮播',
                value: 'carousel-common-quota'
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
