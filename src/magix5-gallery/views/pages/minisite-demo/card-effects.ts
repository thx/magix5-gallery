import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@index.less');

export default View.extend({
    tmpl: '@card-common.html',
    render() {
        this.digest({
            cardType: 'carousel-common-quota'
        });
    }
});


