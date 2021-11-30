import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:3.html',
    assign(options) {
        this.set({
            textFn: (trigger) => {
                debugger
            }
        });
    },
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