import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    init(options) {
        this.assign(options);
    },
    assign(options) {
        let that = this;
        let t = parseInt(Math.random() * 10000000000000000 + '');
        this.set({
            loadingId: `${that.id}${t}`,
            color: options.color || 'var(--mx5-color-brand)',
            colorGradient: options.colorGradient || 'var(--mx5-color-brand)',
            colorBg: options.colorBg || '#DEE1E8',
            content: options.content || 'loading...',
        })
    },
    render() {
        this.digest();
    }
});