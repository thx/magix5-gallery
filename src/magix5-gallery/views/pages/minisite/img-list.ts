import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@:index.less');
applyStyle('@:img-list.less');

export default View.extend({
    tmpl: '@:img-list.html'
});
