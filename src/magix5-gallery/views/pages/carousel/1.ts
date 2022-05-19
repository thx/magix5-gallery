import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
let { applyStyle } = Magix5;
applyStyle('@:./1.css');
export default View.extend({
    tmpl: '@:1.html',
    render() {
        this.digest();
    },
});