import Magix5 from 'magix5';
import Dialog from '../../../gallery/mx-dialog/index';
let { View } = Magix5;
export default View.extend<{
    saveState(): void
}>({
    tmpl: '@:./dialog.html',
    init(options) {
        this['@:{options}'] = options;
        this.observeExit('信息尚未保存，确定关闭弹框吗?', () => {
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
        let viewOptions = this['@:{options}'];
        if (viewOptions.dialog) {
            viewOptions.dialog.close();
        }
    },
    'observe<change>'(e) {
        this.set({
            [e.params.key]: e.value
        });
    },
    'cancel<click>'(event) {
        event.preventDefault();
        let viewOptions = this['@:{options}'];
        if (viewOptions.dialog) {
            viewOptions.dialog.close();
        }
    },
}).merge(Dialog);