/**
 * 外bu可能直接嵌入某个模块，统一包装入口
 */
import Magix5, { applyStyle } from 'magix5';
import View from 'magix5-gallery/view';
applyStyle('@index.less');

export default View.extend({
    tmpl: '@block.html',
    init(extra) {
        let { block = {}, biz = {} } = extra;

        // 埋点区分
        block.spmIndex = `${biz.bizCode}${block.type}${block.spmIndex || ''}`;

        // 子tab， >1可见tab切换
        (block.tabs || []).forEach((tab, j) => {
            tab.index = j;

            // 子tab埋点区分
            tab.spmIndex = `${block.spmIndex}${j}`;

            // 卡片默认个数
            let defLineNumber = 3;
            switch (block.type) {
                case 'message': // 消息类型
                case 'hover-list': // 图片+标题+说明，hover加背景色，支持tab切换
                case 'img-list': // 图片+标题+说明，支持tab切换
                    defLineNumber = 4;
                    break;
            }
            tab.lineNumber = +tab.lineNumber || defLineNumber;

            // 说明文字行数，默认2行
            tab.tipLineNumber = +tab.tipLineNumber || 2;
        })

        // 当前选中tab
        block.index = 0;

        this.set({
            biz,
            block
        })
    },
    render() {
        this.digest();
    },
    'changeTab<change>'(e) {
        // e.value 当前选中的key值
        // e.text 当前选中的文案
        let { block } = this.get();
        block.index = e.value;
        this.digest({
            block
        })
    }
});



