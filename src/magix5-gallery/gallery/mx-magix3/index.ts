import Magix from 'magix5';

let { View, mark, guid, dispatch, delay, lowTaskFinale } = Magix;
let promisePools = {};
let versionsAPI = '//alimama.taobao.com/login/getOneSiteCdnList.json';
let portProject = 'magix-ports';
let fvPromise;
let crossConfigKey = 'crossConfigs';
let PREPARE_NONE = 1,
    PREPARE_LOAD = 2,
    PREPARE_CALL = 4;
let projectPrepareInfos = {
    [portProject]: PREPARE_NONE
};
let checkEvent = new Event('x');
let useGlobal = true,
    useNormalize = false,
    useTheme = true,
    usePackageName = '',
    useTryTimes = 3,
    useTryInterval = 50,
    innerCorssConfigs,
    innerBootConfigs;

let LoadScript = (url, checkName) => {
    let key = 'script_' + url;
    let p = promisePools[key];
    let seajs = window.seajs;
    if (seajs &&
        checkName) {
        let cachedUri = seajs.resolve(checkName);
        let pkg = seajs.cache[cachedUri];
        if (pkg &&
            !p) {
            p = promisePools[key] = Promise.resolve();
        }
    }
    if (!p) {
        p = promisePools[key] = new Promise(resolve => {
            let script = document.createElement('script');
            script.onload = script.onerror = () => {
                script.parentNode.removeChild(script);
                setTimeout(resolve, 50);
            };
            script.src = url;
            document.body.append(script);
        });
    }
    return p;
};
let FetchVersions = () => {
    if (!fvPromise) {
        fvPromise = new Promise((resolve, reject) => {
            //优先使用入口页面上可能配置的crossConfigs
            let list = innerCorssConfigs || window[crossConfigKey];
            if (list) {
                let map = {};
                for (let e of list) {
                    map[e.projectName] = e;
                }
                resolve({
                    list,
                    map,
                    from: crossConfigKey
                });
            } else {
                let innerTimes = useTryTimes;
                let retry = msg => {
                    if (innerTimes) {
                        innerTimes--;
                        setTimeout(remote, useTryInterval);
                    } else {
                        fvPromise = null;
                        reject(msg);
                    }
                };
                let remote = () => {
                    fetch(versionsAPI, {
                        credentials: 'include',
                        method: 'get',
                        headers: {
                            'Accept': 'application/json'
                        },
                        mode: 'cors'
                    }).then(r => {
                        if (r.ok) {
                            return r.json();
                        } else {
                            retry(`获取资源文件[${versionsAPI}]异常：${r.statusText}`);
                        }
                    }).then(json => {
                        if (!json ||
                            !json.info ||
                            !json.info.ok) {
                            retry(`获取资源文件[${versionsAPI}]失败`);
                        } else {
                            let list = json.data.list;
                            let map = {};
                            for (let e of list) {
                                map[e.projectName] = e;
                            }
                            resolve({
                                list,
                                map,
                                from: versionsAPI
                            });
                        }
                    }).catch(ex => {
                        retry(`获取资源文件[${versionsAPI}]异常：${ex.message}`);
                    });
                };
                remote();
            }
        });
    }
    return fvPromise;
};
let Preload = preloads => {
    return new Promise<void>(resolve => {
        if (preloads) {
            let seajs = window.seajs;
            if (seajs) {
                seajs.use(preloads, resolve);
            } else {
                resolve();
            }
        } else {
            resolve();
        }
    });
};
let preparePromises = {};
let loadCrossPrepare = (module, params) => {
    let index = module.indexOf('/');
    let pkg = index > -1 ? module.substring(0, index) : module;
    if (!preparePromises[pkg]) {
        if (index == -1 ||
            projectPrepareInfos[pkg] == PREPARE_NONE) {
            preparePromises[pkg] = Promise.resolve();
        } else if (!projectPrepareInfos[pkg] ||
            (projectPrepareInfos[pkg] & PREPARE_LOAD)) {
            preparePromises[pkg] = new Promise<void>((resolve, reject) => {
                window.seajs.use(`${pkg}/prepare`, P => {
                    try {
                        if (!projectPrepareInfos[pkg] ||
                            (projectPrepareInfos[pkg] & PREPARE_CALL)) {
                            if (P.__esModule) {
                                P = P.default;
                            }
                            P(params).then(resolve, reject);
                        } else {
                            resolve();
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }
    }
    return preparePromises[pkg];
};
let FetchRootAndPrepare = () => {
    return new Promise<{
        root: any,
        prepare: any
    }>((resolve) => {
        let seajs = window.seajs;
        let Magix = seajs.require('magix');
        let rId = Magix.config('rootId');
        let rootVframe = Magix.Vframe.get(rId);
        if (!rootVframe) {
            Magix.boot({
                error(ex) {
                    console.error(ex);
                },
                require(modules, params) {
                    let promises = [];
                    for (let m of modules) {
                        promises.push(loadCrossPrepare(m, params));
                    }
                    return Promise.all(promises);
                },
                hashbang: '#',
                ...innerBootConfigs
            });
            rootVframe = Magix.Vframe.get(rId);
        }
        resolve(rootVframe);
    });
};
let MountOrUpdateView = (root, nodeId, target, params) => {
    let Magix = window.seajs.require('magix');
    let Magix5 = window.seajs.require('magix5');
    let vf = Magix.Vframe.get(nodeId);
    let view = vf && vf.$v;
    let hasAssign = view && view.assign;
    let newPath = Magix.parseUrl(target).path;
    let oldPath = vf && vf.path;
    if (oldPath) {
        oldPath = Magix.parseUrl(oldPath).path;
    }
    if (newPath === oldPath &&
        hasAssign) {
        if (Magix.toTry(view.assign, [params], view)) {
            view.render();
        }
    } else {
        /**
         * 清理5中当前节点下的其它组件
         */
        let hostNode = Magix5.node(nodeId);
        let magix5Views = hostNode.querySelectorAll('[mx5-view]');
        for (let v of magix5Views) {
            let vf = Magix5.Vframe.byNode(v);
            if (vf) {
                vf.unmount();
            }
        }
        root.mountVframe(nodeId, target, params);
    }
};

let UnmountView = rootId => {
    if (window.seajs) {
        let Magix = window.seajs.require('magix');
        if (Magix) {
            let rId = Magix.config('rootId');
            let rootVframe = Magix.Vframe.get(rId);
            if (rootVframe) {
                rootVframe.unmountVframe(rootId);
            }
        }
    }
};
let SetupEnv = (pkg, cdn, api) => {
    let seajs = window.seajs;
    if (!cdn.endsWith('/')) {
        cdn += '/';
    }
    if (cdn.endsWith(pkg + '/')) {
        cdn = cdn.substring(0, cdn.length - pkg.length - 1);
    }
    let paths = seajs.data && seajs.data.paths;
    if (!paths ||
        !paths[pkg]) {
        seajs.config({
            paths: {
                [pkg]: cdn + pkg
            }
        });
    }
    let Magix = seajs.require('magix');
    let source = Magix.config(`${pkg}.resource`);
    if (!source) {
        Magix.config({
            [`${pkg}.api.host`]: api,
            [`${pkg}.resource`]: cdn
        });
    }
};

let RegisterEnvs = list => {
    for (let e of list) {
        SetupEnv(e.projectName, e.source, e.apiHost);
    }
};
export default View.extend({
    init() {
        this.on('destroy', () => {
            let nodeId = this.root.id;
            this['@:{unhook.events}']();
            UnmountView(nodeId);
        });
    },
    assign(data) {
        this.set(data);
    },
    '@:{hook.events}'() {
        let he = this.get('hookEvents');
        if (he) {
            let events = he.split(',');
            let root = window.jQuery(this.root);
            let transfer = e => {
                //只拦jq封装的事件
                if (!e.originalEvent) {
                    //立即停止
                    e.stopPropagation();
                    let { type, ...rest } = e;
                    let data = {};
                    for (let x in rest) {
                        if (!(x in checkEvent)) {
                            data[x] = rest[x];
                        }
                    }
                    dispatch(this.root, type, data);
                }
            };
            this['@:{transfer}'] = transfer;
            this['@:{events}'] = events;
            for (let e of events) {
                root.on(e.trim(), transfer);
            }
        }
    },
    '@:{unhook.events}'() {
        let transfer = this['@:{transfer}'];
        let events = this['@:{events}'];
        if (window.jQuery) {
            let root = window.jQuery(this.root);
            if (events) {
                for (let e of events) {
                    root.off(e.trim(), transfer);
                }
            }
        }
    },
    async render() {
        let { target, params, preloads } = this.get();
        let node = this.root;
        if (!node.id) {
            node.id = guid('mx3-');
        }
        let nodeId = node.id;
        try {
            this['@:{unhook.events}']();
            let renderMark = mark(this, '@:{update.view}');
            let slashIndex = target.indexOf('/');
            let pfxPkgName = target.substring(0, slashIndex);
            let vInfo = await FetchVersions();
            let pkg = vInfo.map[pfxPkgName];
            if (!pkg) {
                throw new Error(`从${vInfo.from}的数据中，未能找到${pfxPkgName}的配置`);
            }
            let portScript = vInfo.map[portProject];
            if (!portScript) {
                throw new Error(`从${vInfo.from}的数据中，未能找到magix-ports的配置`);
            }
            let src = portScript.source;
            if (!src.endsWith('/')) {
                src += '/';
            }
            await LoadScript(portScript.source + 'entry.js', portProject);
            let seajs = window.seajs;
            let portsPromise = seajs && seajs.require(portProject);
            if (!portsPromise) {
                throw new Error('未能加载magix-ports平台化文件');
            }
            RegisterEnvs(vInfo.list);
            await portsPromise(useNormalize, useGlobal, useTheme, usePackageName);
            await Preload(preloads);
            await lowTaskFinale();
            await delay(10);//待外部就绪
            let root = await FetchRootAndPrepare();
            this['@:{hook.events}']();
            if (renderMark()) {
                MountOrUpdateView(root, nodeId, target, params);
            }
        } catch (ex) {
            if (node) {
                node.innerHTML = (ex && (ex.message || ex.msg)) || ex;
            }
        }
    }
}).static({
    config({
        api = '',
        normalize = false,
        global = true,
        theme = true,
        crossConfigs = null,
        bootConfigs = null,
        galleryPackageName = '',
        tryTimes = 3,
        tryInterval = 50
    }) {
        useNormalize = normalize;
        useGlobal = global;
        useTheme = theme;
        if (api) {
            versionsAPI = api;
        }
        if (crossConfigs) {
            innerCorssConfigs = crossConfigs;
        }
        innerBootConfigs = bootConfigs;
        usePackageName = galleryPackageName;
        useTryTimes = tryTimes;
        useTryInterval = tryInterval;
    },
    setPrepare(prepares) {
        for (let p of prepares) {
            let m = 0;
            if (p.load) {
                m |= PREPARE_LOAD;
            }
            if (p.call) {
                m |= PREPARE_CALL;
            }
            if (p.none) {
                m = PREPARE_NONE;
            }
            projectPrepareInfos[p.projectName] = m;
        }
    }
});