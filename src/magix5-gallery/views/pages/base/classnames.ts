import Magix5 from 'magix5';
import View from 'magix5-gallery/view';

export default View.extend({
    tmpl: '@:classnames.html',
    init(options) {
        this.set({
            list: []
        })
    },
    render() {
        this.digest();
    }
})