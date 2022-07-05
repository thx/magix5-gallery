import Magix5, { Router, config } from 'magix5';
import View from 'magix5-gallery/view';

export default View.extend({
    tmpl: '@:empty.html',
    init() {
        this.observeLocation({
            path: true
        });
    },
    async render() {
        let { path } = Router.parse();
        let routes = config('routes') || {};
        let viewData = routes[path]?.viewData || {};
        await this.digest({
            view: `magix5-gallery/views/pages${path}`,
            viewData,
        });
    }
})