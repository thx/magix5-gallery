/**
 * 按钮 https://aone.alibaba-inc.com/req/33589875
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
            type = 'custom';

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
            // white：白色按钮
            let allowedTypes = { primary: true, secondary: true, white: true };
            type = options.type || 'primary';
            if (!allowedTypes[type]) {
                type = 'primary';
            }
        };

        // 外链处理
        let linkHref = options.linkHref,
            linkTarget = options.linkTarget || '_blank';

        this.set({
            disabled,
            disabledTip: options.disabledTip || '',
            disabledWidth: options.disabledWidth || 200,
            disabledPlacement: options.disabledPlacement || 'bc',
            type,
            width: options.width,
            loading,
            small,
            content,
            tagContent,
            tagColor,
            styles: styles.join(';'),
            linkHref,
            linkTarget,
        });
    },

    render() {
        this.digest();
    },

    async  '@:{anim}<click>'(e) {
        let that = this;
        let { disabled, loading, animing } = that.get();
        if (disabled || loading || animing) {
            return;
        }

        // 防止快速点击
        let delayMark = Magix5.mark(this, '@:{delay.show.timer}');
        await Magix5.delay(100);

        // 开始动画
        if (!delayMark()) { return; };
        that.digest({ animing: true });
    },
    /**
     * 动画结束移除标记
     */
    '$[data-animation="btn"]<animationend>'(e) {
        e.stopPropagation();
        this.digest({ animing: false });
    }
});