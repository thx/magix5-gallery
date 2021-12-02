/**
 * 按钮 https://aone.alibaba-inc.com/req/33589875
 * 
 * link：表示链接在正常情况下（即页面刚加载完成时）显示的颜色（a, a:link，一般不设置）
 * visited：表示链接被点击后显示的颜色。
 * hover：表示鼠标悬停时显示的颜色。
 * focus：表示元素获得光标焦点时使用的颜色，主要用于文本框输入文字时使用（鼠标松开时显示的颜色）。
 * active：表示当所指元素处于激活状态（鼠标在元素上按下还没有松开）时所显示的颜色。
 * 
 * 伪类的顺序应为:link — :visited — :hover — :focus - :active
 * 在 CSS 定义中，a:active 必须被置于 a:hover 之后，才是有效的。
 * 在 CSS 定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    init(options) {
        this.on('destroy', () => {
            if (this['@:{anim.timer}']) {
                clearTimeout(this['@:{anim.timer}']);
            }
        });
    },
    assign(options) {
        // 展示内容
        let content = options.content || '';

        // 禁用按钮
        let disabled = (options.disabled + '' === 'true');

        // loading
        let loading = (options.loading + '' === 'true');

        // 小尺寸按钮
        let small = (options.small + '' === 'true');

        // 自定义按钮颜色
        let color = options.color || '';
        let colorHover = options.colorHover || color;
        let colorText = options.colorText || '#ffffff';
        let colorHoverText = options.colorHoverText || colorText;

        // 打标
        let tagContent = options.tagContent || '';
        let tagColor = options.tagColor || '';

        // 优先级，自定义颜色 > 预置颜色
        let styles = [], type;
        if (color) {
            // 自定义按钮颜色
            styles.push(`--mx5-btn-custom-color: ${color}`);
            styles.push(`--mx5-btn-custom-color-text: ${colorText}`);
            styles.push(`--mx5-btn-custom-color-hover: ${colorHover}`);
            styles.push(`--mx5-btn-custom-color-hover-text: ${colorHoverText}`);

            // 扩散动画样式，默认使用文案颜色
            styles.push(`--mx5-animation-expand-color: ${colorText}`);
        } else {
            // primary：品牌色主要按钮
            // secondary：次要按钮
            type = options.type || 'primary';
        }

        this.set({
            disabled,
            disabledTip: options.disabledTip || '',
            disabledWidth: options.disabledWidth || 200,
            disabledPlacement: options.disabledPlacement || 'bottom',
            type,
            width: options.width,
            loading,
            small,
            content,
            tagContent,
            tagColor,
            styles: styles.join(';'),
        });
    },

    render() {
        this.digest();
    },

    '@:{stop}<click>'(e) {
        e.stopPropagation();
    },

    '@:{anim}<click>'(e) {
        let that = this;
        let { disabled, loading, animing } = that.get();
        if (disabled || loading || animing) {
            return;
        }

        // 只记录状态不digest
        // let ms = '@:../mx-style/var.less:--mx5-animation-duration';
        // debugger
        that.digest({ animing: true });
        that['@:{anim.timer}'] = setTimeout(() => {
            that.digest({ animing: false });
        }, 300);
    }
});