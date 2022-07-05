import Magix5, {applyStyle} from 'magix5';
import View from './base';
applyStyle('@index.less');
applyStyle('@detail.less');

export default View.extend({
    tmpl: '@detail.html'
});



