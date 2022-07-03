import Magix, { Router } from 'magix';
import View from 'common-minisite/view';
Magix.applyStyle('@index.less');
Magix.applyStyle('@login-already.less');

export default View.extend({
    tmpl: '@login-already.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra) {
        this.updater.snapshot();

        let biz = $.extend(true, {}, extra.biz || extra.data?.biz);
        let userObj = biz.userObj || {};
        let meta = userObj.meta || {}, // 登录的用户信息
            apiInfo = userObj.apiInfo || {}; // 登陆准入校验

        let unauthorizedMap = Magix.toMap(biz.unauthorizedList || [], 'errorCode') || {};
        let unauthorizedInfo = unauthorizedMap[apiInfo.errorCode] || {};
        let nickName = meta.nickName ? `Hi，${meta.nickName}` : '',
            message = (biz.unauthorized ? (apiInfo.msg || apiInfo.message || '对不起，您目前还没有权限') : '');

        // 如果没有跳转地址，或者不是本域名的跳转，直接跳到配置的后天页
        let forward = Router.parse().params.mxredirectUrl;
        if (!forward || forward.indexOf(location.protocol + '//' + location.host) != 0) {
            forward = biz.domain;
        }

        this.updater.set({
            biz,
            unauthorizedInfo,
            nickName,
            message,
            forward,
        });

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },

});


