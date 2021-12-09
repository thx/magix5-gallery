/**
 * 数字动画
 * 数据始终从下往上滚动 https://aone.alibaba-inc.com/req/33862458
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    init(options) {
        this.on('destroy', () => {
            if (this['@{delay.show.timer}']) {
                clearTimeout(this['@{delay.show.timer}']);
            }
        });
    },
    assign(options) {
        // 默认行高1.5倍
        let fontSize = +options.fontSize || 32;
        let lineHeight = +options.lineHeight || (fontSize * 1.5);
        let color = options.color || '#333333';

        // 动画（毫秒）
        let delay = +options.delay || 400,
            duration = +options.duration || 400;

        // 单个数字延迟多久开始动画，支持负数
        let numberDelay = +options.numberDelay || 0;

        let num = options.num || 0;
        let reg = /^[0-9]*$/, count = -1;

        let arr = (num + '').split('').map(i => {
            let isNumber = reg.test(i), inum = 0;
            if (isNumber) {
                count++;
                inum = Math.abs(count * numberDelay);
            }

            return {
                isNumber,
                numberDelay: inum,
                num: isNumber ? (+i) : i,
            };
        });

        if (numberDelay < 0) {
            let nds = 0 - count * numberDelay
            delay = delay - nds;
            arr.forEach(item => {
                if (item.isNumber) {
                    item.numberDelay = nds - item.numberDelay;
                }
            })
        }
        if (delay < 0) {
            delay = 0;
        }

        this.set({
            color,
            fontSize,
            lineHeight,
            arr,
            delay,
            duration
        });
    },

    async render() {
        let that = this;
        if (that.get('firstRender')) {
            // 非首次渲染，节点已存在，直接动画
            that.show({
                aimBase: 50 // 保证动画始终从下往上
            });
        } else {
            // 首次：先渲染初始化数字
            await that.digest();

            // 再开始动画
            that.show({
                aimBase: 0,
                firstRender: true
            })
        }
    },

    show(d) {
        let that = this;
        let { delay } = that.get();

        if (that['@{delay.show.timer}']) {
            clearTimeout(that['@{delay.show.timer}']);
        }
        that['@{delay.show.timer}'] = setTimeout(async () => {
            await that.digest({
                ...d,
                aim: true
            });

            if (!that.get('init')) {
                that.set({ init: true });

                // 动画结束移除标记
                let clearAnim = () => {
                    that.digest({
                        aimBase: 0,
                        aim: false,
                    })
                }

                // todo！！！改成attach的批量api
                let nodes = that.root.querySelectorAll('[data-number]');
                if (nodes && nodes.length) {
                    for (let i = 0; i < nodes.length; i++) {
                        Magix5.attach(nodes[i], 'transitionend', clearAnim);
                        that.on('destroy', () => {
                            Magix5.detach(nodes[i], 'transitionend', clearAnim);
                        });
                    }
                }
            }
        }, delay)
    }
});

