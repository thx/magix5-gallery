import View from 'magix5-gallery/views/pages/base/demo';
import Dialog from '../../../gallery/mx-dialog/index';
export default View.extend({
    tmpl: '@:4.html',
    render() {
        this.digest();
    },
    'open<click>'() {
        this.mxDialog('@:./dialog', {
            width: 600
        });
    }
}).merge(Dialog);