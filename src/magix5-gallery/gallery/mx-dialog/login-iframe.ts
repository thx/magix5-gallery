import Magix5, { applyStyle, View, Router, toUrl } from 'magix5';
applyStyle('@:login.less');

export default View.extend({
    tmpl: '@:login-iframe.html',
    assign(extra) {
        let data = extra.data || extra || {};
        this.set({
            bizCode: data.bizCode || ''
        });
    },
    async render() {
        let that = this;
        let renderFn = (loginBizMap) => {
            let { bizCode } = that.get();
            let info = loginBizMap[bizCode] || loginBizMap.def;
            let tabs = [], showTitle = false;

            if (info.login + '' !== 'false') {
                // 淘宝登陆url，默认有
                //    css_style：为主站那边给定的样式约定值
                //    from 平台来源 tb / alimama
                let redirectURL = '';
                if (info.fullRedirectURL) {
                    // 全路径直接跳转
                    redirectURL = encodeURIComponent(info.fullRedirectURL);
                } else if (!info.redirectURL) {
                    // 未配置重定向地址，跳转回当前页面
                    redirectURL = encodeURIComponent(window.location.href);
                } else {
                    // example redirectURL = '/indexbp.html'
                    let routeParams = {
                        ...Router.parse().params
                    }

                    // mxredirectUrl 上次访问的地址
                    let forward = routeParams.mxredirectUrl;
                    if (!forward || forward.indexOf(window.location.origin) != 0) {
                        delete routeParams['mxredirectUrl'];
                        redirectURL = encodeURIComponent(toUrl(window.location.origin + info.redirectURL, routeParams));
                    } else {
                        redirectURL = encodeURIComponent(forward);
                    }
                };
                let params = [
                    `redirectURL=${redirectURL}`, // 登录成功回跳页面
                    'style=mini',
                    'full_redirect=true',
                    'newMini2=true',
                    'enup=0',
                    'qrlogin=1',
                    'keyLogin=true',
                    'sub=true'
                ].concat(info.params || []);
                let taobaoHost = !!~window.location.host.indexOf('daily') ? 'login.daily.taobao.net' : 'login.taobao.com';

                tabs.push({
                    value: 'taobao',
                    text: '淘宝会员',
                    src: 'https://' + taobaoHost + '/member/login.jhtml?' + params.join('&')
                });
            }

            if (info.alimamaLogin + '' === 'true') {
                // 只有妈妈登陆时需要显示title
                showTitle = true;

                // 是否支持妈妈会员登陆，默认不支持
                let alimamaRedirectURL = '';
                if (info.alimamaFullRedirectURL) {
                    // 全路径直接跳转
                    alimamaRedirectURL = encodeURIComponent(info.alimamaFullRedirectURL);
                } else if (!info.alimamaRedirectURL) {
                    // 未配置重定向地址，跳转回当前页面
                    alimamaRedirectURL = encodeURIComponent(window.location.href);
                } else {
                    // example alimamaRedirectURL = '/indexbp.html'
                    let { params: routeParams } = Magix.Router.parse();
                    alimamaRedirectURL = encodeURIComponent(Magix.toUrl(window.location.origin + info.alimamaRedirectURL, routeParams));
                };
                let alimamaParmas = [
                    `redirect=${alimamaRedirectURL}`
                ].concat(info.alimamaParams || []);

                tabs.push({
                    value: 'alimama',
                    text: '阿里妈妈会员',
                    src: '//www.alimama.com/member/minilogin.htm?' + alimamaParmas.join('&')
                })
            };
            that.digest({
                info,
                showTitle: showTitle || (tabs.length > 1),
                tabs,
                curTab: tabs[0]
            });
        }

        try {
            let response = await fetch('//g.alicdn.com/mm/bp-source/lib/login.json');
            let data = await response.json();
            renderFn(data);
        } catch {
            // 异常情况下重定向回当前页面
            renderFn({
                def: {
                    params: [
                        'css_style=dingxiang'
                    ],
                    fullRedirectURL: '',
                    redirectURL: ''
                }
            })
        }
    },
    '@:{change.tab}<change>'(e) {
        let { tabs } = this.get();
        let curTab = {};
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].value == e.value) {
                curTab = tabs[i];
                break;
            }
        }
        this.digest({
            curTab
        })
    }
});

