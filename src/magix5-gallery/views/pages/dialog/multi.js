import Magix from 'magix5'
import Dialog from '../../../gallery/mx-dialog/index';
let { delay, View } = Magix;
module.exports = View.extend({
    tmpl: '@:./multi.html',
    init(e) {
        this.viewOptions = e;

        let { width, height, number } = e;
        this.set({
            width,
            height,
            number
        });
    },
    async render() {
        // 延时显示loading动画
        await delay(500);
        this.digest();
    },
    'cancel<click>'(event) {
        event.preventDefault();
        let viewOptions = this.viewOptions;
        if (viewOptions.dialog) {
            viewOptions.dialog.close();
        }
    },
    'modal<click>'(e) {
        let { width, number } = this.get();
        this.mxDialog('@:./multi', {
            number: +number + 1,
            width: +width - 100,
            modal: true
        });
    },
    'closeAll<click>'(e) {
        this.mxCloseAllDialogs();
    },
}).merge(Dialog);
