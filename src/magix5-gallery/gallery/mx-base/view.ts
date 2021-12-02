import Magix5 from 'magix5';
import FormSync from '../mx-form/sync';
import Refs from "../mx-form/refs";
const Mx5ClassGap = ' ';

export default Magix5.View.extend({
    '@:{mx.class.add}'(target, classes) {
        let arr = classes.split(Mx5ClassGap),
            className = target.className;
        for (let i = 0; i < arr.length; i++) {
            let c = arr[i];
            if (c && (className.indexOf(c) < 0)) {
                className += `${Mx5ClassGap}${c}`;
            }
        }
        target.className = className;
    },
    '@:{mx.class.remove}'(target, classes) {
        let arr = classes.split(Mx5ClassGap),
            className = target.className;
        for (let i = 0; i < arr.length; i++) {
            let c = arr[i];
            if (c && (className.indexOf(c) > -1)) {
                className = className.replace(c, Mx5ClassGap);
            }
        }
        target.className = className;
    },
    '@:{mx.styles.add}'(target, styles) {
        for (let key in styles) {
            target.style[key] = styles[key];
        }
    },
    '@:{mx.style.offset}'(target) {
        var top = 0, left = 0;

        let walk = (target) => {
            top += target.offsetTop;
            left += target.offsetLeft;
            if (target.offsetParent) {
                walk(target.offsetParent);
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