/**
 * 下拉框追加到body
 * 支持多选 or 单选
 */
import Magix5, { applyStyle, node, inside, attach, detach, toMap, mix, dispatch } from 'magix5';
import View from '../mx-base/view';
applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    init() {
        let that = this;
        that.set({
            popId: `dropdown_${that.id}`,
        })

        that.on('destroy', () => {
            // 展开收起定时
            that['@:{clear.timers}']();

            // 动画
            if (that['@:{anim.timer}']) {
                clearTimeout(that['@:{anim.timer}']);
            }
        });
    },
    assign(options) {
        // 多选还是单选
        let multiple = (options.multiple + '' === 'true'),
            needAll = (options.needAll + '' !== 'false'),
            needGroup = (options.needGroup + '' === 'true');

        let textKey = options.textKey || 'text',
            valueKey = options.valueKey || 'value',
            parentKey = options.parentKey || 'pValue';
        let list = JSON.parse(JSON.stringify(options.list || [])),
            originList = options.list || [];
        if (typeof list[0] === 'object') {
            // 本身是个对象
            // 存在分组的情况
            list = list.map(item => {
                return {
                    ...item,
                    text: item[textKey],
                    value: item[valueKey],
                    pValue: item[parentKey],
                }
            })
        } else {
            // 直接value列表（无分组）
            list = list.map(value => {
                return {
                    text: value,
                    value: value
                };
            })
        };

        // 多选上下限范围
        let min = +options.min || 0,
            max = +options.max || 0;
        if ((max > 0) && (min > max)) {
            min = max;
        }
        // 多选是否要求连续选择
        let continuous = (options.continuous + '' === 'true');

        // 单选：如果有空提示文案，默认补上一个选项
        if (!multiple && options.emptyText) {
            list.unshift({
                text: options.emptyText,
                value: ''
            })
        }

        let hasGroups = false,
            parents = JSON.parse(JSON.stringify(options.parents || []));
        if (parents.length == 0) {
            // 包装成一个组，不显示组信息
            hasGroups = false;
            parents = [{ list }];
        } else {
            let groupMap = {};
            list.forEach(item => {
                let pValue = item.pValue || '';
                groupMap[pValue] = groupMap[pValue] || [];
                groupMap[pValue].push(item);
            })
            for (let i = 0; i < parents.length; i++) {
                let p = parents[i];
                p.list = groupMap[p.value] || [];
                delete groupMap[p.value];
                if (p.list.length == 0) {
                    parents.splice(i--, 1);
                }
            }
            hasGroups = (parents.length > 0);

            // 无匹配分组的，插入最前方，保留原始顺序
            let remainList = [];
            list.forEach(item => {
                if (groupMap[item.pValue]) {
                    remainList.push(item);
                }
            });
            if (remainList.length > 0) {
                parents.unshift({
                    list: remainList
                })
            }
        }

        // 已选中数据 数组 or 字符串
        let selected = [], bakType = '';
        if (Array.isArray(options.selected)) {
            // 数组，保留初始数据状态，双向绑定原样返回
            bakType = 'array';
            selected = options.selected;
        } else {
            // 字符串
            selected = (options.selected === undefined || options.selected === null) ? [] : (options.selected + '').split(',');
        }

        let map = toMap(list, 'value');
        let selectedItems = [];
        selected.forEach(value => {
            //未提供选项，或提供的选项不在列表里
            if (map[value]) {
                selectedItems.push(map[value]);
            }
        });

        if (!multiple && (selectedItems.length == 0)) {
            // 单选默认选中可选第一个
            for (let i = 0; i < list.length; i++) {
                if (!list[i].disabled) {
                    selectedItems = [list[i]];
                    break;
                }
            }
        }

        // 多选：数据量超过20个，默认一行显示4个，若手动指定over=false，一行一个
        let over = (multiple && originList.length > 20 && options.over + '' !== 'false');

        // 多选显示模式，text文案，tag可操作标签
        let mode = options.mode || 'text';

        // 禁用
        let disabled = (options.disabled + '' === 'true');

        // trigger方式，click，hover，默认click
        let triggerType = options.triggerType || 'click';

        this.set({
            init: false, // 入参改动是重置trigger样式
            triggerType,
            bakType,
            disabled,
            mode,
            tip: options.tip,
            name: options.name || '', // 前缀
            over,
            multiple,
            needAll,
            needGroup, // 分组全选功能
            min,
            max,
            continuous,
            emptyText: options.emptyText || '请选择', // 空状态文案
            searchbox: (options.searchbox + '') === 'true',
            hasGroups,
            parents,
            originList,
            originSelectedValues: selected,
            selectedItems,
            height: (options.height || 280),
            submitChecker: options.submitChecker, // 提交前自定义校验函数
        });
    },
    render() {
        this.digest();

        // 判断初始化的selected是否改动了
        let { originSelectedValues, selectedItems, originList, expand } = this.get();
        let values = [];
        selectedItems.forEach(item => { values.push(item.value + ''); });
        originSelectedValues = originSelectedValues.map(v => v + '');
        let fire = (originList.length > 0) && (originSelectedValues.sort().join(',') !== values.sort().join(','));
        this['@:{val}'](fire);
        if (fire) {
            // 为0时不trigger
            console.warn(`${this.owner.pId}：dropdown默认选中第一个，初始值和selected不一致，请自查！！！`);
        }

        if (expand) {
            // 展开的情况下外部digest，再次刷新下下拉列表，防止此时数据更新
            this['@:{show}'](true);
        }
    },

    '@:{val}'(fire) {
        let { selectedItems, operationType, operationItem, emptyText, bakType } = this.get();
        let texts = [], values = [];
        selectedItems.forEach(item => {
            item.error = false;
            texts.push(item.text);
            values.push(item.value);
        })

        this.digest({
            selectedText: texts.join(',') || emptyText
        })

        let val;
        if (bakType == 'array') {
            // 初始化为数组
            val = values;
        } else {
            // 初始化为字符串
            val = values.join(',');
        }

        // this.root.value = val;
        if (fire) {
            let d = {
                selected: val,
                values,
                texts,
                value: values.join(','),
                text: texts.join(','),
            }
            if (operationType && operationItem) {
                mix(d, {
                    operationType,
                    operationItem,
                })
            }

            dispatch(this.root, 'change', d);
        }
    },

    '@:{init}'() {
        let that = this;
        let { popId, triggerType, over } = that.get();
        let popNode;
        if (!node(popId)) {
            popNode = document.createElement('div');
            popNode.id = popId;
            document.body.appendChild(popNode);

            let watchOver = e => {
                if (inside(e.relatedTarget, e.eventTarget)) {
                    that['@:{clear.timers}']();
                }
            }
            let watchOut = e => {
                if (inside(e.relatedTarget, e.eventTarget)) {
                    that['@:{hide}']();
                }
            }
            if (triggerType == 'hover') {
                attach(popNode, 'pointerover', watchOver);
                attach(popNode, 'pointerout', watchOut);
            }

            let watchSubmit = e => {
                // 下拉框选中值
                that.set({ ...e.data, show: false });
                that['@:{val}'](true);
            }
            let watchCancel = e => {
                // 关闭下拉框
                that.digest({ show: false });
            }
            attach(popNode, 'submit', watchSubmit);
            attach(popNode, 'cancel', watchCancel);

            that.on('destroy', () => {
                detach(popNode, 'pointerover', watchOver);
                detach(popNode, 'pointerout', watchOut);
                detach(popNode, 'submit', watchSubmit);
                detach(popNode, 'cancel', watchCancel);

                // 移除节点
                that.owner.unmount(popNode);
                popNode.remove();
            });
        } else {
            popNode = node<HTMLElement>(popId);
        }

        // 多选大尺寸展现样式上稍有差异
        let triggerWidth = this.root.clientWidth;
        let minWidth = over ? Math.max(triggerWidth, 600) : triggerWidth;
        let maxWidth = over ? minWidth : Math.max(minWidth * 2.5, 180);
        popNode.className = 'mx5-output';
        popNode.setAttribute('style', `min-width: ${minWidth}px; max-width: ${maxWidth}px;`);
    },

    '@:{show}'(force) {
        let that = this;
        let { constants } = that.get();

        that['@:{clear.timers}']();
        that['@:{dealy.show.timer}'] = setTimeout(() => {
            // 初始化
            if (!that.get('init')) {
                that.set({
                    init: true
                });
                that['@:{init}']();
            }

            if (that.get('show') && !force) {
                return;
            };

            // trigger样式更新
            that.digest({
                show: true
            });

            // 每次展开重新渲染内容
            let data = this.get();
            let popNode = node<HTMLElement>(data.popId);
            if (data.multiple) {
                // 多选
            } else {
                // 单选
                that['@:{pop.vframe}'] = that.owner.mount(popNode, '@:./content', data);
            }
        }, constants.showDelay);
    },

    '@:{hide}'() {
        let that = this;
        let { constants } = that.get();

        that['@:{clear.timers}']();
        that['@:{dealy.hide.timer}'] = setTimeout(() => {
            if (!that.get('show')) {
                return;
            }

            // trigger样式更新
            that.digest({
                show: false
            });

            // 内容隐藏
            let vf = that['@:{pop.vframe}'];
            if (vf) {
                vf.invoke('@:{hide}');
            }
        }, constants.hideDelay);
    },

    /**
     * triggerType = click
     */
    async '$root<click>'(e) {
        if (this.get('triggerType') == 'click') {
            if (this.get('disabled') || (this.get('animing'))) {
                return;
            };

            // 处理动画
            this.digest({
                animing: true
            });

            // 展开 or 收起
            this[this.get('show') ? '@:{hide}' : '@:{show}']();
        }
    },

    /**
     * triggerType = hover
     */
    '$root<pointerover>'(e) {
        if (inside(e.relatedTarget, e.eventTarget)) {
            if (this.get('triggerType') == 'hover') {
                this['@:{show}']();
            }
        }

    },

    /**
    * triggerType = hover
    */
    '$root<pointerout>'(e) {
        if (inside(e.relatedTarget, e.eventTarget)) {
            if (this.get('triggerType') == 'hover') {
                this['@:{hide}']();
            }
        }
    },

    /**
    * 动画结束移除标记
    */
    '$[data-animation="trigger"]<animationend>'(e) {
        e.stopPropagation();
        this.digest({
            animing: false
        });
    },

    '@:{clear.timers}'() {
        let that = this;
        ['@:{dealy.show.timer}', '@:{dealy.hide.timer}'].forEach(key => {
            if (that[key]) {
                clearTimeout(that[key]);
            }
        });
    },

    '$doc<mousedown,keyup>'(e) {
        let target = e.target;
        if (!inside(target, this.root) && !inside(target, node(this.get('popId')))) {
            this['@:{hide}']();
        }
    },

    '$win<resize>'(e) {
        this['@:{hide}']();
    },
});
