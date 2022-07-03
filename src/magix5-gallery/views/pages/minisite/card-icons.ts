import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@card-common.html',
    render() {
        this.updater.digest({
            cardType: 'carousel-icon-list'
        });
    }
});


