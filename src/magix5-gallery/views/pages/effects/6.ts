import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:6.html',
    render() {
        let list = [];
        let len = 5;
        for (let j = 0; j < len; j++) {
            list.push({
                leftTag: (j == 0) ? '<img style="height: 20px; margin-top: var(--mx5-card-gap-ver); margin-left: var(--mx5-card-gap-hor);" src="https://img.alicdn.com/tfs/TB1kkbEdoT1gK0jSZFrXXcNCXXa-100-34.png" />' : '',
                leftTagText: (j == 1) ? 'ISSUE 01' : '',
                title: `消费者洞察报告${j}`,
                titleTag: (j == 0) ? '<img style="height: 18px;" src="https://img.alicdn.com/tfs/TB1VXc0Lhv1gK0jSZFFXXb0sXXa-120-40.jpg" />' : '',
                titleTagText: (j == 1) ? 'ISSUE 01' : '',
                tip: '报告洞察每个环节的消费者触达效率，同时提供了相应的优化建议，有效挖掘市场机会。',
                img: 'https://ossgw.alicdn.com/alp/42666982-0e67-4674-83ae-0e1f9e5c2453.jpeg',
                btn: '查看详情',
                link: 'https://www.taobao.com/',
                outer: false,
            })
        }

        let options = [{
            text: '卡片显示模式',
            value: 'mode',
            list: [{
                text: '大卡片图文链接平铺',
                value: 'flat-common-list'
            }, {
                text: '大卡片图文链接轮播',
                value: 'carousel-common-list'
            }, {
                text: '小卡片图文链接平铺',
                value: 'flat-small-list'
            }, {
                text: '小卡片图文链接轮播',
                value: 'carousel-small-list'
            }]
        }, {
            text: '每行卡片个数',
            value: 'line-number',
            list: [{
                text: '3个',
                value: 3
            }, {
                text: '4个',
                value: 4
            }]
        }, {
            text: '卡片文案显示行数',
            value: 'tip-line-number',
            list: [{
                text: '2行',
                value: 2
            }, {
                text: '3行',
                value: 3
            }, {
                text: '4行',
                value: 4
            }]
        }, {
            text: '对齐方式',
            value: 'text-align',
            list: [{
                text: 'left',
                value: 'left'
            }, {
                text: 'center',
                value: 'center'
            }, {
                text: 'right',
                value: 'right'
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
        selected[option] = item;
        this.digest({
            selected,
        })
    },
})