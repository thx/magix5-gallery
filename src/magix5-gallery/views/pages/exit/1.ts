import View from 'magix5-gallery/views/pages/base/demo';
import Dialog from '../../../gallery/mx-dialog/index';
export default View.extend<{
    saveState(): void
}>({
    tmpl: '@:1.html',
    init(data) {
        let position = data.from == 'dialog' ? '弹出框中的' : '';
        let msg = `尚未保存，确定离开吗?`;
        if (data.use == 'name') {
            msg = `名称${msg}`;
        } else if (data.use == 'addr') {
            msg = `地址${msg}`;
        } else {
            msg = `信息${msg}`;
        }
        this.observeExit(position + msg, () => {
            return this['@:{view.state}'] != JSON.stringify(this.get());
        });
    },
    assign(data) {
        this.set(data);
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