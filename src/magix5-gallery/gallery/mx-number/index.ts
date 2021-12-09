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

        // 记录动画结束的节点
        let numberIndexes = [];
        let arr = (num + '').split('').map((n, i) => {
            let isNumber = reg.test(n), inum = 0;
            if (isNumber) {
                count++;
                inum = Math.abs(count * numberDelay);
                numberIndexes.push(i);
            }

            return {
                isNumber,
                numberDelay: inum,
                num: isNumber ? (+n) : n,
            };
        });

        let transitionendIndex = -1;
        if (numberDelay < 0) {
            let nds = 0 - count * numberDelay
            delay = delay - nds;
            arr.forEach(item => {
                if (item.isNumber) {
                    item.numberDelay = nds - item.numberDelay;
                }
            })

            // 负数第一个最后结束动画
            if (numberIndexes.length > 0) {
                transitionendIndex = numberIndexes[0];
            }
        } else {
            // 正数最后一个最后结束动画
            if (numberIndexes.length > 0) {
                transitionendIndex = numberIndexes[numberIndexes.length - 1];
            }
        }
        if (delay < 0) {
            delay = 0;
        }

        this.set({
            transitionendIndex,
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
        let { delay, transitionendIndex } = that.get();

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

                let node = that.root.querySelector(`[data-index="${transitionendIndex}"]`);
                if (transitionendIndex > -1 && node) {
                    Magix5.attach(node, 'transitionend', clearAnim);
                    that.on('destroy', () => {
                        Magix5.detach(node, 'transitionend', clearAnim);
                    });
                }
            }
        }, delay)
    }
});

