import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');
Magix.applyStyle('@card-case.less');

export default View.extend({
    tmpl: '@card-case.html'
});

