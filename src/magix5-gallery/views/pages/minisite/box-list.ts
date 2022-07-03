import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');
Magix.applyStyle('@box-list.less');

export default View.extend({
    tmpl: '@box-list.html'
});
