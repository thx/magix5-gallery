import Magix5, { applyStyle, mix } from 'magix5';
import View from './base';
applyStyle('@:index.less');
applyStyle('@:card-logo-content.less');

export default View.extend({
    tmpl: '@:card-logo-content.html',
    assign(extra) {
        let { data, biz } = extra;

        // 每行三个
        // 前两个提取出来 + 文案区域
        let list = data.list || [];
        let firstLine = list.slice(0, 2).map(item => {
            return this['@:{to.card.item}'](item, biz);
        });

        // 后面再每3个分组
        let cardList = list.slice(2).map(item => {
            return this['@:{to.card.item}'](item, biz);
        })

        this.set({
            ...extra,
            firstLine,
            cardList,
        });
    }
});
