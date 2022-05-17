import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
let { applyStyle, Vframe, node } = Magix5;
applyStyle('@:./1.css');
export default View.extend({
    tmpl: '@:4.html',
    render() {
        this.digest({
            list: ['var(--mx5-color-brand)', 'var(--mx5-color-brand-vs)', 'var(--mx5-color-warn)'],
        });
    },
    'next<click>'(e) {
        let carousel = Vframe.byNode(node(`${this.id}_carousel`));
        carousel.invoke('next');
    },
    'prev<click>'(e) {
        let carousel =  Vframe.byNode(node(`${this.id}_carousel`));
        carousel.invoke('prev');
    }
});