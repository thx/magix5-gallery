import Magix5 from 'magix5';
import View from '../base/demo';
Magix5.applyStyle('@:./dingding.less');

module.exports = View.extend({
    tmpl: '@:./dingding.html',
    render() {
        this.digest();
    }
});