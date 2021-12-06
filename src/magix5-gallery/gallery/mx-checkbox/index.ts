import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    assign(extra) {
        this.set({
            checked: (extra.checked + '') === 'true',
            disabled: (extra.disabled + '') === 'true',
            indeterminate: (extra.indeterminate + '') === 'true',
            name: extra.name || '',
            value: extra.value || '',
            text: extra.text || '',
            tip: extra.tip || '',
            tagContent: extra.tagContent || '',
            tagColor: extra.tagColor || 'var(--mx5-color-error)',
        })
    },
    render() {
        this.digest();
    },
    '@:{change}<change>'(e) {
        this.digest({
            checked: e.target.checked,
            indeterminate: false
        })
    },
    /**
     * 外部直接里调用
     */
    setData(data) {
        this.digest(data);

        let { disabled } = this.updater.get();
        this.root.setAttribute('mx-checkbox-disabled', disabled);
    },
    /**
     * 外部直接里调用
     */
    getData() {
        return this.get();
    },
});