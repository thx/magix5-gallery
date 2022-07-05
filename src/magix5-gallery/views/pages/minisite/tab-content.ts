import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:tab-content.html'
});
