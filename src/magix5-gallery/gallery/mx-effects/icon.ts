/**
 * 打标组件
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:icon.less');

export default View.extend({
    tmpl: '@:icon.html',
    assign(options, context) {
        // 优先级自定义色值color > 预置类型type
        let color = options.color,
            colorText,
            mode = options.mode || this['@:{get.css.var}']('--mx5-tag-mode', 'solid'),
            type = options.type || 'common';

        if (!color) {
            // 未自定义颜色的时候
            switch (type) {
                case 'common':
                    switch (mode) {
                        case 'solid': // 实心
                            color = '#cccccc';
                            colorText = '#ffffff';
                            break;

                        case 'hollow': // 空心
                            color = '#cccccc';
                            colorText = '#999999';
                            break;

                        case 'opacity':
                            color = '#666666';
                            break;
                    }
                    break;

                case 'highlight':
                    color = this['@:{get.css.var}']('--mx5-color-brand');
                    break;

                case 'error':
                    color = this['@:{get.css.var}']('--mx5-color-error');
                    break;

                case 'warn':
                    color = this['@:{get.css.var}']('--mx5-color-warn');
                    break;

                case 'pass':
                    color = this['@:{get.css.var}']('--mx5-color-pass');
                    break;
            }
        }

        let styles = [];
        switch (mode) {
            case 'solid': // 实心
                styles.push(
                    `background-color: ${color}`,
                    `border: 1px solid ${color}`,
                    `color: ${(options.colorText || colorText || '#ffffff')}`
                )
                break;

            case 'hollow': // 空心
                styles.push(
                    `background-color: transparent`,
                    `border: 1px solid ${color}`,
                    `color: ${(options.colorText || colorText || color)}`
                )
                break;

            case 'opacity':
                let result = this['@:{color.to.rgb}'](color);
                styles.push(
                    `background-color: rgba(${result.r}, ${result.g}, ${result.b}, 0.1)`,
                    `border: 0 none`,
                    `color: ${(options.colorText || colorText || color)}`
                )
                break;
        }
        this.set({
            content: options.content,
            styles: styles.join(';'),
            tipWidth: options.tipWidth || 200,
            tipPlacement: options.tipPlacement || 'bottom',
            tipAlign: options.tipAlign || 'center',
            tipView: options.tipView,
            tipData: options.tipData || {},
            tip: options.tip || ''
        })
    },
    render() {
        this.digest();

        // try {
        //     // 防止动态加载的异常
        //     // 处理scale之后的空白
        //     let tag = document.querySelector(`#${this.id} .mx-tag`);
        //     let tagName = document.querySelector(`#${this.id} .mx-tag-name`);
        //     let boundClient = tagName.getBoundingClientRect();
        //     let boundClientWidth = boundClient.width;
        //     if (boundClientWidth == 0) {
        //         // 隐藏的时候，宽度为0
        //         let cloneTag = $(`#${this.id}`).clone();
        //         cloneTag.css({
        //             position: 'absolute',
        //             visibility: 'hidden',
        //             opacity: 0,
        //             display: 'block'
        //         })
        //         $(document.body).append(cloneTag);
        //         let cloneTagName = cloneTag.find('.mx-tag-name')[0];
        //         let cloneBoundClient = cloneTagName.getBoundingClientRect();
        //         boundClientWidth = cloneBoundClient.width;
        //         cloneTag.remove();
        //     }
        //     if (boundClientWidth > 0) {
        //         tag.style.width = Math.floor(boundClientWidth + 10) + 'px';
        //     }
        // } catch (error) {

        // }
    }
});
