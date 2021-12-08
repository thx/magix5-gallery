import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:5.html',
    'change<click>'(e) {
        this.digest({
            loading: !this.get('loading')
        })
    }
})