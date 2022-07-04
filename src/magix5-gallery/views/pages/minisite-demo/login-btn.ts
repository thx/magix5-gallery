import Magix5, {applyStyle} from 'magix5';
import View from './base';
applyStyle('@index.less');
applyStyle('@login.less');

export default View.extend({
    tmpl: '@login-btn.html',
    assign(extra) {
        // 通过mx-header传入的参数，格式稍有不同
        this.set({
            biz: extra.data
        });
    },
});



