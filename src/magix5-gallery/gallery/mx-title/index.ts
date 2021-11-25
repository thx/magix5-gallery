import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    init(options) {
        this.assign(options);
    },
    assign(options) {
        this.set({
            mode: options.mode || 'first',
            content: options.content || '',
            tip: options.tip || '',
        });
    },
    render() {
        this.digest();
    }
});