/**
 * 单选多选混合选择：https://aone.alibaba-inc.com/req/33785293
 * demo：https://done.alibaba-inc.com/file/lKXtJBCkVypm/QMr2WG4FxSpLd7w4/preview?aid=4B516C1E-F859-4562-B011-124598902CED
 */
import Magix5, { applyStyle, dispatch } from 'magix5';
import View from '../mx-base/view';
applyStyle('@:../mx-tabs/box.less');

export default View.extend({
    tmpl: '@:box.html',
    assign(options) {
        // mode
        // single：单选
        // multiple：多选
        // combine：单选多选混合
        let mode = options.mode || 'single';

        // 整体禁用
        let disabled = (options.disabled + '' === 'true');

        // 已选中数据
        let selectedMap = [];
        if (Object.prototype.toString.apply(options.selected) == '[object Array]') {
            // 数组，保留初始数据状态，双向绑定原样返回
            this['@:{bak.type}'] = 'array';
            options.selected.forEach(v => {
                selectedMap[v] = true;
            })
        } else {
            // 字符串
            ((options.selected === undefined || options.selected === null) ? [] : (options.selected + '').split(',')).map(v => {
                selectedMap[v] = true;
            })
        }

        this['@:{origin.list}'] = JSON.parse(JSON.stringify(options.list || []));
        let textKey = options.textKey || 'text',
            valueKey = options.valueKey || 'value';
        let list = this['@:{origin.list}'].map(item => {
            let v = item[valueKey];
            return {
                ...item,
                multiple: (mode == 'multiple') || (mode == 'combine' && item.multiple + '' === 'true'),
                disabled: disabled || (item.disabled + '' === 'true'),
                tip: item.tips || item.tip || '', // 提示：兼容下tips和tip
                text: item[textKey],
                value: v,
                selected: selectedMap[v],
            }
        });

        if (mode == 'combine') {
            // 混合模式下，单选在前
            let lasts = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].multiple) {
                    lasts = lasts.concat(list.splice(i--, 1));
                }
            }
            list = list.concat(lasts);
        }

        this.set({
            minWidth: options.minWidth ? (options.minWidth + 'px') : 'calc(var(--mx5-font-size) * 8)',
            textKey,
            valueKey,
            disabled,
            mode,
            list,
            selectedMap,
        });
    },

    render() {
        this.digest();
    },

    '@:{select}<click>'(e) {
        let { list, selectedMap: oldSelectedMap, valueKey } = this.get();
        let curItem = e.params.item, selectedMap = {};
        if (curItem.multiple) {
            // 多选，删除所有单选项
            list.forEach(item => {
                if (item.multiple) {
                    if (item.value == curItem.value) {
                        item.selected = !item.selected;
                    };
                    if (item.selected) {
                        selectedMap[item.value] = true;
                    }
                } else {
                    item.selected = false;
                }
            })
        } else {
            // 单选，删除所有多选项
            list.forEach(item => {
                if (item.multiple) {
                    item.selected = false;
                } else {
                    item.selected = (item.value == curItem.value);
                    if (item.selected) {
                        selectedMap[item.value] = true;
                    }
                }
            })
        }
        if (Object.keys(selectedMap).join(',') == Object.keys(oldSelectedMap).join(',')) {
            return;
        }

        let items = [];
        this['@:{origin.list}'].forEach(item => {
            if (selectedMap[item[valueKey]]) {
                items.push(item);
            }
        });

        let values = Object.keys(selectedMap);
        this.digest({ selectedMap });
        dispatch(this.root, 'change', {
            items,
            values,
            selected: (this['@:{bak.type}'] == 'array') ? values : values.join(',')
        });
    },
});
