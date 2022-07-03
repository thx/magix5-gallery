import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');
Magix.applyStyle('@detail.less');

export default View.extend({
    tmpl: '@detail.html'
});



