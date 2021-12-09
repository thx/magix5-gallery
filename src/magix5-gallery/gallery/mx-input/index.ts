/**
 * 涉及规范 https://aone.alibaba-inc.com/req/33590073
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@index.html',
    init(options) {
        this.assign(options);
    },
    assign(options) {
        let type = options.type || 'text';
        if (['text', 'password', 'search'].indexOf(type) < 0) {
            type = 'left';
        }

        // 样式
        let width = options.width || '100%';
        if (width.indexOf('%') < 0 && width.indexOf('px') < 0) {
            width += 'px';
        };
        let textAlign = options.textAlign || 'left';
        if (['left', 'right', 'center'].indexOf(textAlign) < 0) {
            textAlign = 'left';
        }

        // 校验相关
        // 最大字符长度
        let maxlength = +options.maxlength || 0;

        this.set({
            type,
            value: options.value || '',
            placeholder: options.placeholder,
            autocomplete: options.autocomplete,
            width,
            textAlign,
            small: (options.small + '' === 'true'), // 小号
            showDelete: (options.showDelete + '' === 'true'), // 一键清除按钮
        });
    },

    render() {
        this.digest();
        this['@:{fire}<keyup,change,focusout>']();
    },

    /**
     * 清空输入内容
     */
    '@:{clear}<click>'(e) {
        e.preventDefault();
        e.stopPropagation();

        // 清空选中项
        this.digest({
            value: ''
        });

        // input值被动修改时不会触发change
        // 需要手动触发
        // this['@{owner.node}'].val('').trigger({
        //     type: 'change',
        //     value: ''
        // });
        // this['@{owner.node}'].trigger({
        //     type: 'clear',
        //     value: ''
        // });
    },

    /**
     * 双向绑定处理
     */
    '@:{fire}<keyup,change,focusout>'(e) {
        let node = $(`#${this.id}_input`);
        let value = node.val();

        if (e) {
            // 双向绑定事件参数
            e.value = value;
        }

        this.digest({
            value
        })
        // this['@{owner.node}'].val(value);
    }
});
