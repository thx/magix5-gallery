import Magix5, { applyStyle, toUrl, attach, detach } from 'magix5';
import View from 'magix5-gallery/view';
applyStyle('@:icons.less');
const CommonAlimeGap = 6;
const AlimeItemWidth = 52;

export default View.extend({
    tmpl: '@:icons.html',
    init(extra) {
        this.on('destroy', () => {
            ['@:{resize.delay.timer}', '@:{drag.end.timer}'].forEach(k => {
                if (this[k]) {
                    clearTimeout(this[k]);
                }
            })

            let alimeDlg = document.querySelector(`#alime_backdrop_${this.id}`);
            if (alimeDlg) {
                alimeDlg.remove();
            }
        });
    },
    assign(extra) {
        // 右侧固定悬浮按钮配置
        let originBtns = (extra.biz.fixedBtns || []).concat((extra.biz.fixAlimes || []));

        // 兼容历史配置，仅保留小蜜+扫码，顺序固定
        let btns = [], show = false;
        originBtns.forEach(item => {
            if (item.from) {
                // 有小蜜才显示
                show = true;
                btns.unshift(item);
            } else if (item.hover) {
                btns.push(item);
            }
        })

        this.set({
            show,
            btns,
        });
    },

    render() {
        // 左定位，避免出现滚动条时定位调整
        this.digest({
            left: document.documentElement.clientWidth - AlimeItemWidth - CommonAlimeGap,
            bottom: 60,
            placement: 'lb',
        });
    },


    /**
     * 获取可拖动范围上下限
     */
    '@:{get.range}'() {
        let node = Magix5.node<HTMLElement>(`items_${this.id}`);
        let nodeWidth = node.offsetWidth,
            nodeHeight = node.offsetHeight,
            winWidth = document.documentElement.clientWidth,
            winHeight = document.documentElement.clientHeight;

        return {
            hMax: winWidth - CommonAlimeGap - nodeWidth,
            hMin: CommonAlimeGap,
            vMax: winHeight - CommonAlimeGap - nodeHeight,
            vMin: CommonAlimeGap,
        }
    },

    /**
     * 拖动
     */
    '@:{drag}<mousedown>&{capture:true,passive:false}'(downEvent) {
        downEvent.preventDefault();

        let that = this;
        let { viewId, left, bottom } = that.get();
        let winWidth = document.documentElement.clientWidth;
        let { hMax, hMin, vMax, vMin } = that['@:{get.range}']();

        let startX = downEvent.pageX,
            startY = downEvent.pageY;

        let moveFn = (moveEvent) => {
            moveEvent.preventDefault();
            let endX = moveEvent.pageX,
                endY = moveEvent.pageY;

            let targetLeft = left + (endX - startX);
            if (targetLeft < hMin) {
                targetLeft = hMin;
            } else if (targetLeft > hMax) {
                targetLeft = hMax;
            }

            let targetBottom = bottom - (endY - startY);
            if (targetBottom < vMin) {
                targetBottom = vMin;
            } else if (targetBottom > vMax) {
                targetBottom = vMax;
            }

            that.digest({
                draged: true, // 记录用户是否拖动过
                draging: true,
                left: targetLeft,
                bottom: targetBottom,
                placement: (targetLeft > winWidth / 2) ? 'lb' : 'rb',
            })
        }
        detach(document.body, 'mousemove', moveFn);
        attach(document.body, 'mousemove', moveFn);

        let mouseupFn = (upEvent) => {
            upEvent.preventDefault();
            detach(document.body, 'mousemove', moveFn);
            detach(document.body, 'mouseup', mouseupFn);

            that['@:{drag.end.timer}'] = setTimeout(() => {
                // 更新状态
                that.digest({
                    draging: false
                });
            }, 60);
        }
        detach(document.body, 'mouseup', mouseupFn);
        attach(document.body, 'mouseup', mouseupFn);
    },

    /**
     * 打开小蜜浮层
     */
    '@:{open.alime}<click>'(e) {
        if (this.get('draging')) {
            return;
        }
        let item = e.params.item;
        let url = toUrl('https://ai.alimebot.taobao.com/intl/index.htm', {
            from: item.from,
        });
        let cont = `<iframe src="${url}" frameborder="0" width="100%" height="100%"></iframe>`;

        let id = `alime_backdrop_${this.id}`;
        let node = Magix5.node<HTMLElement>(id);
        if (!node) {
            // 追加到body
            node = document.createElement('div');
            node.id = id;
            node.classList.add('@:icons.less:alime-backdrop');
            node.insertAdjacentHTML('beforeend', `<div class="@:icons.less:alime-iframe">
                <a href="javascript:;" class="@:icons.less:alime-close" data-spm-click="gostr=/alimama_bp.4.1;locaid=df5b217af">
                    <i class="mx5-iconfont @:icons.less:close-icon">&#xe603;</i>
                </a>
                ${cont}
            </div>`);
            document.body.appendChild(node);
            attach(node.querySelector('.@:icons.less:alime-close'), 'click', () => {
                node.classList.remove('@:icons.less:alime-backdrop-show');
            });
        } else {
            // 更新from，仅在from变更时替换，保留历史对话
            let frame = node.querySelector('iframe');
            if (frame.src != url) {
                frame.remove();
                node.querySelector('.@:icons.less:alime-iframe').insertAdjacentHTML('beforeend', cont);
            }
        }
        node.classList.add('@:icons.less:alime-backdrop-show');
        this['@:{resize.alime}']();
    },

    '@:{resize.alime}'() {
        clearTimeout(this['@:{resize.delay.timer}']);

        this['@:{resize.delay.timer}'] = setTimeout(() => {
            let node = Magix5.node<HTMLElement>(`alime_backdrop_${this.id}`);
            if (node) {
                let frame = node.querySelector('.@:icons.less:alime-iframe');
                frame.style.width = Math.min(960, document.documentElement.clientWidth) + 'px';
                frame.style.height = Math.min(700, document.documentElement.clientHeight) + 'px';
            }
        }, 100);
    },

    '@:{back}<click>'(e) {
        if (this.get('draging')) {
            return;
        }

        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            window.scrollTo(0, 0);
        }
    },

    async '$win<resize>'(e) {
        let winWidth = document.documentElement.clientWidth;

        if (!this.get('draged')) {
            // 未自定义拖动过，始终保持右下角
            let targetLeft = winWidth - AlimeItemWidth - CommonAlimeGap;
            await this.digest({
                left: targetLeft,
                bottom: 60,
                placement: (targetLeft > winWidth / 2) ? 'lb' : 'rb',
            })
        } else {
            // 保持在可视范围内
            let { left, bottom } = this.get();
            let { hMax, hMin, vMax, vMin } = this['@:{get.range}']();
            let targetLeft = left,
                targetBottom = bottom;
            if (targetLeft < hMin) {
                targetLeft = hMin;
            } else if (targetLeft > hMax) {
                targetLeft = hMax;
            }
            if (targetBottom < vMin) {
                targetBottom = vMin;
            } else if (targetBottom > vMax) {
                targetBottom = vMax;
            }

            if (targetLeft != left || targetBottom != bottom) {
                await this.digest({
                    left: targetLeft,
                    bottom: targetBottom,
                    placement: (targetLeft > winWidth / 2) ? 'lb' : 'rb',
                })
            }
        }

        this['@:{resize.alime}']();
    },
});



