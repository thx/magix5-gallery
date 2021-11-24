import Magix5 from 'magix5';

export default Magix5.View.extend({
    tmpl: '@:./index.html',
    assign(data) {
        this.set(data);
    },
    async render() {
        await this.digest();
    }
})