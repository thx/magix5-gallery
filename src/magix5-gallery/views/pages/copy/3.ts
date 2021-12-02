import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:3.html',
    assign(options) {
        this.set({
            textFn: (trigger) => {
                return trigger.innerText;
            }
        });
    },
    'copy<success>'(e) {
        this.digest({
            successText: e.text,
            errorText: '',
        })
    },
    'copy<error>'(e) {
        this.digest({
            successText: '',
            errorText: e.text,
        })
    }
});