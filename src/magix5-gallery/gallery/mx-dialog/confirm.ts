/*
    author:https://github.com/xinglie
 */
import Magix from 'magix';
import I18n from '../../i18n/index';
let { View, toTry, node } = Magix;
export default View.extend({
    tmpl: '@:confirm.html',
    init(extra) {
        let me = this;
        me['@:{dialog}'] = extra.dialog;
        me['@:{string.body}'] = extra.body;
        me['@:{string.title}'] = extra.title || I18n('@:{lang#dialog.tip}');
        me['@:{fn.enter.callback}'] = extra.enter;
        me['@:{fn.calcel.callback}'] = extra.cancel;
    },
    async render() {
        let me = this;
        await me.digest({
            body: me['@:{string.body}'],
            title: me['@:{string.title}']
        });
        let okBtn = node<HTMLButtonElement>(`_mx_o_${this.id}`);
        if (okBtn) {
            okBtn.focus();
        }
    },
    '@:{enter}<click>'() {
        let me = this;
        me['@:{dialog}'].close();
        if (me['@:{fn.enter.callback}']) {
            toTry(me['@:{fn.enter.callback}']);
        }
    },
    '@:{cancel}<click>'() {
        let me = this;
        me['@:{dialog}'].close();
        if (me['@:{fn.calcel.callback}']) {
            toTry(me['@:{fn.calcel.callback}']);
        }
    }
});