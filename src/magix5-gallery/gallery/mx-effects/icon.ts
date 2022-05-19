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
            tipWidth: options.tipWidth,
            tipPlacement: options.tipPlacement,
            tipView: options.tipView,
            tipData: options.tipData || {},
            tip: options.tip || ''
        })
    },
    async render() {
        await this.digest();

        try {
            // 处理scale之后的真实宽度
            let tag = document.querySelector(`#${this.id}_tag`);
            let tagName = document.querySelector(`#${this.id}_tag_name`);
            let boundClient = tagName.getBoundingClientRect();
            let boundClientWidth = boundClient.width;
            if (boundClientWidth == 0) {
                // 隐藏的时候，宽度为0
                let cloneTag = document.createElement('span');
                cloneTag.style.cssText = 'position: absolute; visibility: hidden: opacity: 0;'
                cloneTag.className = 'mx5-tag-name';
                cloneTag.innerHTML = this.get('content');
                document.body.append(cloneTag);
                let cloneBoundClient = cloneTag.getBoundingClientRect();
                boundClientWidth = cloneBoundClient.width;
                cloneTag.remove();
            }
            if (boundClientWidth > 0) {
                // padding + border
                tag.style.width = `calc(var(--mx5-tag-h-gap) * 2 + 2px + ${Math.ceil(boundClientWidth)}px)`;
            }
        } catch (error) {

        }
    }
});
