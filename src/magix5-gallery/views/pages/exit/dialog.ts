import Magix5 from 'magix5';
import Dialog from '../../../gallery/mx-dialog/index';
let { View } = Magix5;
export default View.extend<{
    saveState(): void
    queryTip(): boolean
    getState(): object
}>({
    tmpl: '@:./dialog.html',
    init(options) {
        this['@:{options}'] = options;
        this.observeExit('弹出框表单信息尚未保存，确定关闭弹框吗?', this.queryTip.bind(this));
    },
    getState() {
        return {
            userName: this.get('userName'),
            userAddr: this.get('userAddr')
        };
    },
    queryTip() {
        return this['@:{view.state}'] != JSON.stringify(this.getState());
    },
    exitConfirm(msg, resolve, reject) {
        this.confirm(msg, resolve, reject);
    },
    saveState() {
        this['@:{view.state}'] = JSON.stringify(this.getState());
    },
    render() {
        this.set({
            userName: '',
            userAddr: ''
        });
        this.saveState();
        this.digest({
            needTip: this.queryTip()
        });
    },
    'saveState<click>'() {
        this.saveState();
        this.digest({
            needTip: this.queryTip()
        });
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
            [e.params.key]: e.value,
        });
        this.digest({
            needTip: this.queryTip()
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