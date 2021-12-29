import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:1.html',
    'toggleBorder<click>'() {
        let bd = this.get('bd');
        this.digest({
            bd: !bd
        })
    }
})