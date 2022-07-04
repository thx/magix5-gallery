/**
 * 底边线tab切换
 */
import Magix5, { applyStyle, dispatch } from 'magix5';
import View from '../mx-base/view';
applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    assign(options) {
        // 整体禁用
        let disabled = (options.disabled + '' === 'true')

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
                    link: item.properties?.link,
                }
            })
        } else {
            list = (originList || []).map((item) => {
                return {
                    ...item,
                    tip: item.tips || item.tip || '', // 提示：兼容tips和tip
                    disabled: disabled || (item.disabled + '' === 'true'),
                    text: item[textKey],
                    value: item[valueKey]
                }
            });
        }

        // 选中值，包含0的情况
        let selected = (options.selected === null || options.selected === undefined) ? (list[0]?.value || '') : options.selected;

        // 展示类型
        //    shrink 底边线收缩
        //    edit 可编辑样式
        let mode = options.mode, allowModeMap = { shrink: true, edit: true };
        if (!allowModeMap[mode]) {
            mode = 'shrink';
        }

        // mode=edit时参数，是否支持编辑，默认true
        let editable = (options.editable + '' !== 'false');

        // pipeline导航特有字段
        let color = options.color || '#FF0036';
        let colorGradient = options.colorGradient || color;

        this.set({
            mode,
            list,
            selected,
            color,
            colorGradient,
            editable,
        });
    },

    render() {
        this.digest();
    },

    // '@{remove}<click>'(e) {
    //     // 阻断@:{select}
    //     e.stopPropagation();
    //     let that = this;
    //     let { selected, list } = that.updater.get();
    //     let index = e.params.index;
    //     let item = list[index];

    //     // 移除当前项
    //     list.splice(index, 1);

    //     if (selected == item.value) {
    //         // 当移除当前选中项时，更新到第一个
    //         that['@:{select}'](list[0]);
    //     } else {
    //         // list更新了，强制change
    //         let item = {};
    //         for (let i = 0; i < list.length; i++) {
    //             if (list[i].value == selected) {
    //                 item = list[i];
    //                 break;
    //             }
    //         }
    //         that['@:{select}'](item, true);
    //     }
    // },

    // '@{add}<click>'(e) {
    //     let { list } = this.updater.get();
    //     this['@{owner.node}'].trigger($.Event('add', {
    //         list,
    //     }));
    // },

    '@:{select}<click>'(e) {
        let item = e.params.item;
        if (item.disabled) {
            return;
        }
        this['@:{select}'](item);
    },

    '@:{select}'(item, force) {
        // 兼容编辑场景list删空
        item = item || {};
        let value = (item.value === null || item.value === undefined) ? '' : item.value;

        let { selected, list } = this.get();
        if (!force && (selected == value)) {
            return;
        }

        let event = dispatch(this.root, 'change', {
            list, // 可编辑状态下，list会变更，此处也返回
            item,
            value,
            text: item.text,
            selected: value,
        });
        // if (!event.defaultPrevented) {
        // 支持外部同步校验阻断change，event.preventDefault()
        this.digest({
            list,
            selected: value,
            hover: value
        })
        // }
    }
});