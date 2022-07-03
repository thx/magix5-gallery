import Magix5 from 'magix5';
import View from 'common-minisite/view';
Magix.applyStyle('@icons.less');
const CommonAlimeGap = 6;
const AlimeItemWidth = 52;

export default View.extend({
    tmpl: '@icons.html',
    init(extra) {
        // 左定位，避免出现滚动条时定位调整
        this.updater.set({
            left: document.documentElement.clientWidth - AlimeItemWidth - CommonAlimeGap,
            bottom: 60,
            placement: 'left',
        });

        this.assign(extra);

        this.on('destroy', () => {
            if (this['@{drag.end.timer}']) {
                clearTimeout(this['@{drag.end.timer}']);
            }
        });
    },
    assign(extra) {
        // 当前数据截快照
        this.updater.snapshot();

        // 兼容历史配置，仅保留小蜜+扫码，顺序固定
        let btns = [], show = false;
        (extra.btns || []).forEach(item => {
            if (item.from) {
                // 有小蜜才显示
                show = true;
                btns.unshift(item);
            } else if (item.hover) {
                btns.push(item);
            }
        })

        this.updater.set({
            show,
            btns,
        });

        // altered是否有变化
        // true：有变化
        let altered = this.updater.altered();
        return altered;
    },

    render() {
        this.updater.digest();
    },


    /**
     * 获取可拖动范围上下限
     */
    '@{get.range}'() {
        let node = $(`#items_${this.id}`);
        let nodeWidth = node.outerWidth(),
            nodeHeight = node.outerHeight(),
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
    '@{drag}<mousedown>'(downEvent) {
        downEvent.preventDefault();

        let that = this;
        let { viewId, left, bottom } = that.updater.get();
        let winWidth = document.documentElement.clientWidth;
        let { hMax, hMin, vMax, vMin } = that['@{get.range}']();

        let startX = downEvent.pageX,
            startY = downEvent.pageY;

        $(document.body).off(`mousemove.${viewId}`)
            .on(`mousemove.${viewId}`, (moveEvent) => {
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

                that.updater.digest({
                    draged: true, // 记录用户是否拖动过
                    draging: true,
                    left: targetLeft,
                    bottom: targetBottom,
                    placement: (targetLeft > winWidth / 2) ? 'left' : 'right',
                })
            });

        $(document.body).off(`mouseup.${viewId}`)
            .on(`mouseup.${viewId}`, (upEvent) => {
                upEvent.preventDefault();

                $(document.body).off(`mousemove.${viewId}`);
                $(document.body).off(`mouseup.${viewId}`);

                that['@{drag.end.timer}'] = setTimeout(() => {
                    // 更新状态
                    that.updater.digest({
                        draging: false
                    });
                }, 60);
            });
    },

    /**
     * 打开小蜜浮层
     */
    '@{open.alime}<click>'(e) {
        if (this.updater.get('draging')) {
            return;
        }

        let item = e.params.item;
        let url = Magix.toUrl('https://ai.alimebot.taobao.com/intl/index.htm', {
            from: item.from,
        });
        let cont = ` <iframe src="${url}" frameborder="0" width="100%" height="100%"></iframe>`;

        let id = `alime_backdrop_${this.id}`;
        let node = $(`#${id}`);
        if (!node || !node.length) {
            // 追加到body
            $(document.body).append(`<div id="${id}" class="@icons.less:alime-backdrop">
                <div class="@icons.less:alime-iframe">
                    <a href="javascript:;" class="@icons.less:alime-close" data-spm-click="gostr=/alimama_bp.4.1;locaid=df5b217af">
                        <i class="mc-iconfont @icons.less:close-icon">&#xe603;</i>
                    </a>
                    ${cont}
                </div>
            </div>`);
            node = $(`#${id}`);
            node.find('.@icons.less:alime-close').on('click', () => {
                node.removeClass('@icons.less:alime-backdrop-show');
            })
        } else {
            // 更新from，仅在from变更时替换，保留历史对话
            let frame = node.find('iframe')[0];
            if (frame.src != url) {
                frame.remove();
                node.find('.@icons.less:alime-iframe').append(cont);
            }
        }
        node.addClass('@icons.less:alime-backdrop-show');
        this['@{resize.alime}']();
    },

    '@{resize.alime}'() {
        let node = $(`#alime_backdrop_${this.id}`);
        if (node && node.length) {
            node.find('.@icons.less:alime-iframe').css({
                width: Math.min(960, document.documentElement.clientWidth),
                height: Math.min(700, document.documentElement.clientHeight),
            });
        }
    },

    '@{back}<click>'(e) {
        if (this.updater.get('draging')) {
            return;
        }

        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            window.scrollTo(0, 0);
        }
    },

    '$win<resize>'(e) {
        let winWidth = document.documentElement.clientWidth;

        if (!this.updater.get('draged')) {
            // 未自定义拖动过，始终保持右下角
            let targetLeft = winWidth - AlimeItemWidth - CommonAlimeGap;
            this.updater.digest({
                left: targetLeft,
                bottom: 60,
                placement: (targetLeft > winWidth / 2) ? 'left' : 'right',
            })
        } else {
            // 保持在可视范围内
            let { left, bottom } = this.updater.get();
            let { hMax, hMin, vMax, vMin } = this['@{get.range}']();
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
                this.updater.digest({
                    left: targetLeft,
                    bottom: targetBottom,
                    placement: (targetLeft > winWidth / 2) ? 'left' : 'right',
                })
            }
        }

        this['@{resize.alime}']();
    },
});



