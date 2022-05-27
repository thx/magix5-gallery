import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:10.html',
    render() {
        this.digest({
            selected1: 1,
            selected2: 1,
            selected3: 1,
        })
    },
    'change<change>'(e) {
        let index = e.params.index;
        this.digest({
            [`selected${index}`]: e.selected
        })
    }
})