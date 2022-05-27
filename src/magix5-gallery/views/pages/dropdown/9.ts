import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:9.html',
    render() {
        this.digest({
            selected: 2,
        })
    },
    'change<change>'(e) {
        this.digest({
            selected: e.selected
        })
    }
})