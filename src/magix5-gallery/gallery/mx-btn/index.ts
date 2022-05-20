/**
 * 按钮 https://done.alibaba-inc.com/file/1vGU0dwwS3oq/cw9MSQQQbWjpMTfZ/preview?m=CANVAS&aid=01F037C2-928C-4BAA-9FE4-771FDC189F2A&pageId=F3EB291F-D9CE-4CED-B1DA-DBA0A79DE7D5
 * 
 * link：表示链接在正常情况下（即页面刚加载完成时）显示的颜色（a, a:link，一般不设置）
 * visited：表示链接被点击后显示的颜色。
 * hover：表示鼠标悬停时显示的颜色。
 * focus：表示元素获得光标焦点时使用的颜色，主要用于文本框输入文字时使用（鼠标松开时显示的颜色）。
 * active：表示当所指元素处于激活状态（鼠标在元素上按下还没有松开）时所显示的颜色。
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    assign(options, context) {
        // 展示内容
        // context: 标签包裹内容
        let content = options.content || context || '';

        // 禁用按钮
        let disabled = (options.disabled + '' === 'true');

        // loading
        let loading = (options.loading + '' === 'true');

        // 按钮尺寸(size)
        let size = options.size || 'normal';
        if (['small', 'normal', 'large'].indexOf(size) < 0) {
            size = 'normal';
        }

        // 自定义按钮颜色
        let color = options.color || '';
        let colorHover = options.colorHover || color;
        let colorText = options.colorText || '#ffffff';
        let colorHoverText = options.colorHoverText || colorText;

        // 打标
        let tagContent = options.tagContent || '';
        let tagColor = options.tagColor || '';

        let styles = [], mode = '';
        let loadingColor = 'var(--mx5-color-brand)',
            loadingColorGradient = 'var(--mx5-color-brand)',
            loadingColorBg = '#DEE1E8';

        // 优先级，自定义颜色 > 预置颜色
        if (color) {
            mode = 'custom';

            // 自定义按钮颜色
            styles.push(`--mx5-btn-custom-color: ${color}`);
            styles.push(`--mx5-btn-custom-color-text: ${colorText}`);
            styles.push(`--mx5-btn-custom-color-hover: ${colorHover}`);
            styles.push(`--mx5-btn-custom-color-hover-text: ${colorHoverText}`);

            // 扩散动画样式，默认使用文案颜色
            styles.push(`--mx5-comp-expand-amin-color: ${colorText}`);

            // loading色值
            let textRgb = this['@:{color.to.rgb}'](colorText);
            loadingColor = colorText;
            loadingColorGradient = colorText;
            loadingColorBg = `rgba(${textRgb.r},${textRgb.g},${textRgb.b},.2)`;
        } else {
            // primary：主要品牌按钮
            // secondary：次要跟随按钮（默认）
            // white：白色
            // hollow：空心按钮
            mode = options.mode;
            switch (mode) {
                case 'primary':
                    loadingColor = '#ffffff';
                    loadingColorGradient = '#ffffff';
                    loadingColorBg = 'rgba(222,225,232,.2)';
                    break;

                case 'hollow':
                    // 空心
                    break;

                case 'white':
                    // 白色
                    break;

                // case 'secondary': 默认
                default:
                    mode = 'secondary';
                    break;
            }
        }

        this.set({
            icon: options.icon ? `<span class="@:index.less:text-icon">${options.icon}</span>` : '',
            loadingColor,
            loadingColorGradient,
            loadingColorBg,
            mode,
            styles: styles.join(';'),
            disabled,
            disabledTip: options.disabledTip || '',
            disabledWidth: options.disabledWidth || 200,
            disabledPlacement: options.disabledPlacement || 'bottom',
            width: options.width,
            loading,
            size,
            content,
            tagContent,
            tagColor,
            linkHref: options.linkHref, // 外链处理
            linkTarget: options.linkTarget || '_blank',
        });
    },

    render() {
        this.digest();
    },

    '@:{anim}<click>'(e) {
        let that = this;
        let { disabled, loading, animing } = that.get();
        if (disabled || loading || animing) {
            return;
        }

        that.digest({
            animing: true
        });
    },
    /**
     * 动画结束移除标记
     */
    '$[data-animation="btn"]<animationend>'(e) {
        e.stopPropagation();
        this.digest({
            animing: false
        });
    }
});