import Magix5 from 'magix5';
import FormSync from '../mx-form/sync';
import Refs from "../mx-form/refs";

export default Magix5.View.extend({
    ctor() {
        let attrs = this.root ? this.root.attributes : {};

        // 埋点
        let spm = attrs['data-spm-click']?.value || null;

        this.set({
            spm
        });
    },
    '@:{mx.style.offset}'(target) {
        let top = 0, left = 0;
        if (target && target.getBoundingClientRect) {
            let infos = target.getBoundingClientRect();
            top += (infos.top + window.pageYOffset);
            left += (infos.left + window.pageXOffset);
        }

        return {
            top,
            left,
        }
    },
    /**
     * 简易 accounting formatNumber
     * 1000 转化成 1,000.00
     */
    '@:{format.number}'(number, precision, thousand, decimal) {
        number = +number || 0;
        precision = +precision || 2;
        thousand = thousand || ',';
        decimal = decimal || '.';

        let negative = number < 0 ? '-' : '';

        let power = Math.pow(10, precision);
        let fixFn = n => {
            return (Math.round(n * power) / power).toFixed(precision);
        }
        let base = Math.abs(parseInt(fixFn(number), 10)) + '';
        let mod = base.length > 3 ? base.length % 3 : 0;

        return negative + (mod ? base.substr(0, mod) + thousand : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (precision ? decimal + fixFn(Math.abs(number)).split('.')[1] : '');
    },
    '@:{stop.propagation}<click,keyup,change,focusout>&{capture:true,passive:false}'(e) {
        e.stopPropagation();
    },
    '@:{prevent.default}<click,keyup,change,focusout>&{capture:true,passive:false}'(e) {
        e.preventDefault();
    },
    /**
     * 获取css变量值
     * 优先级（在线预览配置）：style设置 > root配置
     */
    '@:{get.css.var}'(key, def) {
        let root = window.getComputedStyle(document.documentElement);
        let v = document.body.style.getPropertyValue(key) || root.getPropertyValue(key);
        if (!v) {
            return def || '';
        } else {
            return v.trim();
        }
    },
}).merge(FormSync, Refs);