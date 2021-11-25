'top@:./_clipboard.js';
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    init(options) {
        let configs = {};
        if (options.copyNode) {
            // 复制另外一个节点
            configs = {
                target() {
                    return Magix5.node(options.copyNode);
                }
            };

        } else {
            // 复制本节点信息
            configs = {
                text(trigger) {
                    return options.copyText;
                }
            };
        }
        let owner = this.root;
        this['@:{clipboard}'] = new window.Clipboard(owner, configs);
        this['@:{clipboard}'].on('success', (e) => {
            e.clearSelection();
            owner.trigger('success');
        });
        this['@:{clipboard}'].on('error', () => {
            owner.trigger('error');
        });

        this.on('destroy', () => {
            if (this['@:{clipboard}']) {
                this['@:{clipboard}'].destroy();
            }
        });
    },
});