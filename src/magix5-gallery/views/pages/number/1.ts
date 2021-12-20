import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:1.html',
    render() {
        this.set({
            setting: {
                delay: 400,
                duration: 400,
                numberDelay: 20
            },
            num: 8842.68
        });
        this['@:{set}']();
    },
    '@:{set}'() {
        let { setting } = this.get();
        this.digest({
            ...setting
        })
    },
    'add<click>'(e) {
        let { num } = this.get();
        this.set({
            num: num + 1423.08
        });
        this['@:{set}']();
    },
    'sub<click>'(e) {
        let { num } = this.get();
        this.set({
            num: num - 800.23
        });
        this['@:{set}']();
    }
})