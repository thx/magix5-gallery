/**
 * 涉及规范 https://aone.alibaba-inc.com/req/33590073
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');
let { node, dispatch } = Magix5;
export default View.extend({
    tmpl: '@:index.html',
    assign(options) {
        let type = options.type || 'text';
        let displayType = ({
            text: 'text', // 文本输入
            search: 'text', // 搜索框
            password: 'password', // 密码输入
        })[type] || 'text';

        let prefix = options.prefix,
            suffix = options.suffix;

        // 校验相关
        // 最大字符长度
        let maxlength = +options.maxlength || 0;

        // value
        let value = options.value || '';

        this.set({
            displayType,
            type,
            value,
            placeholder: options.placeholder || '',
            autocomplete: options.autocomplete || 'off',
            small: (options.small + '' === 'true'), // 小号
            showDelete: (options.showDelete + '' === 'true'), // 一键清除按钮
            prefix,
            suffix,
        });
    },

    render() {
        this.digest();
    },

    /**
     * 清空输入内容
     */
    async '@:{clear}<click>'(e) {
        e.stopPropagation();
        this['@:{fire}']('');
    },

    '@:{fire}<keyup,change,focusout>'(e) {
        e.stopPropagation();

        let n = node<HTMLInputElement>(`${this.id}_input`);
        let value = n.value
        this['@:{fire}'](value);
    },

    /**
    * 双向绑定处理，对外只透出change
    */
    '@:{fire}'(value) {
        let oldValue = this.get('value');

        let d = {
            value
        };
        this.digest(d);
        if (value != oldValue) {
            dispatch(this.root, 'change', d);
        }
    }
});
