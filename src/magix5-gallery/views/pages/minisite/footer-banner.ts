import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');
Magix.applyStyle('@footer-banner.less');

export default View.extend({
    tmpl: '@footer-banner.html',
    render() {
        let { data } = this.updater.get();
        let alimeFrom = this.getAlime(data.alime);
        this.updater.digest({
            alimeFrom
        });
    },
    'showAlime<click>'(e) {
        let { alimeFrom } = this.updater.get();
        this.mxDialog('@./alime', {
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

        let { path, params } = Magix.Router.parse();
        let cur = def;
        for (let i = 0; i < links.length; i++) {
            let hash = Magix.parseUrl(links[i].path);

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


