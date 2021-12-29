import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    assign(options) {
        let that = this;
        let t = parseInt(Math.random() * 10000000000000000 + '');

        // 是否为统一品牌m动画，默认false
        let brand = (options.brand + '' === 'true');

        // 默认高度
        // m动画：用于页面切换loading，默认屏幕高度
        // 品牌转圈loading：200px
        let height = options.height || (brand ? 'calc(100vh)' : '200px');

        this.set({
            loadingId: `${that.id}${t}`,
            brand,
            height,
            color: options.color || 'var(--mx5-color-brand)',
            colorGradient: options.colorGradient || 'var(--mx5-color-brand)',
            colorBg: options.colorBg || '#DEE1E8',
            content: options.content,
        })
    },
    async render() {
        await Magix5.delay(2000);
        this.digest();
    }
});