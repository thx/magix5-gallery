import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

let listen=e=>{
    console.log(e);
};
Magix5.attachAll([window,document],'click',listen);
Magix5.detachAll([window,document],'click',listen);
export default View.extend({
    tmpl: '@:1.html'
})