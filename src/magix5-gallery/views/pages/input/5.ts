import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:5.html',
    render() {
        this.digest({
            value1: '',
            value2: '',
        })
    },
    'change<change>'(e) {
        this.digest({
            [`value${e.params.index}`]: e.value
        })
    }
})