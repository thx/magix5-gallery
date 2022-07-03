import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');
Magix.applyStyle('@message.less');

export default View.extend({
    tmpl: '@message.html'
});
