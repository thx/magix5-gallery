
import Magix5, { Vframe } from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    init(options) {
        let that = this;
        that.set({
            popId: `popover_${that.id}`,
        })

        that.on('destroy', () => {
            that['@:{clear.timers}']();
        });
    },

    assign(options) {
        let showDelay = options.showDelay || 100,
            hideDelay = options.hideDelay || 200;

        // type(样式)：dark 深底色，white 白底色
        let type = options.type || 'white';
        if (['white', 'dark'].indexOf(type) < 0) {
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
        let placement = options.placement || 'bc';
        if (['bl', 'br', 'bc', 'tl', 'tr', 'tc', 'rt', 'rb', 'rc', 'lt', 'lb', 'lc'].indexOf(placement) < 0) {
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
            showDelay,
            hideDelay,
            type,
            posConfigs: { placement, width, top, left, offset, zIndex, transform },
            content,
            view,
            viewData,
            auto,
        })
    },

    render() {
        // await this.digest();
        this.digest();

        // 默认展开显示框
        if (this.get('auto')) {
            this['@:{show}']();
        }
    },

    '@:{init}'() {
        let that = this;
        let { popId, type, posConfigs } = that.get();
        let popNode;
        if (!Magix5.node(popId)) {
            popNode = document.createElement('div');
            popNode.id = popId;
            popNode.className = `@:index.less:mx5-popover--${type} @:index.less:mx5-popover--${posConfigs.placement}`;
            popNode.setAttribute('style', `width: ${posConfigs.width}px;`);
            document.body.appendChild(popNode);
        }

        let watchOver = e => {
            if (Magix5.inside(e.relatedTarget, e.currentTarget)) {
                return;
            }
            that['@:{clear.timers}']();
        }
        let watchOut = e => {
            if (Magix5.inside(e.relatedTarget, e.currentTarget)) {
                return;
            }
            that['@:{hide}']();
        }
        Magix5.attach(popNode, 'mouseover', watchOver);
        Magix5.attach(popNode, 'mouseout', watchOut);
        that.on('destroy', () => {
            Magix5.detach(popNode, 'mouseover', watchOver);
            Magix5.detach(popNode, 'mouseout', watchOut);

            // 移除节点
            that.owner.unmount(popNode);
            popNode.remove();
        });
    },

    '@:{show}'() {
        let that = this;
        that['@:{clear.timers}']();
        that['@:{dealy.show.timer}'] = setTimeout(() => {
            if (!that['init.node']) {
                that['init.node'] = true;
                that['@:{init}']();
            }

            if (that.get('show')) {
                return;
            }
            that.set({ show: true });

            // 每次展开重新渲染内容
            let { popId, content, view, viewData, posConfigs } = that.get();
            let popNode = Magix5.node<HTMLElement>(popId);
            that['@:{pop.vframe}'] = that.owner.mount(popNode, '@:./content', {
                content,
                view,
                viewData,
                posConfigs,
            });
        }, that.get('showDelay'));
    },

    '@:{hide}'() {
        let that = this;
        that['@:{clear.timers}']();
        that['@:{dealy.hide.timer}'] = setTimeout(() => {
            if (!that.get('show')) {
                return;
            }

            that.set({ show: false });
            // 内容隐藏
            let vf = that['@:{pop.vframe}'];
            if (vf) {
                vf.invoke('@:{hide}');
            }
        }, that.get('hideDelay'));
    },

    '@:{clear.timers}'() {
        let that = this;
        ['@:{dealy.show.timer}', '@:{dealy.hide.timer}'].forEach(key => {
            if (that[key]) {
                clearTimeout(that[key]);
            }
        });
    },

    '$root<mouseover>'(e) {
        if (Magix5.inside(e.relatedTarget, e.eventTarget)) {
            return;
        }

        this['@:{show}']();
    },

    '$root<mouseout>'(e) {
        if (Magix5.inside(e.relatedTarget, e.eventTarget)) {
            return;
        }
        this['@:{hide}']();
    }
});