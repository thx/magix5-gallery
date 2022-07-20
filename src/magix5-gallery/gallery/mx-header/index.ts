/**
 * 一级导航
 */
import Magix5, { applyStyle, mix, Vframe, node, Router, parseUrl, mark } from 'magix5';
import View from '../mx-base/view';
applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    init() {
        this.observeLocation({
            path: true,
        });
    },
    assign(options) {
        // 导航样式mode
        // common：白底色版本
        // dark：深底色版本
        let mode = options.mode;
        if (['common', 'dark'].indexOf(mode) < 0) {
            mode = 'common';
        }

        // 设备信息：无线pc兼容
        let devInfo = this['@:{get.dev.info}']();

        //是否需要顶部外链信息，pc默认是true，无线端不显示
        let originLinks = options.links + '' !== 'false';
        let links = devInfo.pc ? originLinks : false;

        // 根据现实模式进行参数修正
        let login = (options.login + '' !== 'false'); //是否需要显示登录信息，默认是true

        // 无线端隐藏顶部产品线信息，收起到右侧抽屉
        let width = +options.width;
        let height = 100;
        if (!links) { height -= 50; }

        let colorBg = options.colorBg;
        let colorText = options.colorText;

        // 色值计算
        let color = options.color || this['@:{get.css.var}']('--color-brand');
        let result = this['@:{color.to.rgb}'](color);
        let colorOpacity = `rgba(${result.r}, ${result.g}, ${result.b}, 0.1)`;

        // 默认不选中任何一个导航，表示选中的一级导航
        // 如果默认为某个二级导航，订正选中态为一级的
        let textKey = options.textKey || 'text',
            linkKey = options.linkKey || 'link',
            outerKey = options.outerKey || 'outer'; // 默认false，本页跳转

        let parentIndex = -1, childIndex = -1;
        let navs = options.navs || [];
        navs.forEach((nav, navIndex) => {
            if (this['@:{equal}'](nav[linkKey])) {
                // 选中的是一级菜单
                parentIndex = navIndex;
                childIndex = -1;
            }

            if (nav.subs && nav.subs.length > 0) {
                // first 点击一级导航，默认第一个非外链，若均为外链，则第一个
                let first;
                nav.subs.forEach((sub, subIndex) => {
                    // 选中的是二级菜单
                    if (this['@:{equal}'](sub[linkKey])) {
                        parentIndex = navIndex;
                        childIndex = subIndex;
                    }
                    if (sub[outerKey] + '' !== 'true') {
                        first = sub;
                    }
                });
                if (!first) {
                    first = nav.subs[0];
                }

                // 未指定一级跳转
                if (!nav[linkKey]) {
                    mix(nav, {
                        [linkKey]: first[linkKey],
                        [outerKey]: first[outerKey],
                    })
                }
            }
        })

        this.set({
            width,
            height,
            logoNav: options.logoNav || navs[0] || {},
            navs,
            textKey,
            linkKey,
            outerKey,
            parentIndex,
            childIndex,
            mode,
            color,
            colorOpacity,
            colorBg,
            colorText,
            login,
            bizCode: options.bizCode || '',  //项目bizCode
            loginView: options.loginView || '',  //登录页面
            user: options.user || '',
            logoutUrl: options.logoutUrl || '',  //退出接口
            links,
            originLinks,
            styles: `top: ${(links ? 50 : 0)}px;`,
            logo: options.logo,
            ceiling: (options.ceiling + '' !== 'false'), //是否需要吸顶功能，默认是true,
            rightCeilingShow: (options.rightCeilingShow + '' === 'true'), // 右侧view是否默认不显示，吸顶时显示
            rightView: options.rightView || '',  //右侧自定义view
            rightViewData: options.rightViewData || {},
            devInfo,
        });

        // 关闭popover
        this['@:{hide.pop}']();
    },

    async render() {
        let renderMark = mark(this, '@:{render.mark}');
        let data = {};
        try {
            let response = await fetch('//g.alicdn.com/mm/bp-source/lib/products.json');
            data = await response.json();
        } catch {

        }

        if (renderMark()) {
            this['@:{render.by.data}'](data);
        }
    },

    '@:{render.by.data}'(data = {}) {
        let d = {
            list: (data.products || []).map(item => {
                // popover的提示内容
                item.tip = `<div class="mx5-output-list">
                    ${item.seconds.map(second => `
                        ${second.thirds.map(third => `
                            <div class="mx5-output-item">
                                <a class="mx5-output-link mx5-text-center" href="${third.link}" target="_blank" rel="noopener noreferrer">${third.text}</a>
                            </div>
                        `).join('')}
                  `).join('')}
                </div>`;

                return item;
            }),
        }

        // 内置logo
        let { bizCode, mode } = this.get();
        let logos = data.logos || {};
        if (bizCode && (logos[`${bizCode}_${mode}`] || logos[bizCode])) {
            mix(d, {
                logo: logos[`${bizCode}_${mode}`] || logos[bizCode]
            })
        }

        this.digest({
            fixed: false,
            ...d,
        });

        // let { links, ceiling } = that.get();
        // if (ceiling) {
        //     let wrapper = that['@{wrapper}'];
        //     let scrollFn = () => {
        //         let others = $(`#${that.id} .@index.less:others`);
        //         let otherHeight = 0;
        //         if (others.length > 0) {
        //             otherHeight = others.outerHeight()
        //         }
        //         let scrollTop = wrapper.scrollTop();

        //         // 相对window定位
        //         let styles = [
        //             'position: fixed',
        //             'top: 0',
        //             'left: 0',
        //             'width: 100%'
        //         ];

        //         if (scrollTop > otherHeight) {
        //             that.digest({
        //                 fixed: true,
        //                 styles: styles.join(';')
        //             })
        //         } else {
        //             that.digest({
        //                 fixed: false,
        //                 styles: `top: ${(links ? 50 : 0)}px;`
        //             })
        //         }
        //     }
        //     if (!that['@{init.header.scroll}']) {
        //         that['@{init.header.scroll}'] = true;
        //         wrapper.on('scroll.header', scrollFn);
        //         that.on('destroy', () => {
        //             wrapper.off('scroll.header', scrollFn);
        //         });
        //     }
        //     scrollFn();
        // }
    },

    '@:{equal}'(link) {
        if (!link) {
            return false;
        }

        let { path, params } = Router.parse();
        let { path: tPath, params: tParams } = Router.parse(link);
        let equal = (tPath == path);
        for (let k in tParams) {
            equal = tParams[k] == params[k];
        }
        return equal;
    },

    /**
     * 关闭popover
     */
    '@:{hide.pop}'(value) {
        // let that = this;
        // let { navs, valueKey } = that.get();

        // navs.forEach((nav, navIndex) => {
        //     if (!value || (nav[valueKey] == value)) {
        //         let popNode = document.querySelector(`[data-pop="${that.id}_${nav[valueKey]}"]`);
        //         if (popNode && popNode.id) {
        //             let popVf = Vframe.byNode(node(popNode.id));
        //             if (popVf) { popVf.invoke('hide'); };
        //         }
        //     }
        // })
    },

    '@:{toggle.hover}<focusin,focusout>'(e) {
        e.eventTarget.setAttribute('data-hover', e.type == 'focusin');
    },

    /**
     * bizCode：各产品bizCode，用于包装登陆框逻辑
     */
    '@:{show.login}<click>'(e) {
        // let { bizCode } = this.get();
        // this.mxLoginView({
        //     bizCode
        // });
    },
});
