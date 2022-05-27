/**
 * 涉及规范 https://aone.alibaba-inc.com/req/33590073
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    assign(options) {
        // 输入框
        let type = 'text';

        // 字符数，此处仅做样式，不处理校验逻辑，实际校验位mx-form
        let maxlength = +options.maxlength || 0;

        // 输入框的值
        let value = options.value || '';

        // 前缀
        let prefix = options.prefix || '', prefixes = [];
        switch (prefix) {
            case 'search':
            case 'money':
            case 'user':
                prefixes.push(prefix);
                break;

            default:
                if (prefix) {
                    // 自定义提示
                    prefixes.push(prefix);
                };
                break;
        }

        // 后缀
        let suffix = options.suffix || '', suffixes = [];
        switch (suffix) {
            case 'password':
                type = 'password'; // 密码输入框
                suffixes.push(suffix);
                break;

            case 'delete':
                suffixes.push(suffix);
                break;

            default:
                if (suffix) {
                    // 自定义提示
                    suffixes.push(suffix);
                };
                break;
        }

        // 兼容老api small
        let size = options.size || 'normal';
        if (['small', 'normal', 'large'].indexOf(size) < 0) {
            size = 'normal';
        }

        // 搜索类型，默认两个字符位置
        let searchWidth = options.searchWidth || 'calc(var(--mx5-trigger-h-gap, 8px) * 2 + var(--mx5-trigger-arrow-size, 18px) + var(--mx5-trigger-font-size, 12px) * 2 + 2px)';
        let searchList = options.searchList || [];
        let searchValue = (options.searchValue === null || options.searchValue === undefined) ? (searchList[0] ? searchList[0].value : '') : options.searchValue;

        this.set({
            type,
            value,
            placeholder: options.placeholder || '请输入',
            autocomplete: options.autocomplete || 'off',
            maxlength,
            searchWidth,
            searchList,
            searchValue,
            prefixes,
            suffixes,
            size,
        });
    },

    render() {
        this.digest();
    },

    /**
    * 清空输入内容
    */
    '@:{clear}<click>'(e) {
        e.preventDefault();
        e.stopPropagation();

        // 清空选中项
        // input值被动修改时不会触发change
        // 需要手动触发
        this.digest({ value: '' })
        this['@:{fire}']();
    },

    '@:{toggle.password}<click>'(e) {
        e.stopPropagation();
        let { type } = this.get();
        this.digest({
            type: (type == 'password') ? 'text' : 'password',
        })
    },

    '@:{change.search.type}<change>'(e) {
        e.stopPropagation();
        this.digest({ searchValue: e.value });
        this['@:{fire}']();
    },

    /**
     * 双向绑定处理
     * 阻止默认keyup，focusout，统一对外输出change事件
     */
    '@:{fire}<change,keyup,focusout>'(e) {
        if (e.type == 'change') {
            // 同名原生事件不冒泡，避免重复触发
            e.stopPropagation();
        }

        let oldValue = this.get('value');
        let node = Magix5.node<HTMLInputElement>(`${this.id}_input`);
        let value = node.value;
        if (oldValue !== value) {
            this.digest({ value });
            this['@:{fire}']();
        }
    },

    '@:{fire}<click>'(e) {
        e.stopPropagation();

        let node = Magix5.node<HTMLInputElement>(`${this.id}_input`);
        let value = node.value;
        this.digest({ value });
        this['@:{fire}']();
    },

    '@:{fire}'() {
        let { value, searchList, searchValue } = this.get();
        let d = { value };
        if (searchList.length > 0) {
            Magix5.mix(d, { searchValue });
        }
        Magix5.dispatch(this.root, 'change', d);
    }
});
