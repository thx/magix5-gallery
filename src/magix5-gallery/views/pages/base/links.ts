import Magix5 from 'magix5';
import View from 'magix5-gallery/view';

export default View.extend({
    tmpl: '@:links.html',
    init(options) {
        this.set({
            list: [{
                text: 'Magix',
                value: 'https://thx.github.io/magix/',
            }, {
                text: 'Magix Composer',
                value: 'https://github.com/thx/magix-composer/issues'
            }]
        })
    },
    render() {
        this.digest();
    }
})