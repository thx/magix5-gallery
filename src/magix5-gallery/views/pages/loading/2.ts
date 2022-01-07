import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
import FormSync from '../../../gallery/mx-form/sync';

export default View.extend({
    tmpl: '@:2.html',
    'changeText<click>'(){
        this.digest({
            text1:Math.random()
        })
    }
}).merge(FormSync)