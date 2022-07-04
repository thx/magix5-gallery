import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@index.less');
applyStyle('@hover-list.less');

export default View.extend({
    tmpl: '@hover-list.html'
});
