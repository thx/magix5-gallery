import Magix5, { mix } from 'magix5';
import View from 'magix5-gallery/view';

export default View.extend({
    assign(extra) {
        // 分组处理，支持轮播
        let { data, biz } = extra;
        let cardList = (data.list || []).map(item => {
            return this['@:{to.card.item}'](item, biz);
        })
        this.set({
            ...extra,
            cardList,
        });

    },

    /**
     * minisite实体转成卡片实体定义
     */
    '@:{to.card.item}'(item, { user }) {
        // link定义
        // 1. link: {
        //     text  按钮文案
        //     checkLogin 是否需要登录校验
        //     url 跳转地址
        //     outer 是否外链打开
        // }
        // 2. link 跳转地址（不校验登录的外链打开）

        // 需要校验登录的情况，都为本页面跳转，无需配置跳转练级
        let link = (Object.prototype.toString.apply(item.link) === '[object Object]') ? item.link : {
            text: '',
            checkLogin: false,
            url: item.link,
            outer: true
        };

        return {
            img: item.img,
            leftTag: item.imgTag ? `<img style="height: 20px; margin-top: var(--mx5-card-gap-ver); margin-left: var(--mx5-card-gap-hor);" src="${item.imgTag}" />` : '', // 图片上打标图片地址
            leftTagText: item.imgTagText, // 图片上打标图片文案
            icon: item.icon ? `<img src="${item.icon}"/>` : '',
            title: item.title,
            titleTag: item.tag ? `<img style="height: 20px;" src="${item.tag}" />` : '',  // 标题旁打标图片地址
            titleTagText: item.tagText, // 标题旁打标文案
            subTitle: item.subTitle,
            tip: item.info,
            btn: link.text,
            link: (link.checkLogin && (!user || !user.nickName)) ? '' : link.url, // 需要登录且未登录的情况下，不配链接
            outer: link.outer,
            quotaes: item.quotaes,  // 指标
            quotaeTip: item.quotaeTip, // 多指标，无指标的打底说明
            links: (item.links || []).map(l => { // 多外链场景
                return {
                    title: l.text,
                    link: l.url,
                    outer: true
                }
            }),
            originItem: item,
        };
    },

    render() {
        this.digest();
    },

    '@:{select.card}<select>'(e) {
        let { user } = this.get('biz') || {};
        let originItem = e.item.originItem;
        let link = originItem.link || {};
        if (link.checkLogin && (!user || !user.nickName)) {
            // 未登录且需要校验登录
            this['@:{show.login}<click>']();
        }
    },

    '@:{show.login}<click>'(e) {
        let { biz } = this.get();
        let { mainBizCode, bizCode, loginView } = biz;

        // mxLoginView
        //      历史配置：mxLoginView(viewPath, viewOptions)
        //          viewPath：自定义弹出框view
        //          viewOptions：传入参数
        //      当前配置：mxLoginView(viewOptions)
        //          viewOptions.bizCode：产品线定义，bizCode包装登陆框逻辑
        //          viewOptions：其他参数
        // if (biz.userLogged) {
        //     this.mxLoginView(loginView, {
        //         biz
        //     });
        // } else {
        //     // 兼容直接mount该view时只有bizCode的场景
        //     this.mxLoginView({
        //         bizCode: mainBizCode || bizCode
        //     })
        // }
    }
});



