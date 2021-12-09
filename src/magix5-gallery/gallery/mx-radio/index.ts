import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    assign(options) {
        this.set({
            checked: (options.checked + '') === 'true',
            disabled: (options.disabled + '') === 'true',
            name: options.name || '',
            value: options.value || '',
            text: options.text || '',
            tip: options.tip || '',
            tagContent: options.tagContent || '',
            tagColor: options.tagColor || 'var(--mx5-color-error)',
        })
    },
    render() {
        this.digest();
    }
});