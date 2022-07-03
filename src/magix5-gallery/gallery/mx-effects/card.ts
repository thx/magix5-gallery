/**
 * hover上移卡片
 * 1. 支持大小尺寸
 * 2. 支持配置图片、说明、链接、指标等等
 * 3. 支持配置每行展现次数，支持轮播 or 平铺
 */
import Magix5, { applyStyle, mix, dispatch } from 'magix5';
import View from '../mx-base/view';
applyStyle('@:card.less');

const supportModes = [
    'carousel-common-list', // 大卡片图文链接轮播
    'flat-common-list', // 大卡片图文链接平铺
    'carousel-small-list', // 小卡片图文链接轮播
    'flat-small-list', // 小卡片图文链接平铺
    'carousel-common-quota', // 大卡片图文指标轮播
    'flat-common-quota', // 大卡片图文指标平铺
    'carousel-icon-list', // icon图文卡片轮播
    'flat-icon-list', // icon图文卡片平铺
    'carousel-logo-list', // logo图文卡片轮播
    'flat-logo-list', // logo图文卡片平铺
    'carousel-btns-list', // 多按钮图文卡片轮播
    'flat-btns-list', // 多按钮图文卡片平铺
    'carousel-links-list', // 多外链图文卡片轮播
    'flat-links-list', // 多外链图文卡片平铺
    'carousel-hover-list', // hover背景色图文卡片轮播
    'flat-hover-list' // hover背景色图文卡片平铺
];

export default View.extend({
    tmpl: '@:card.html',
    assign(options, context) {
        let mode = (supportModes.indexOf(options.mode) < 0) ? supportModes[0] : options.mode;

        // 是否轮播
        let carousel = (mode.indexOf('carousel') > -1);
        //轮播情况下是否自动轮播，默认自动轮播
        let autoplay = (options.autoplay + '' !== 'false');
        // 轮播情况下，播放间隔，单位毫秒
        let interval = options.interval || 5000;
        // 轮播点样式
        let dotVars = mix({
            '--mx5-carousel-trigger-gap': '0px'
        }, options.dotVars || {});

        // 样式class
        let wrapperClass = `@:./card.less:card-wrapper`.replace('-card-wrapper', `-${mode}`);

        //每行卡片个数
        let lineNumber = +options.lineNumber || 3;
        let devInfo = this['@:{get.dev.info}']();
        if (devInfo && !devInfo.pc) {
            // 移动兼容处理：移动端每行只显示一个
            lineNumber = 1;
        }

        // 处理卡片分组信息
        let groups = [], list = options.list || [];
        let hasBtn = true,  // 是否有按钮
            hasIcon = true; // 是否有icon
        for (var i = 0, len = list.length; i < len; i += lineNumber) {
            groups.push({
                list: list.slice(i, i + lineNumber).map(item => {
                    hasBtn = hasBtn && !!item.btn;
                    hasIcon = hasIcon && !!item.icon;
                    return item;
                })
            });
        }

        // 对齐方式
        let textAlign = options.textAlign || 'left'

        // 标题行数，非默认不补充，走样式的默认值
        let titleLineNumber = options.titleLineNumber;

        // 说明行数，非默认不补充，走样式的默认值
        let tipLineNumber = options.tipLineNumber;

        this.set({
            mode,
            hasBtn,
            hasIcon,
            wrapperClass,
            groups,
            dotVars,
            lineNumber,
            titleLineNumber,
            tipLineNumber,
            textAlign,
            autoplay,
            interval,
            carousel,
        });
    },

    render() {
        this.digest();
    },

    '@:{select}<click>'(e) {
        let { mode } = this.get();
        if (mode.indexOf('-btns-list') > -1 || mode.indexOf('-links-list') > -1) {
            // 多按钮 & 多链接除外
            return;
        };

        let { item } = e.params;
        if (item.link) {
            let a = document.createElement('a');
            a.style.position = 'absolute';
            a.style.opacity = '0';
            a.href = item.link;
            if (item.outer + '' !== 'false') {
                a.target = '_blank';
            }
            a.click();
        }
        dispatch(this.root, 'select', {
            item,
        });
    },

    /**
     * carousel-btns-list,flat-btns-list
     * 多按钮类型，点击按钮选中
     */
    '@:{btn.select}<click>'(e) {
        let { item, btn } = e.params;
        dispatch(this.root, 'select', {
            item,
            btn,
        });
    }
});