import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@index.less');
applyStyle('@card-case.less');

export default View.extend({
    tmpl: '@card-case.html'
});

