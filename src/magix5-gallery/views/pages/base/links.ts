import Magix5 from 'magix5';
import View from 'magix5-gallery/view';

export default View.extend({
    tmpl: '@:links.html',
    init(options) {
        this.assign(options);
    },
    assign(options) {
        this.set(options);
    },
    render() {
        this.digest();
    }
})