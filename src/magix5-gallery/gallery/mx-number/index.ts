/**
 * 数字动画
 * 数据始终从下往上滚动 https://aone.alibaba-inc.com/req/33862458
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    assign(options) {
        if (this.get('animing')) {
            // 上次动画未结束
            return false;
        }

        let num = (options.num || 0) + '';

        // 原始小数位数
        let tail = num.indexOf('.');
        if (tail < 0) {
            tail = 0;
        } else {
            tail = num.slice(tail + 1).length;
        }

        // 格式化
        let format = options.format + '' !== 'false',
            precision = options.precision || tail;
        if (format) {
            num = this['@:{format.number}'](num, precision);
        }

        // 是否需要动画
        let animation = options.animation + '' === 'true',
            animationInfo = {};
        if (animation) {
            let fontSize = +options.fontSize || 32;
            let lineHeight = +options.lineHeight || 48;
            let color = options.color || 'var(--mx5-font-color)';

            // 动画（毫秒）正数 
            // delay 整体延迟多少毫秒开始
            // numberDelay 单个数字延迟多少毫秒开始
            // duration 单个动画时长
            let delay = Math.abs(+options.delay || 400),
                duration = Math.abs(+options.duration || 400),
                numberDelay = Math.abs(+options.numberDelay || 0);


            let reg = /^[0-9]*$/, count = -1;

            // 整体动画完成时间
            let allDuration = duration;
            let arr = num.split('').map((n, i) => {
                let isNumber = reg.test(n), inum = 0;
                if (isNumber) {
                    count++;
                    inum = Math.abs(count * numberDelay);
                    allDuration = duration + inum;
                }

                return {
                    isNumber,
                    numberDelay: inum,
                    num: isNumber ? (+n) : n,
                };
            });

            Magix5.mix(animationInfo, {
                color,
                fontSize,
                lineHeight,
                arr,
                delay,
                duration,
                allDuration
            })
        }

        this.set({
            num,
            animation,
            animationInfo,
        });
    },

    async render() {
        let that = this;
        let { animation, animationInfo } = this.get();
        if (animation) {
            if (!that.get('rendered')) {
                // 首次渲染数字，从0开始
                await that.digest();
            }

            let delayMark = Magix5.mark(this, '@:{delay.show.timer}');
            await Magix5.delay(animationInfo.delay);

            // 开始动画
            if (!delayMark()) { return; };
            await that.digest({
                rendered: true,
                animing: true,
                animBase: that.get('rendered') ? 50 : 0,
            });

            // 等待动画结束之后更新初始位置，保证动画都是从上往下
            // 关于为啥不监听$root<transitionend>：
            // 数值变化时，存在新数字line，新增的数字line会直接显示无动画，导致root<transitionend>的最终结束无法确认是哪个
            await Magix5.delay(animationInfo.allDuration);
            if (!delayMark()) { return; }
            that.digest({
                animBase: 0,
                animing: false,
            })
        } else {
            that.digest();
        }
    },
});

