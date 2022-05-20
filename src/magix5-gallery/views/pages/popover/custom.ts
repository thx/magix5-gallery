import Magix5 from 'magix5';
import View from 'magix5-gallery/view';
Magix5.applyStyle('@:custom.less');

export default View.extend({
    tmpl: '@:custom.html',
    init(e) {
        this.set({
            ...e.data,
            viewId: this.id
        });
    },
    render() {
        this.digest();
    }
});