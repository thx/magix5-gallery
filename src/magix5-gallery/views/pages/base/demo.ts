import Magix5 from 'magix5';
import View from 'magix5-gallery/view';
let CopyText = '复制代码';

export default View.extend({
    init(options) {
        let d = {};
        for (let i = 1; i < 20; i++) {
            d[`text${i}`] = CopyText;
        }
        this.set(d);
    },
    assign(options) {
        this.set(options);
    },
    async render() {
        // if (DEBUG) {
        //     await Magix5.delay(1000);
        // }
        await this.digest();
    },
    async '@:{done}<click,success>'(e) {
        let that = this;
        let id = e.params.id;
        await that.digest({
            [`text${id}`]: '<span class="mx5-color-pass"><i class="mx5-iconfont mx5-mr5">&#xe729;</i>复制成功</span>',
        });

        setTimeout(() => {
            that.digest({
                [`text${id}`]: CopyText
            });
        }, 1000);
    },
})