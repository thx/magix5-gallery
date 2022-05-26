/*
    author:https://github.com/xinglie
 */
import Magix from 'magix5';
let { View, toTry, node } = Magix;
export default View.extend({
    tmpl: '@:alert.html',
    init(extra) {
        let me = this;
        me['@:{dialog}'] = extra.dialog;
        me['@:{string.body}'] = extra.body;
        me['@:{string.title}'] = extra.title || '提示';
        me['@:{fn.enter.callback}'] = extra.enter;
    },
    async render() {
        let me = this;
        await me.digest({
            body: me['@:{string.body}'],
            title: me['@:{string.title}']
        });

        let okBtn = node<HTMLButtonElement>(`mx5_o_${this.id}`);
        if (okBtn) {
            okBtn.focus();
        }
    },
    '@:{enter}<click>'() {
        let me = this;
        me['@:{dialog}'].close(true);
        if (me['@:{fn.enter.callback}']) {
            toTry(me['@:{fn.enter.callback}']);
        }
    }
});