import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';
import Copy from 'magix5-gallery/gallery/mx-copy/fn';

export default View.extend({
    tmpl: '@:4.html',
    'copy<click>'(e) {
        this.mxCopy('测试复制').then(() => {
            this.digest({
                success: true,
                error: false,
            })
        }, () => {
            this.digest({
                success: false,
                error: true,
            })
        })
    },
}).merge(Copy);