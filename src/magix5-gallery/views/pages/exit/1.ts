import View from 'magix5-gallery/views/pages/base/demo';
import Dialog from '../../../gallery/mx-dialog/index';
export default View.extend<{
    saveState(): void
}>({
    tmpl: '@:1.html',
    init() {
        this.observeExit('信息尚未保存，确定离开吗?', () => {
            return this['@:{view.state}'] != JSON.stringify(this.get());
        });
    },
    exitConfirm(msg, resolve, reject) {
        this.confirm(msg, resolve, reject);
    },
    saveState() {
        this['@:{view.state}'] = JSON.stringify(this.get());
    },
    render() {
        this.digest({
            userName: '',
            userAddr: ''
        });
        this.saveState();
    },
    'save<click>'() {
        this.saveState();
    },
    'observe<change>'(e) {
        this.set({
            [e.params.key]: e.value
        });
    }
}).merge(Dialog);