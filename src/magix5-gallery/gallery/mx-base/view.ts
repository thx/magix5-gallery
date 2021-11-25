import Magix5 from 'magix5';
import FormSync from '../mx-form/sync';
import Refs from "../mx-form/refs";

export default Magix5.View.extend({

}).merge(FormSync, Refs, {
    ctor() {
        let attrs = this.root ? this.root.attributes : {};
        let spm = (attrs['data-spm-click'] || {})['value'] || '';
        this.set({
            spm
        });
    }
});