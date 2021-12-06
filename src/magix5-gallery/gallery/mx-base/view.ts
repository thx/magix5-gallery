import Magix5 from 'magix5';
import FormSync from '../mx-form/sync';
import Refs from "../mx-form/refs";
const Mx5ClassGap = ' ';

export default Magix5.View.extend({
    '@:{mx.style.offset}'(target) {
        var top = 0, left = 0;

        let walk = (target) => {
            if (target) {
                top += target.offsetTop;
                left += target.offsetLeft;
                if (target.offsetParent) {
                    walk(target.offsetParent);
                }
            }
        }
        walk(target);

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