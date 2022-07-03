/**
 * 通用官网，支持两种接入方式
 * 1. 纯alp接入
 *      开发说明：https://yuque.antfin-inc.com/yujia.yjq/yxrf9b/hwo1c7
 *      已接入内容汇总：https://yuque.antfin-inc.com/yujia.yjq/yxrf9b/hwo1c7
 *
 * 2. adc版本：https://yuque.antfin-inc.com/yujia.yjq/yxrf9b/bcbxty
 */
import Magix, { Router } from 'magix';
import * as $ from '$';
import View from 'common-minisite/view';
const DefBizCode = 'feedFlow_demo';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(options) {
        let viewData = options.viewData || {};

        // 测试用
        if ($.isEmptyObject(viewData)) {
            // 可配置定义：https://yuque.antfin-inc.com/yujia.yjq/yxrf9b/zvevxk#f2YaN
            viewData = {
                bizCode: DefBizCode, // 产品线唯一标识，必填
                // portrait: 'https://img.alicdn.com/tfs/TB1bokxHQL0gK0jSZFxXXXWHVXa-160-160.png', // 头像
                logoutUrl: '/api/member/logout.action',  // 由于各bp逻辑不一致，登出接口各自配置
                // user: '', // 登陆的用户信息，根据此字段有无判断是否已登陆显示相应状态
                user: '商家测试帐号95',
                // userObj: {
                //     meta: {
                //         nickName: '用户名',
                //     },
                //     apiInfo: {
                //         errorCode: 'CUSTOMER_JOIN_ERROR', // USER_UNAUTHORIZED准入，CUSTOMER_JOIN_ERROR资质异常
                //         msg: '123123123<span class="color-brand">123</span>',
                //         message: '',
                //     }
                // }
            };
        }
        let locParams = Router.parse().params;
        if (locParams.testBizCode) {
            viewData.bizCode = locParams.testBizCode;
        }

        // 处理用户信息，兼容user和userObj逻辑
        let userObj = viewData.userObj || {};
        if (userObj && userObj.meta) {
            viewData.user = userObj.meta.nickName || '';
        } else {
            viewData.userObj = viewData.userObj || {};
            viewData.userObj.meta = Magix.mix(viewData.userObj.meta || {}, {
                nickName: viewData.user || ''
            })
        }

        // 是否已登录不准入
        // USER_UNAUTHORIZED 不准入
        // CUSTOMER_JOIN_ERROR 资质异常
        viewData.unauthorized = (userObj.apiInfo?.errorCode == 'USER_UNAUTHORIZED' || userObj.apiInfo?.errorCode == 'CUSTOMER_JOIN_ERROR');

        // 是否登陆（unauthorized的情况下，可能取不到meta，但也是已登录态）
        viewData.userLogged = !!viewData.user || viewData.unauthorized;

        // 由于各bp逻辑不一致，支持已登录登陆框逻辑支持自定义实现，350*400
        // 如无特殊展示需求可使用系统默认的
        viewData.loginView = viewData.loginView || '@./login-already';

        // 头像
        viewData.portrait = viewData.portrait || 'https://img.alicdn.com/imgextra/i4/O1CN01ijZpi41vir7wjEuiY_!!6000000006207-2-tps-200-200.png';

        // bizCode：a_b，比如feedFlow_new
        // a：表示通用的平台bizCode，比如钻展是zszw，超级推荐是feedFlow，直通车是subway等等
        // b：额外的平台补充内容，如需要区分已登录未登录(login/logout)场景，或者需要区分新老客场景（old/new）等等
        // 导航定义的bizCode是站点的bizCode
        // 已接入bizCode详见：https://yuque.antfin-inc.com/yujia.yjq/yxrf9b/udfatf
        viewData.mainBizCode = viewData.bizCode.split('_')[0];

        this.updater.set({
            width: 1280,
            viewData
        })
        this.observeLocation(['curValue', 'testBizCode']);
    },
    async render() {
        let that = this;

        // 官网允许的bizCode配置
        let config = Magix.config('common-minisite.bizmap') || {};

        // 当前产品配置
        let { viewData } = that.updater.get();
        let biz = Magix.mix(config[viewData.bizCode] || config[DefBizCode], viewData);
        let siteInfo = await that.getSiteInfo(biz);
        Magix.mix(biz, siteInfo);

        // 所有的区块配置
        let { navs, info, curValue } = await that.getBlockInfo(biz);

        // 右侧固定悬浮按钮配置
        let fixedBtns = (biz.fixedBtns || []).concat((biz.fixAlimes || []).map(item => {
            // 小蜜logo固定
            item.img = 'https://img.alicdn.com/imgextra/i2/O1CN01KBG9Nq1VYc9ykOAxe_!!6000000002665-2-tps-200-200.png';
            return item;
        })).concat(biz.fixedBacks || []);

        that.updater.digest({
            fixedBtns,
            biz,
            navs,
            info,
            curValue
        });

        $(window).scrollTop(0);
    },

    /**
     * 获取当前站点入口的配置信息
     */
    getSiteInfo(biz) {
        let that = this;
        return new Promise(resolve => {
            if (biz.adc) {
                // 走adc的配置
                // 区分已登录未登陆的接口
                let user = that.updater.get('user') || {};
                let url = ((user.loginUser && user.loginUser.memberId) || (user.meta && user.meta.memberId)) ? 'component_findList__get' : 'unlogin_component_findUnLoginList__get';
                that.fetch([{
                    name: url,
                    pathParams: ['module_login.json'],
                    params: {
                        bizCode: biz.mainBizCode
                    }
                }], (err, model) => {
                    let rootComp = model.get('data.list.0', {});

                    // 转成alp的结构
                    let data = {
                        project: rootComp.properties?.title,
                        domain: rootComp.properties?.link,
                        logo: rootComp.properties?.img,
                        fixAlimes: rootComp.properties?.alime ? [{
                            from: rootComp.properties?.alime
                        }] : '',
                        navs: (rootComp.subComponentList || []).map(c => {
                            return {
                                text: c.name,
                                subs: c.subComponentList.map(s => {
                                    return {
                                        text: s.name,
                                        blockAlps: (s.subComponentList || []).map(ss => {
                                            return {
                                                type: ss.properties.type,
                                                params: ss.properties.alpInterface,
                                                bg: ss.properties.color
                                            }
                                        })
                                    };
                                })
                            };
                        })
                    }
                    resolve(data);
                })
            } else {
                // 走alp的配置
                that.fetch([{
                    name: 'one-stop__get',
                    pathParams: [biz.alp]
                }], (err, model) => {
                    let data = model.get('data', {});
                    // 是否需要登陆
                    data.needLogin = !(data.hideLogin + '' === 'true');

                    resolve(data);
                });
            }
        });
    },

    /**
     * 获取各模块配置
     */
    getBlockInfo(biz) {
        let that = this;
        return new Promise(resolve => {
            let map = {}, navs = [], defValue = '';
            biz.navs.forEach((n, ni) => {
                let subs = n.subs || [];
                if (subs.length > 1) {
                    // 多级菜单，选中的value是二级value
                    let nav = {
                        value: `nav_${ni}`,
                        text: n.text,
                        subs: []
                    }
                    subs.forEach((s, si) => {
                        // 外链类型，新开页or本页跳转，默认新开页打开
                        s.outer = !(s.linkSelf + '' === 'true');

                        s.value = `nav_${ni}_sub_${si}`;
                        nav.subs.push(s);
                        map[s.value] = s;
                    })
                    navs.push(nav);

                    // 第一个非外链tab
                    for (let i = 0; i < nav.subs.length; i++) {
                        if (defValue === '' && !nav.subs[i].link) {
                            defValue = nav.subs[i].value;
                            break;
                        }
                    }
                } else {
                    // 只有一个菜单
                    let v = `nav_${ni}`
                    subs[0].value = v;
                    navs.push({
                        value: v,
                        text: n.text,
                        link: subs[0].link,
                        outer: !(subs[0].linkSelf + '' === 'true')
                    });
                    map[v] = subs[0];

                    // 第一个非外链tab
                    if (defValue === '' && !subs[0].link) {
                        defValue = v;
                    }
                }
            });

            // 当前模块
            let locParams = Router.parse().params;
            let curValue = locParams.curValue || defValue;
            let info = map[curValue];
            if ($.isEmptyObject(info)) {
                Router.to({
                    curValue: defValue
                })
                resolve({ navs, info, curValue });
                return;
            }

            let models = [],
                blockAlps = info.blockAlps || [];
            blockAlps.forEach(b => {
                if (b.type != 'custom-view') {
                    // 非自定义view
                    models.push({
                        name: 'one-stop__get',
                        pathParams: [b.params]
                    })
                }
            })
            if (models.length > 0) {
                that.fetch(models, (blockErr, ...blockResults) => {
                    let blockMap = {};
                    models.forEach((m, i) => {
                        blockMap[m.pathParams[0]] = blockResults[i].get('data', {});
                    })

                    // 包装成统一的结构
                    // blocks: [{
                    //     tabName: '',
                    //     list: [{  // 子数据

                    //     }]
                    // }]
                    info.blocks = blockAlps.map((b, i) => {
                        if (b.type == 'custom-view') {
                            return b;
                        } else {
                            let d = blockMap[b.params];
                            switch (b.type) {
                                case 'login': // 三卡位+登陆框
                                    // 可能为单帧，可能为多帧
                                    if ($.isArray(d.banners)) {
                                        // 多帧
                                        b.tabs = [d];
                                    } else {
                                        // 单帧
                                        b.tabs = [{
                                            banners: [d]
                                        }]
                                    }
                                    break;

                                case 'footer-banner': // 底部banner图
                                case 'learn':  // 学习专区
                                case 'message': // 消息类型
                                    // 无模块标题的情况
                                    b.tabs = [d];
                                    break;

                                case 'hover-list': // 图片+标题+说明，hover加背景色，支持tab切换
                                case 'img-list': // 图片+标题+说明，支持tab切换
                                case 'tab-content':  // tab切换，一半图，一半文案，支持tab切换
                                case 'box-list': // 长条形卡片
                                    // 本身支持tab切换，即alp配置包含d.tabs
                                    Magix.mix(b, d);
                                    break;

                                case 'card-logo': // 小logo产品卡片
                                case 'card-logo-content': // 小logo产品卡片+左侧说明
                                case 'card-links': // 多链接
                                case 'card-case': // 多案例轮播
                                case 'card-list': // 三卡片轮播
                                case 'card-content': // 左侧文案，右侧三卡片轮播
                                case 'card-effects':  // 效果指标三卡片轮播
                                case 'card-icons':  // 图标三卡片轮播
                                case 'img': // 纯图片
                                    // 不会存在tab切换的情况
                                    // title 大标题
                                    // list 卡片
                                    // ... 其他数据
                                    b.tabs = [d];
                                    b.title = d.title;
                                    break;
                            }
                            b.index = 0;

                            // 埋点区分
                            b.spmIndex = `${biz.bizCode}${curValue}${i}`;
                            b.tabs.forEach((tab, j) => {
                                tab.index = j;

                                // 埋点区分
                                tab.spmIndex = `${biz.bizCode}${curValue}${i}${j}`;

                                // 卡片默认个数
                                let defLineNumber = 3;
                                switch (b.type) {
                                    case 'message': // 消息类型
                                    case 'hover-list': // 图片+标题+说明，hover加背景色，支持tab切换
                                    case 'img-list': // 图片+标题+说明，支持tab切换
                                        defLineNumber = 4;
                                        break;
                                }
                                tab.lineNumber = +tab.lineNumber || defLineNumber;

                                // 说明文字行数，默认2行
                                tab.tipLineNumber = +tab.tipLineNumber || 2;
                            })
                            return b;
                        }
                    })
                    resolve({ navs, info, curValue });
                })
            } else {
                // 都是自定义的view
                info.blocks = blockAlps;
                resolve({ navs, info, curValue });
            }
        });
    },

    'changeNav<navchange>'(event) {
        // 不保留其他参数
        let loc = Router.parse();
        let params = {
            curValue: event.nav.value
        }
        let { testBizCode } = loc.params;
        if (testBizCode) {
            Magix.mix(params, {
                testBizCode
            })
        }
        Router.to(loc.path, params);
    },
    'changeTab<change>'(e) {
        // e.value 当前选中的key值
        // e.text 当前选中的文案
        let { info } = this.updater.get();
        let { index } = e.params;
        info.blocks[index].index = e.value;
        this.updater.digest({
            info
        })
    }
});