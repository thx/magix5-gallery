import Magix5 from 'magix5';
import View from '../mx-base/view';
import * as Clipboard from './clipboard';
let { applyStyle, node, dispatch } = Magix5;
applyStyle('@:index.less');

export default View.extend({
    init(options) {
        let configs = {};
        if (options.copyNode) {
            // 复制另外一个节点
            configs = {
                target() {
                    return node(options.copyNode);
                }
            };

        } else {
            // 复制本节点信息
            configs = {
                text() {
                    return options.copyText;
                }
            };
        }
        let { root } = this;
        this['@:{clipboard}'] = new Clipboard(root, configs);
        this['@:{clipboard}'].on('success', (e) => {
            e.clearSelection();
            dispatch(root, 'success');
        });
        this['@:{clipboard}'].on('error', () => {
            dispatch(root, 'error');
        });

        this.on('destroy', () => {
            if (this['@:{clipboard}']) {
                this['@:{clipboard}'].destroy();
            }
        });
    },
});