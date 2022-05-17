import View from './demo';

export default View.extend({
    tmpl: '@:./magix3-2.html',
    render() {
        this.digest()
    },
})