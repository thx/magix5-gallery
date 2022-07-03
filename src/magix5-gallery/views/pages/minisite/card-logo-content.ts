import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');
Magix.applyStyle('@card-logo-content.less');

export default View.extend({
    tmpl: '@card-logo-content.html',
    assign(extra) {
        let that = this;
        that.updater.snapshot();

        let info = $.extend(true, {}, extra);
        delete info.biz.navs; // 消除外部变化参数的影响

        // 分组处理，支持轮播
        let data = info.data || {};
        delete data.index;  // 消除外部变化参数的影响

        // 每行三个
        // 前两个提取出来 + 文案区域
        let list = data.list || [];
        let firstLine = list.splice(0, 2).map(item => {
            return that.toCardItem(item, info.biz);
        });

        // 后面再每3个分组
        let cardList = list.map(item => {
            return that.toCardItem(item, info.biz);
        })

        that.updater.set(Magix.mix(info, {
            firstLine,
            cardList
        }));

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    }
});
