/**
 * hover上移卡片
 * 1. 支持大小尺寸
 * 2. 支持配置图片、说明、链接、指标等等
 * 3. 支持配置每行展现次数，支持轮播 or 平铺
 */
import Magix5, { applyStyle, mix } from 'magix5';
import View from '../mx-base/view';
applyStyle('@card.less');

export default View.extend({
    tmpl: '@:card.html',
    assign(options, context) {
        // mode定义
        // 1. carousel-common-list：大卡片图文链接轮播
        // 2. flat-common-list：大卡片图文链接平铺
        // 3. carousel-small-list：小卡片图文链接轮播
        // 4. flat-small-list：小卡片图文链接平铺
        // 5. carousel-common-quota：大卡片图文指标轮播
        // 6. flat-common-quota：大卡片图文指标平铺
        // 7. carousel-icon-list：icon图文卡片轮播
        // 8. flat-icon-list：icon图文卡片平铺
        // 9. carousel-logo-list：logo图文卡片轮播
        // 10. flat-logo-list：logo图文卡片平铺
        // 11. carousel-btns-list：多按钮图文卡片轮播
        // 12. flat-btns-list：多按钮图文卡片平铺
        // 13. carousel-links-list：多外链图文卡片轮播
        // 14. flat-links-list：多外链图文卡片平铺
        // 15. carousel-hover-list：hover背景色图文卡片轮播
        // 16. flat-hover-list：hover背景色图文卡片平铺
        let mode = options.mode || 'carousel-common-list';

        // 是否轮播
        let carousel = (mode.indexOf('carousel') > -1);
        //轮播情况下是否自动轮播，默认自动轮播
        let autoplay = (options.autoplay + '' !== 'false');
        // 轮播情况下，播放间隔，单位毫秒
        let interval = options.interval || 5000;
        // 轮播点样式
        let dotVars = mix({
            '--mx-carousel-trigger-gap': '0px'
        }, options.dotVars || {});

        let wrapperClasses = 'names@:card.less';
        let wrapperClass = wrapperClasses[mode];

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
                    hasBtn = hasBtn && item.btn;
                    hasIcon = hasIcon && item.icon;
                    return item;
                })
            });
        }

        // 标题行数，非默认不补充，走样式的默认值
        let titleLineNumber = options.titleLineNumber;
        // 说明行数，非默认不补充，走样式的默认值
        let tipLineNumber = options.tipLineNumber;

        // 是否为指标显示
        let quota = (mode.indexOf('quota') > -1);

        // 是否整个卡片可点
        // 多按钮，多链接类型，整个卡片不响应点击
        let cardClick = !(
            mode == 'carousel-btns-list' ||
            mode == 'flat-btns-list' ||
            mode == 'carousel-links-list' ||
            mode == 'flat-links-list'
        );

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
            autoplay,
            interval,
            carousel,
            cardClick,
            quota,
        });
    },

    render() {
        this.digest();
    },

    // '@:{select}<click>'(e) {
    //     this['@{owner.node}'].trigger({
    //         type: 'select',
    //         item: e.params.item
    //     });
    // },

    /**
     * carousel-btns-list,flat-btns-list
     * 多按钮类型，点击按钮选中
     */
    // '@{btn.select}<select>'(e) {
    //     this['@{owner.node}'].trigger({
    //         type: 'select',
    //         item: e.item,
    //         btn: e.btn
    //     });
    // }
});