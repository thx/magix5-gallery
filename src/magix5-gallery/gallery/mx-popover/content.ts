import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:content.html',
    assign(options) {
        let { transform } = options.posConfigs;
        this.set({
            ...options,
            showClassName: transform ? '@:index.less:mx5-popover-anim-show' : '@:index.less:mx5-popover-direct-show',
            hideClassName: transform ? '@:index.less:mx5-popover-anim-hide' : '@:index.less:mx5-popover-direct-hide',
        });

        let ro = new ResizeObserver(entries => {
            let show = false;
            for (let e of entries) {
                if (e.contentRect.width > 0 &&
                    e.contentRect.height > 0) {
                    show = true;
                }
            }
            if (show) {
                // 每次show时重新定位
                console.log(this.id, 'reset position');
                this['@:{set.pos}']();
            }
        });
        ro.observe(this.root);
        this.on('destroy', () => {
            ro.unobserve(this.root);
        });
    },
    async render() {
        await this.digest();

        // 当前节点
        let node = this.root;
        let {
            posConfigs: { zIndex },
            showClassName, hideClassName
        } = this.get();
        node.style.zIndex = zIndex;
        node.classList.remove(hideClassName);
        node.classList.add(showClassName);
    },
    '@:{set.pos}'() {
        let node = this.root; // 当前节点
        let parentNode = this.owner.parent().root; // 父节点
        let {
            posConfigs: { top: customTop, left: customLeft, offset: customOffset, placement },
        } = this.get();

        let width = parentNode.offsetWidth,
            height = parentNode.offsetHeight,
            offset = this['@:{mx.style.offset}'](parentNode);
        let contentWidth = node.offsetWidth,
            contentHeight = node.offsetHeight;

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

        node.style.top = top + 'px';
        node.style.left = left + 'px';
    },
    '@:{hide}'() {
        let { showClassName, hideClassName } = this.get();
        let { classList } = this.root;
        classList.remove(showClassName);
        classList.add(hideClassName);
    }
});