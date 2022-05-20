/*
    author:https://github.com/xinglie
 */
import Magix, { delay } from 'magix5';
let { View, applyStyle, node, dispatch,
    has, guid, mix, attach, detach } = Magix;
applyStyle('@:index.less');
interface DialogOptions {
    view: string
    width: number
    height?: number
    left?: string
    top?: string
    dialog: {
        close: () => void
    }
};
let DialogZIndex = 800;
let CacheList = [];
let RemoveCache = (view) => {
    for (let i = CacheList.length - 1, one; i >= 0; i--) {
        one = CacheList[i];
        if (one.id == view.id) {
            CacheList.splice(i, 1);
            break;
        }
    }
};
export default View.extend({
    tmpl: '@:index.html',
    init(extra) {
        let me = this;
        //let app = node(config('rootId'));
        let root = me.root;
        me.on('destroy', () => {
            RemoveCache(me);
            DialogZIndex -= 2;
            // if (DialogZIndex == 500) {
            //     app.classList.remove('@:index.less:blur');
            // }
            dispatch(root, '@:{dialog.hard.close}');
            root.parentNode.removeChild(root);
        });
        if (!has(extra, 'closable')) {
            extra.closable = true;
        }
        me.set(extra);
        // if (DialogZIndex == 500 &&
        //     !navigator.userAgent.includes('Firefox')) {
        //     app.classList.add('@:index.less:blur');
        // }
        DialogZIndex += 2;
        CacheList.push(me);
    },
    async render() {
        let me = this;
        //this.root.focus();
        await me.digest({
            zIndex: DialogZIndex
        });
        let scrollNode = node<HTMLElement>(`mx5_dialog_scroll_${this.id}`);
        if (scrollNode) {
            scrollNode.focus();
        }
    },
    '@:{close.anim}'() {
        let id = this.id,
            n;
        n = node<HTMLElement>('mx5_dialog_scroll_' + id);
        n.classList.add('@:index.less:anim-body-out');
        n = node<HTMLElement>('mx5_dialog_mask_' + id);
        n.classList.add('@:index.less:anim-mask-out');
    },
    '@:{close}<click>'() {
        dispatch(this.root, '@:{dialog.soft.close}');
    },
    '@:{close.by.outside}<click>'(e) {
        if (e.eventTarget == e.target) {
            dispatch(this.root, '@:{dialog.soft.close}');
        }
    },
    '$doc<keyup>'(e) {
        if (e.code == 'Escape') { //esc
            let dlg = CacheList[CacheList.length - 1];
            if (dlg == this && dlg.get('closable')) {
                dispatch(this.root, '@:{dialog.soft.close}');
            }
        }
    }
}).static({
    '@:{dialog.show}'(view, options) {
        let id = guid('mx5_dlg_');
        document.body.insertAdjacentHTML('beforeend', '<div id="' + id + '"/>');
        let n = node<HTMLElement>(id);
        let vf = view.owner.mount(n, '@:moduleId', options);
        let whenClose = async () => {
            dispatch(n, '@:{dialog.soft.start.close}', {
                async close() {
                    if (!n['@:{is.closing}']) {
                        n['@:{is.closing}'] = 1;
                        vf.invoke('@:{close.anim}');
                        detach(n, '@:{dialog.soft.close}', whenClose);
                        await delay(200);
                        vf.unmount();
                    }
                }
            });
        };
        attach(n, '@:{dialog.soft.close}', whenClose);
        return n;
    },
    alert(content, enterCallback, title) {
        this.confirm(content, enterCallback, null, title, 'alert');
    },
    confirm(content, enterCallback, cancelCallback, title, view = 'confirm') {
        this.mxDialog('@:./' + view, {
            body: content,
            cancel: cancelCallback,
            enter: enterCallback,
            title: title,
            modal: true,
            width: 350
        });
    },
    mxDialog(view, options) {
        let me = this;
        // let key = '$dlg_' + view;
        // if (me[key]) return;
        // me[key] = 1;

        let dlg;
        let dOptions = mix({
            view
        }, options) as DialogOptions;
        if (!dOptions.width) dOptions.width = 550;
        dOptions.dialog = {
            close() {
                if (dlg) {
                    dispatch(dlg, '@:{dialog.soft.close}');
                }
            }
        };
        dlg = me['@:{dialog.show}'](me, dOptions);
        let beforeCloseCallback,
            afterCloseCallback;
        let closeWatcher = () => {
            //delete me[key];
            detach(dlg, '@:{dialog.hard.close}', closeWatcher);
            if (afterCloseCallback) {
                afterCloseCallback();
            }
        };
        let beforeCloseWatcher = async e => {
            try {
                if (!beforeCloseCallback) {
                    e.close();
                } else {
                    await beforeCloseCallback();
                    e.close();
                }
            } catch {

            }
        };
        attach(dlg, '@:{dialog.soft.start.close}', beforeCloseWatcher);
        attach(dlg, '@:{dialog.hard.close}', closeWatcher);
        return {
            beforeClose(fn) {
                // 关闭浮层前调用
                // return true 关闭
                // return false 不关闭浮层
                beforeCloseCallback = fn;
            },
            afterClose(fn) {
                // 关闭浮层后调用
                afterCloseCallback = fn;
            },
            close() {
                if (dlg) {
                    dispatch(dlg, '@:{dialog.soft.close}');
                }
            },
        };
    },
    mxCloseAllDialogs() {
        for (let c of CacheList) {
            dispatch(c.root, '@:{dialog.soft.close}');
        }
    }
});