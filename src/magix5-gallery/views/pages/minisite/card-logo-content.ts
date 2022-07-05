import Magix5, { applyStyle, mix } from 'magix5';
import View from './base';
applyStyle('@:index.less');
applyStyle('@:card-logo-content.less');

export default View.extend({
    tmpl: '@:card-logo-content.html',
    assign(extra) {
        let that = this;

        let info = JSON.parse(JSON.stringify(extra));
        delete info.biz.navs; // 消除外部变化参数的影响

        // 分组处理，支持轮播
        let data = info.data || {};
        delete data.index;  // 消除外部变化参数的影响

        // 每行三个
        // 前两个提取出来 + 文案区域
        let list = data.list || [];
        let firstLine = list.splice(0, 2).map(item => {
            return that['@:{to.card.item}'](item, info.biz);
        });

        // 后面再每3个分组
        let cardList = list.map(item => {
            return that['@:{to.card.item}'](item, info.biz);
        })

        that.set(mix(info, {
            firstLine,
            cardList
        }));
    }
});
