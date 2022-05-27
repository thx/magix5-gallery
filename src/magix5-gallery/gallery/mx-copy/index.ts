import Magix5 from 'magix5';
import View from '../mx-base/view';
import * as Clipboard from './clipboard';
Magix5.applyStyle('@:index.less');

export default View.extend({
    init(options) {
        let configs = {};
        if (options.copyNode) {
            // 复制另外一个节点
            configs = {
                text(trigger) {
                    let node = document.getElementById(options.copyNode);
                    return (node ? (node.value || node.innerText || node.innerHTML) : '');
                }
            };
        } else {
            if (options.textFn) {
                // 复制动态文案
                configs = {
                    text: options.textFn
                };
            } else {
                // 直接复制静态文案
                configs = {
                    text(trigger) {
                        return options.text;
                    }
                };
            }
        }
        let { root } = this;
        this['@:{clipboard}'] = new Clipboard(root, configs);
        this['@:{clipboard}'].on('success', (e) => {
            e.clearSelection();
            Magix5.dispatch(root, 'success', {
                text: e.text, // 复制的内容
            });
        });
        this['@:{clipboard}'].on('error', () => {
            Magix5.dispatch(root, 'error');
        });

        this.on('destroy', () => {
            if (this['@:{clipboard}']) {
                this['@:{clipboard}'].destroy();
            }
        });
    }
});