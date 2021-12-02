import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:content.html',
    assign(options) {
        this.set(options);
    },
    render() {
        this.digest();
    }
});