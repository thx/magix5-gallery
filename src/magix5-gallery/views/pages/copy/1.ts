import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:1.html',
    'copy<success>'(e) {
        this.digest({
            success: true,
            error: false,
        })
    },
    'copy<error>'(e) {
        this.digest({
            success: false,
            error: true,
        })
    }
})