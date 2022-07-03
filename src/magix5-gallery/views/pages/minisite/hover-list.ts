import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');
Magix.applyStyle('@hover-list.less');

export default View.extend({
    tmpl: '@hover-list.html'
});
