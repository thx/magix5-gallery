import Magix5 from 'magix5';
import FormSync from '../mx-form/sync';
import Refs from "../mx-form/refs";

export default Magix5.View.extend({
    '@:{mx.style.offset}'(target) {
        let top = 0, left = 0;
        if (target && target.getBoundingClientRect) {
            let infos = target.getBoundingClientRect();
            top += (infos.top + window.pageYOffset);
            left += (infos.left + window.pageXOffset);
        }

        return {
            top,
            left,
        }
    },
}).merge(FormSync, Refs, {
    ctor() {
        let attrs = this.root ? this.root.attributes : {};

        // 埋点
        let spm = attrs['data-spm-click']?.value || '';

        this.set({
            spm
        });
    }
});