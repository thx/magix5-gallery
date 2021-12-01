import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    assign(options) {
        let defMode = 'first';
        let mode = options.mode || defMode;
        let allowedModes = { first: true, second: true };
        if (!allowedModes[mode]) {
            mode = defMode;
        }

        this.set({
            mode,
            content: options.content || '',
            tip: options.tip || '',
        });
    },
    render() {
        this.digest();
    }
});