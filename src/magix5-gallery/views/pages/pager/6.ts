import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
Magix5.applyStyle('@:6.less');

export default View.extend({
    tmpl: '@:6.html',
    render() {
        this.digest({
            total: 600
        });
    }
});