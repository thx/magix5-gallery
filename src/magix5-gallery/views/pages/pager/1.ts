import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:1.html',
    render() {
        this.digest({
            total: 600,
            sizes: [20, 40, 50],
            page: 1,
            size: 40,
        });
    },
    'change<change>'(e) {
        // e.page 当前第几页
        // e.size 每页多少条
        // e.offset 偏移量
        this.digest({
            page: e.page,
            size: e.size
        })
    }
});