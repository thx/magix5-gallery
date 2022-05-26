import View from 'magix5-gallery/views/pages/base/demo';
export default View.extend({
    tmpl: '@:./3.html',
    render() {
        this.digest();
    },
});