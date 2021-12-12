import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:2.html',
    render() {
        let num = 1842.68;

        this.digest({
            setting: {
                delay: 400,
                duration: 400,
            },
            num,
            str: this['@:{format.number}'](num),
            duration: 400,
        });
    },
    'run<click>'(e) {
        let { delay, duration } = this.get();
        this.digest({
            numberDelay: delay,
            numberDuration: duration
        })
    },
    'add<click>'(e) {
        let { num, setting } = this.get();
        num = (+num) + 1423.08;
        this.digest({
            ...setting,
            num,
            str: this['@:{format.number}'](num),
        })
    },
    'sub<click>'(e) {
        let { num, setting } = this.get();
        num = (+num) - 800.23;
        this.digest({
            ...setting,
            num,
            str: this['@:{format.number}'](num),
        })
    },
})