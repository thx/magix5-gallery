import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:box.less');

// TODO:mode 支持shadow、vertical；

interface Item {
    text: string;
    value: string | number;
    tag?: string;
    color?: string;
    tip?: string;
    tips?: string; // 兼容
    img?: string;
    disabled?: boolean;
}

enum Size {
    SMALL = 'small',
    NORMAL = 'normal', // 默认
    LARGE = 'large',
}

enum Mode {
    SHADOW = 'shadow', // 阴影
    SPLITER = 'spliter', // 分割线,默认
    VERTICAL = 'vertical', // 竖版
}

interface Options {
    list: Item[];
    selected?: any;
    disabled?: boolean;
    textKey?: string; // default:text
    valueKey?: string; // default:value
    mode?: Mode;
    size?: Size;
}

export default View.extend({
    tmpl: '@:box.html',
    assign(options: Options) {
        const data = this.initStateFromOpts(options);
        this.set({
            ...data,
            originOpts: options,
            classesText(item, selected) {
                const { disabled, value } = item;
                const classes = [];
                value == selected && classes.push('active-item');
                classes.push(disabled == true ? 'disabled' : 'enabled');
                return classes.join(' ');
            },
        });
    },

    async render() {
        await this.digest();
    },

    initStateFromOpts(options: Options) {
        const disabled = options.disabled + '' === 'true'; // disabled
        const textKey = options.textKey || 'text';
        const valueKey = options.valueKey || 'value';

        const originList = options.list || [];
        const list = originList.map((item) => {
            return {
                ...item,
                text: item[textKey],
                value: item[valueKey],
                color: item.color || '',
                tip: item.tip || item.tips || '',
                disabled: disabled || item.disabled + '' === 'true',
            };
        });

        const selected = options.selected || (list[0] || {})['value']; // default:first one
        const size = ['normal', 'small', 'large'].includes(options.size)
            ? options.size
            : Size.NORMAL;
        const mode = ['shadow', 'spliter', 'vertical'].includes(options.mode)
            ? options.mode
            : Mode.SPLITER;

        return {
            list,
            selected,
            disabled,
            size,
            mode,
        };
    },

    /* event handler */
    '@:{select}<click>'(e) {
        const { value } = e.params;
        this['@:{fire}'](value);
    },

    '@:{fire}'(value) {
        const { selected: oldSelected, list } = this.get();
        const selectedItem = list.filter((d) => d.value == value)?.[0];
        if (oldSelected == value || !selectedItem) {
            return;
        }

        // digest
        this.digest({
            selected: value,
        });

        // dispatch
        Magix5.dispatch(this.root, 'change', {
            selected: selectedItem.value,
            text: selectedItem.text,
        });
    },
});
