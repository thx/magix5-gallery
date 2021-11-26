import Magix5 from 'magix5';
import View from '../base/demo';
export default View.extend<{
    getSnapshot(): string
}>({
    tmpl: '@:1.html',
    init() {
        View.prototype.init.apply(this, arguments);
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
    exitConfirm(msg, resolve, reject) {
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