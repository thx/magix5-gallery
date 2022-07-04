/**
 * 盒状分组
 */
import Magix5, { applyStyle, dispatch } from 'magix5';
import View from '../mx-base/view';
applyStyle('@:box.less');

export default View.extend({
    tmpl: '@:box.html',
    assign(options) {
        let disabled = (options.disabled + '' === 'true');

        let textKey = options.textKey || 'text',
            valueKey = options.valueKey || 'value';

        let list = [];
        let originList;
        try {
            originList = (new Function('return ' + options.list))();
        } catch (e) {
            originList = options.list || [];
        }
        if (options.adcList && options.adcList.length > 0) {
            // adc树结构
            // {
            //     code: "对应value",
            //     name: "对应text",
            //     description: "提示信息，对应tip",
            //     properties: {
            //         disabled: "是否禁用",
            //         tag: "打标",
            //         tagColor: "打标颜色",
            //         link: "外链地址",
            //     }
            // }
            list = options.adcList.map(item => {
                return {
                    ...item,
                    value: item.code,
                    text: item.name,
                    tip: item.description,
                    tag: item.properties?.tag,
                    color: item.properties?.tagColor,
                    disabled: item.properties?.disabled + '' === 'true',
                }
            })
        } else {
            list = (originList || []).map((item) => {
                return {
                    ...item,
                    disabled: disabled || (item.disabled + '' === 'true'),
                    tip: item.tips || item.tip || '', // 提示：兼容tips和tip
                    color: item.color || '',
                    text: item[textKey],
                    value: item[valueKey]
                }
            });
        }

        let selected = options.selected || (list[0] || {})['value'];

        // box 类型
        //   spliter 分割线
        //   shadow 阴影效果的
        let mode = options.mode || 'spliter';
        if (['shadow', 'spliter', 'vertical'].indexOf(mode) < 0) {
            mode = 'spliter';
        }

        this.set({
            mode,
            disabled,
            list,
            selected,
        });
    },

    render() {
        this.digest();
    },

    '@:{select}<click>'(e) {
        this['@:{select}'](e.params.item);
    },

    '@:{select}'(item) {
        let that = this;
        let { selected } = that.get();
        if (selected == item.value || item.disabled) {
            return;
        }

        let event = dispatch(this.root, 'change', {
            item: item,
            value: item.value,
            text: item.text,
            selected: item.value
        });
        // if (!event.defaultPrevented) {
        // 支持外部同步校验阻断change，event.preventDefault()
        that.digest({
            selected: item.value,
            hover: item.value,
        })
        // }
    }
});