import Magix5, { Router, applyStyle, toMap } from 'magix5';
import View from 'magix5-gallery/view';
applyStyle('@:login-already.less');

export default View.extend({
    tmpl: '@:login-already.html',
    assign(extra) {
        let biz = extra.biz || extra.data?.biz || {};
        let user = biz.user || {}, // 登录的用户信息
            apiInfo = biz.apiInfo || {}; // 登陆准入校验

        let unauthorizedMap = toMap(biz.unauthorizedList || [], 'errorCode') || {};
        let unauthorizedInfo = unauthorizedMap[apiInfo.errorCode] || {};
        let nickName = user.nickName ? `Hi，${user.nickName}` : '',
            message = (biz.unauthorized ? (apiInfo.msg || apiInfo.message || '对不起，您目前还没有权限') : '');

        // 如果没有跳转地址，或者不是本域名的跳转，直接跳到配置的后天页
        let forward = Router.parse().params.mxredirectUrl;
        if (!forward || forward.indexOf(location.protocol + '//' + location.host) != 0) {
            forward = biz.domain;
        }

        this.set({
            biz,
            unauthorizedInfo,
            nickName,
            message,
            forward,
        });
    },
    render() {
        this.digest();
    },

});


