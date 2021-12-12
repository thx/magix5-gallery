/**
 * 卡片吸顶处理
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';

export default View.extend({
    assign(options) {
        // 是否需要吸顶，默认false
        let sticky = (options.sticky + '' === 'true');
        this.set({
            sticky,
        })
    }
});