import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
let Base = View.prototype;
export default View.extend<{
    getSnapshot(): string
}>({
    tmpl: '@:1.html',
    init() {
        Base.init.apply(this, arguments);
        this.set({
            user: {
                name: 'xl'
            }
        });
        this['@:{current.state}'] = this.getSnapshot();
        this.observeExit('您修改了内容，尚未保存，确认离开吗？', () => {
            let nowState = this.getSnapshot();
            return nowState != this['@:{current.state}'];
        });
    },
    async exitConfirm(msg, resolve, reject) {
        //模拟异步场景
        await Magix5.delay(300);
        if (window.confirm(msg)) {
            resolve();
        } else {
            reject();
        }
    },
    getSnapshot() {
        return JSON.stringify(this.get());
    },
    'save<click>'() {
        this['@:{current.state}'] = this.getSnapshot();
    }
})