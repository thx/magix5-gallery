
import Magix5 from 'magix5';
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

        // type 样式
        // dark 深底色
        // white 白底色
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
            placement,
            top,
            left,
            offset,
            width,
            zIndex,
            content,
            view,
            viewData,
            transform,
            auto,
        })
    },

    async render() {
        let that = this;
        await that.digest();

        if (that.get('auto')) {
            // 延迟等待内容显示
            that['@:{dealy.show.timer}'] = setTimeout(() => {
                that['@:{show}']();
            }, that.get('showDelay'));
        }
    },

    '@:{set.pos}'(popNode) {
        let root = this.root;
        let { top: customTop, left: customLeft, offset: customOffset, placement } = this.get();

        let width = root.offsetWidth,
            height = root.offsetHeight,
            offset = this['@:{mx.style.offset}'](root);
        let contentWidth = popNode.offsetWidth,
            contentHeight = popNode.offsetHeight;

        // 默认下方居中
        let gap = 10;
        let top = offset.top + gap,
            left = offset.left - (contentWidth - width) / 2;

        if (isNaN(customTop) || isNaN(customLeft)) {
            switch (placement) {
                case 'tl':
                    top = offset.top - contentHeight - gap;
                    left = offset.left;
                    break;

                case 'tc':
                    top = offset.top - contentHeight - gap;
                    left = offset.left - (contentWidth - width) / 2
                    break;

                case 'tr':
                    top = offset.top - contentHeight - gap;
                    left = offset.left + width - contentWidth;
                    break;

                case 'bl':
                    top = offset.top + height + gap;
                    left = offset.left;
                    break;

                case 'bc':
                    top = offset.top + height + gap;
                    left = offset.left - (contentWidth - width) / 2
                    break;

                case 'br':
                    top = offset.top + height + gap;
                    left = offset.left + width - contentWidth;
                    break;

                case 'lt':
                    top = offset.top;
                    left = offset.left - contentWidth - gap;
                    break;

                case 'lc':
                    top = offset.top - (contentHeight - height) / 2;
                    left = offset.left - contentWidth - gap;
                    break;

                case 'lb':
                    top = offset.top - (contentHeight - height);
                    left = offset.left - contentWidth - gap;
                    break;

                case 'rt':
                    top = offset.top;
                    left = offset.left + width + gap;
                    break;

                case 'rc':
                    top = offset.top - (contentHeight - height) / 2;
                    left = offset.left + width + gap;
                    break;

                case 'rb':
                    top = offset.top - (contentHeight - height);
                    left = offset.left + width + gap;
                    break;
            }
        } else {
            top = customTop;
            left = customLeft;
        }

        // 偏移修正
        left += (+customOffset.left || 0);
        top += (+customOffset.top || 0);

        let winWidth = window.innerWidth;
        if (left < 0) {
            left = 0;
        } else if (left + contentWidth > winWidth) {
            left = winWidth - contentWidth;
        }

        popNode.style.top = top + 'px';
        popNode.style.left = left + 'px';
        popNode.classList.add('@:index.less:mx5-popover-show');
    },

    '@:{init}'() {
        let that = this;
        let { popId, type, placement, width, zIndex } = that.get();
        let popNode;
        if (!Magix5.node(popId)) {
            popNode = document.createElement('div');
            popNode.id = popId;
            popNode.className = `@:index.less:mx5-popover--${type} @:index.less:mx5-popover--${placement}`;
            popNode.setAttribute('style', `width: ${width}px; z-index: ${zIndex};`);
            document.body.appendChild(popNode);
        }

        let watchOver = e => {
            if (Magix5.inside(e.relatedTarget, e.eventTarget)) {
                return;
            }
            that['@:{clear.timers}']();
        }
        let watchOut = e => {
            if (Magix5.inside(e.relatedTarget, e.eventTarget)) {
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
        })
    },

    '@:{show}'() {
        let that = this;
        that['@:{clear.timers}']();
        that['@:{dealy.show.timer}'] = setTimeout(() => {
            if (!that.get('init')) {
                that.set({ init: true });
                that['@:{init}']();
            }

            if (that.get('show')) { return; }
            that.set({ show: true });

            // 每次展开重新渲染内容
            let { popId, content, view, viewData } = that.get();
            let popNode = Magix5.node(popId);
            that.owner.mount(popNode, '@:./content', {
                content,
                view,
                viewData,
            });

            // 每次show时都重新定位
            that['@:{set.pos}'](popNode);
        }, that.get('showDelay'));
    },

    '@:{hide}'() {
        let that = this;
        that['@:{clear.timers}']();
        that['@:{dealy.hide.timer}'] = setTimeout(() => {
            if (!that.get('show')) { return; }
            that.set({ show: false });

            // 样式隐藏
            let { popId } = that.get();
            document.getElementById(popId).classList.remove('@:index.less:mx5-popover-show');
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