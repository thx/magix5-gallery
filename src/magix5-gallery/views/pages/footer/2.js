import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

module.exports = View.extend({
    tmpl: '@:./2.html',
    render() {
        this.digest();
    }
});