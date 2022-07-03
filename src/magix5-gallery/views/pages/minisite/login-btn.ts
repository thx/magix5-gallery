import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');
Magix.applyStyle('@login.less');

export default View.extend({
    tmpl: '@login-btn.html',
    assign(extra) {
        this.updater.snapshot();

        // 通过mx-header传入的参数，格式稍有不同
        this.updater.set({
            biz: extra.data
        });

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
});



