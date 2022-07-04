import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@index.less');
applyStyle('@learn.less');

export default View.extend({
    tmpl: '@img.html'
});
