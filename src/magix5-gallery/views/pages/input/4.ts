import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:4.html',
    render() {
        this.digest({
            value: '',
        })
    }
})