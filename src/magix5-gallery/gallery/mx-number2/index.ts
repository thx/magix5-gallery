/**
 * 数字动画
 * 数据始终从下往上滚动 https://aone.alibaba-inc.com/req/33862458
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
let { applyStyle, mark, delay, mix } = Magix5;
let { abs } = Math;
applyStyle('@:index.less');
let STOPPED = 1;
let RUNNING = 2;

export default View.extend({
    tmpl: '@:index.html',
    init() {
        this['@:{anim.state}'] = STOPPED;
    },
    assign(options) {
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
        // if (format) {
        //     num = this['@:{format.number}'](num, precision);
        // }

        // 是否需要动画
        let animationInfo = {};
        let fontSize = +options.fontSize || 32;
        let lineHeight = +options.lineHeight || 48;
        let color = options.color || 'var(--mx5-font-color)';

        // 动画（毫秒）正数 
        // delay 整体延迟多少毫秒开始
        // numberDelay 单个数字延迟多少毫秒开始
        // duration 单个动画时长
        let delay = abs(+options.delay || 400),
            duration = abs(+options.duration || 400),
            numberDelay = abs(+options.numberDelay || 0);
        let totalDuration = duration;
        let nums = num.split(''),
            count = -1,
            arr = [],
            preArr = this['@:{last.anim.arr}'];
        for (let i = 0; i < nums.length; i++) {
            let n = nums[i];
            let numDelay = 0;
            let startNumber = 0;
            count++;
            if (n == '.') {
                n = '10'
            } else if (n == '-') {
                n = '11';
            }
            numDelay = abs(count * numberDelay);
            totalDuration = duration + numDelay;
            let preInfo = preArr && preArr[i];
            if (preInfo) {
                startNumber = preInfo.num;
            }
            arr.push({
                startNumber,
                numberDelay: numDelay,
                num: +n
            });
        }

        mix(animationInfo, {
            color,
            fontSize,
            lineHeight,
            arr,
            delay,
            duration,
            totalDuration
        });
        this['@:{current.anim.info}'] = animationInfo;
        console.log('dest num', num);
    },

    async render() {
        if (this['@:{anim.state}'] == RUNNING) {
            this['@:{has.next}'] = true;
        } else {
            this['@:{anim.state}'] = RUNNING;
            delete this['@:{has.next}'];
            let delayMark = mark(this, '@:{delay.show.timer}');
            let { totalDuration,
                delay: animDelay,
                lineHeight,
                fontSize,
                color,
                duration,
                arr } = this['@:{current.anim.info}'];
            this['@:{last.anim.arr}'] = arr;
            await delay(animDelay);
            await this.digest({
                lineHeight,
                fontSize,
                color,
                duration,
                arr,
                animing: false,
            });
            await delay(animDelay * 5);
            await this.digest({
                animing: true,
            });
            await delay(totalDuration);
            this['@:{anim.state}'] = STOPPED;
            if (delayMark() &&
                this['@:{has.next}']) {
                this.render();
            }
        }
    }
});

