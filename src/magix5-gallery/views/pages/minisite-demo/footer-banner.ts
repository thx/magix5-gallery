import Magix5, { applyStyle, Router, parseUrl } from 'magix5';
import View from './base';
applyStyle('@index.less');
applyStyle('@footer-banner.less');

export default View.extend({
    tmpl: '@footer-banner.html',
    render() {
        let { data } = this.get();
        let alimeFrom = this.getAlime(data.alime);
        this.digest({
            alimeFrom
        });
    },
    'showAlime<click>'(e) {
        let { alimeFrom } = this.get();
        this.mxDialog('@:./alime', {
            from: alimeFrom,
        }, {
            width: 960,
            height: 700
        });
    },
    'enter<click>'(e) {
        $('#' + this.id).trigger('enter');
    },
    getAlime(data) {
        if ($.isEmptyObject(data)) {
            return;
        }
        let { def, links = [] } = data;
        if (!def) {
            return;
        }

        let { path, params } = Router.parse();
        let cur = def;
        for (let i = 0; i < links.length; i++) {
            let hash = parseUrl(links[i].path);

            // 比较路径
            let equal = (hash.path == path);

            // 比较参数：当前参数包含配置参数即匹配中
            for (let key in hash.params) {
                equal = equal && (hash.params[key] == params[key]);
            }

            if (equal) {
                cur = links[i].id;
                break;
            }
        }

        return cur;
    }
});


