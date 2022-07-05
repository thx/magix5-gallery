import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@:index.less');
applyStyle('@:box-list.less');

export default View.extend({
    tmpl: '@:box-list.html'
});
