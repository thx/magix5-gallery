
import Magix5 from 'magix5';
import View from '../mx-base/view';
let { applyStyle, node, inside, attach, detach } = Magix5;
applyStyle('@:index.less');

let supportThemes = ['white', 'dark'];
let supportPlacements = ['bl', 'br', 'bc',
    'tl', 'tr', 'tc',
    'rt', 'rb', 'rc',
    'lt', 'lb', 'lc'];
let delayTimers = ['@:{dealy.show.timer}', '@:{dealy.hide.timer}'];
export default View.extend({
    init() {
        this.set({
            popId: `popover_${this.id}`,
        });
        this.on('destroy', () => {
            this['@:{clear.timers}']();
        });
    },

    assign(options) {
        let constants = this.get('constants');
        let showDelay = options.showDelay || constants.showDelay,
            hideDelay = options.hideDelay || constants.hideDelay;

        // type(样式)：dark 深底色，white 白底色
        let type = options.type;
        if (!supportThemes.includes(type)) {
            type = 'white';
        }

        // placement：定位，默认下居中
        // bl：bottom left 下方，左对齐
        // br：bottom right 下方，右对齐
        // bc：bottom center 下方，居中对齐
        // tl：top left 上方，左对齐
        // tr：top right 上方，右对齐
        // tc：top center 上方，居中对齐
        // rt：right top 右侧，上对齐
        // rb：right bottom 右侧，下对齐
        // rc：right center 右侧，居中对齐
        // lt：left top 左侧，上对齐
        // lb：left bottom 左侧，下对齐
        // lc：left center 左侧，居中对齐
        let placement = options.placement;
        if (!supportPlacements.includes(placement)) {
            placement = 'bc';
        }

        // top + left：明确指定定位，此时忽略placement
        let top = +options.top,
            left = +options.left;

        // offset：在(top和left) / (placement)的基础上微量偏移
        let offset = options.offset || {};

        let width = options.width || 200,
            zIndex = options.zIndex || 999999;

        // content提示内容
        // view+viewData：提示内容为自定义view
        let content = options.content,
            view = options.view,
            viewData = options.viewData || {};

        // 是否需要动画，默认需要
        let transform = options.transform + '' !== 'false';

        // 是否需要默认打开浮层
        let auto = options.auto + '' === 'true';

        this.set({
            init: false, // 入参改动是重置trigger样式
            showDelay,
            hideDelay,
            type,
            posConfigs: {
                placement,
                width, top, left, offset,
                zIndex, transform
            },
            content,
            view,
            viewData,
            auto,
        })
    },

    render() {
        // 没有模板的组件不需要digest
        // this.digest();

        // 默认展开显示框
        if (this.get('auto')) {
            this['@:{show}']();
        }
    },

    '@:{init}'() {
        let { popId, type, posConfigs } = this.get();
        let popNode;
        if (!node(popId)) {
            popNode = document.createElement('div');
            popNode.id = popId;
            document.body.appendChild(popNode);

            let watchOver = e => {
                if (inside(e.relatedTarget, e.currentTarget)) {
                    return;
                }
                this['@:{clear.timers}']();
            }
            let watchOut = e => {
                if (inside(e.relatedTarget, e.currentTarget)) {
                    return;
                }
                this['@:{hide}']();
            }

            attach(popNode, 'pointerover', watchOver);
            attach(popNode, 'pointerout', watchOut);

            this.on('destroy', () => {
                detach(popNode, 'pointerover', watchOver);
                detach(popNode, 'pointerout', watchOut);

                // 移除节点
                this.owner.unmount(popNode);
                popNode.remove();
            });
        } else {
            popNode = node<HTMLElement>(popId);
        }

        // 每次初始化重置样式
        popNode.className = `@:index.less:mx5-popover--${type} @:index.less:mx5-popover--${posConfigs.placement}`;
        popNode.style.width = `${posConfigs.width}px`;
    },
    /**
     * 展示
     */
    '@:{show}'() {
        this['@:{clear.timers}']();
        this['@:{dealy.show.timer}'] = setTimeout(() => {
            // 每次展开重新渲染内容
            let { popId, content,
                show,
                view, viewData, posConfigs
            } = this.get();
            if (!show) {
                this['@:{init}']();
                // trigger样式更新
                this.set({
                    show: true
                });
                //?每次展示都需要重新渲染vframe吗
                let popNode = node<HTMLElement>(popId);
                this['@:{pop.vframe}'] = this.owner.mount(popNode, '@:./content', {
                    content,
                    view,
                    viewData,
                    posConfigs,
                });
            }
        }, this.get('showDelay'));
    },
    /**
     * 隐藏
     */
    '@:{hide}'() {
        this['@:{clear.timers}']();
        this['@:{dealy.hide.timer}'] = setTimeout(() => {
            if (this.get('show')) {
                // trigger样式更新
                this.set({
                    show: false
                });
                // 内容隐藏
                let vf = this['@:{pop.vframe}'];
                if (vf) {
                    vf.invoke('@:{hide}');
                }
            }
        }, this.get('hideDelay'));
    },
    /**
     * 清理定时器
     */
    '@:{clear.timers}'() {
        for (let timer of delayTimers) {
            clearTimeout(this[timer]);
        }
    },
    /**
     * 从根节点移入
     * @param e 指针事件对象
     */
    '$root<pointerover>'(e) {
        if (!inside(e.relatedTarget, e.eventTarget)) {
            this['@:{show}']();
        }
    },
    /**
     * 从根节点移出
     * @param e 指针事件对象
     */
    '$root<pointerout>'(e) {
        if (!inside(e.relatedTarget, e.eventTarget)) {
            this['@:{hide}']();
        }
    }
});