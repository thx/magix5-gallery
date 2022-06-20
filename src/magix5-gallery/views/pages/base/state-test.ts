import View from './demo';
import Magix5 from 'magix5';
let { delay, mark } = Magix5;
export default View.extend({
    tmpl: '@:./state-test.html',
    assign(data) {
        this.set(data);
    },
    async render() {
        let m = mark(this, '@:{render}');
        await delay(this.get('delay'));
        if (m()) {
            this.digest();
        }
    },
})