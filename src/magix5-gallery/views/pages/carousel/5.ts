import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
let { applyStyle, Vframe, node } = Magix5;
applyStyle('@:./1.css');
export default View.extend({
    tmpl: '@:5.html',
    render() {
        let that = this;
        this.digest({
            triggerHook(currentIndex, targetIndex) {
                // currentIndex: 当前页码，从0开始
                // targetIndex: 目标页码，从0开始
                return new Promise<void>((resolve, reject) => {
                    if (currentIndex == 1 && targetIndex == 2) {
                        //that.alert('系统提示', '禁止从第二页翻到第三页');
                        reject();
                    } else {
                        resolve();
                    }
                })
            }
        });
    },
});