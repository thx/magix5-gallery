import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@:index.less');
applyStyle('@:login.less');

export default View.extend({
    tmpl: '@:login.html',
    assign(extra) {
        // 轮播点样式，默认为品牌色
        let { banners } = extra.data;
        let dotColorList = banners.map(b => {
            return {
                '--mx5-carousel-trigger-color': b.dotColor || 'var(--mx5-color-brand)',
            };
        })

        this.set({
            ...extra,
            dotColorList,
        });
    },
});



