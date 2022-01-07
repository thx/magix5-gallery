/**
 * 下拉框追加到body
 * 支持多选 or 单选
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';

export default View.extend({
    tmpl: '@:index.html',
    init(options) {
        let that = this;

        that.set({
            popId: `dropdown_${that.id}`,
            showDelay: 100,
            hideDelay: 200,
        })

        that.on('destroy', () => {
            that['@:{clear.timers}']();

            // 动画
            if (that['@:{anim.timer}']) {
                clearTimeout(that['@:{anim.timer}']);
            }
        });
    },
    assign(options) {
        let textKey = options.textKey || 'text',
            valueKey = options.valueKey || 'value',
            parentKey = options.parentKey || 'pValue';
        let list = JSON.parse(JSON.stringify(options.list || []));
        if (typeof list[0] === 'object') {
            // 本身是个对象（支持分组）
            list = list.map(item => {
                return Magix5.mix(item, {
                    text: item[textKey],
                    value: item[valueKey],
                    pValue: item[parentKey]
                });
            })
        } else {
            // 直接value列表（不支持分组）
            list = list.map(value => {
                return {
                    text: value,
                    value: value
                };
            })
        };

        // 可选项数目
        let len = list.length;

        // 多选还是单选
        let multiple = (options.multiple + '' === 'true');

        // 多选情况下是否需要全选，分组全选功能
        let needAll = (options.needAll + '' !== 'false'),
            needGroup = (options.needGroup + '' === 'true');

        // 多选上下限范围
        let min = +options.min || 0,
            max = +options.max || 0;
        if ((max > 0) && (min > max)) { min = max; };

        // 多选是否要求连续选择
        let continuous = (options.continuous + '' === 'true');

        // 单选：如果有空提示文案，默认补上一个value为空的选项
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
                    p.splice(i--, 1);
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
        let selected = [];
        if (Magix5.isArray(options.selected)) {
            // 数组，保留初始数据状态，双向绑定原样返回
            this['@:{bak.type}'] = 'array';
            selected = options.selected;
        } else {
            // 字符串
            selected = (options.selected === undefined || options.selected === null) ? [] : (options.selected + '').split(',');
        }

        // 过滤掉未提供选项，或提供的选项不在列表里
        let map = Magix5.toMap(list, 'value');
        let selectedItems = [];
        selected.forEach(value => {
            if (map[value]) {
                selectedItems.push(map[value]);
            }
        });

        // 单选默认选中可选第一个
        if (!multiple && (selectedItems.length == 0)) {
            for (let i = 0; i < list.length; i++) {
                if (!list[i].disabled) {
                    selectedItems = [list[i]];
                    break;
                }
            }
        }

        // 多选：数据量超过20个，默认一行显示4个，若手动指定over=false，一行一个
        let over = (multiple && len > 20 && (options.over + '' !== 'false'));

        // 是否禁用
        let disabled = (options.disabled + '' === 'true');

        // trigger方式，click，hover，默认click
        let triggerType = options.triggerType || 'click';

        // 其他样式
        let height = options.height ? (options.height + 'px') : 'var(--mx5-trigger-max-height)';

        this.set({
            triggerType,
            len,
            originSelectedValues: selected,
            selectedItems,
            contentData: {
                disabled,
                prefix: options.prefix || '', // 前缀
                emptyText: options.emptyText || '请选择', // 空状态文案
                search: (options.search + '') === 'true',
                over,
                tip: options.tip,
                hasGroups,
                parents,
                multiple,
                needAll,
                needGroup, // 分组全选功能
                min,
                max,
                continuous,
                submitChecker: options.submitChecker, // 提交前自定义校验函数
                height,
            },
        });
    },
    render() {
        this.digest();

        // 判断初始化的selected是否改动了，有可选项时trigger
        let { originSelectedValues, selectedItems, len, show } = this.get();
        let values = selectedItems.map(item => item.value + '');
        originSelectedValues = originSelectedValues.map(v => v + '');
        let fire = (len > 0) && (originSelectedValues.sort().join(',') !== values.sort().join(','));
        this['@:{val}'](fire);
        if (fire) {
            console.warn(`${this.owner.pId}：dropdown默认选中第一个，初始值和selected不一致，请自查！！！`);
        }

        // 展开的情况下外部digest，再次刷新下下拉列表，防止此时数据更新
        if (show) {
            this['@:{show}'](true);
        }
    },

    '@:{val}'(fire) {
        let { selectedItems, contentData } = this.get();
        let texts = [], values = [];
        selectedItems.forEach(item => {
            texts.push(item.text);
            values.push(item.value);
        });
        this.digest({
            selectedText: texts.join(',') || contentData.emptyText
        });

        let val;
        if (this['@:{bak.type}'] == 'array') {
            // 初始化为数组
            val = values;
        } else {
            // 初始化为字符串
            val = values.join(',');
        }

        if (fire) {
            // 组件包装事件则不往root.value写值，统一事件处理
            Magix5.dispatch(this.root, 'change', {
                selected: val,
                values,
                texts,
                value: values.join(','),
                text: texts.join(',')
            });
        }
    },

    '@:{init}'() {
        let that = this;
        let { popId, triggerType, contentData, hideDelay } = that.get();
        let popNode;
        if (!Magix5.node(popId)) {
            let triggerWidth = this.root.clientWidth;

            // 多选大尺寸展现样式上稍有差异
            let minWidth = contentData.over ? Math.max(triggerWidth, 600) : triggerWidth;
            let maxWidth = contentData.over ? minWidth : minWidth * 2;

            popNode = document.createElement('div');
            popNode.id = popId;
            popNode.className = 'mx5-output';
            popNode.setAttribute('style', `min-width: ${minWidth}px; max-width: ${maxWidth}px;`);
            document.body.appendChild(popNode);
        }

        let watchOver = e => {
            if (Magix5.inside(e.relatedTarget, e.eventTarget)) {
                return;
            }
            that['@:{clear.timers}']();
        }
        let watchOut = e => {
            if (Magix5.inside(e.relatedTarget, e.eventTarget)) {
                return;
            }
            that['@:{clear.timers}']();
            that['@:{dealy.hide.timer}'] = setTimeout(() => {
                that['@:{hide}']();
            }, hideDelay);
        }
        if (triggerType == 'hover') {
            Magix5.attach(popNode, 'mouseover', watchOver);
            Magix5.attach(popNode, 'mouseout', watchOut);
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
        Magix5.attach(popNode, 'submit', watchSubmit);
        Magix5.attach(popNode, 'cancel', watchCancel);

        that.on('destroy', () => {
            if (triggerType == 'hover') {
                Magix5.detach(popNode, 'mouseover', watchOver);
                Magix5.detach(popNode, 'mouseout', watchOut);
            }
            Magix5.detach(popNode, 'submit', watchSubmit);
            Magix5.detach(popNode, 'cancel', watchCancel);

            // 移除节点
            that.owner.unmount(popNode);
            popNode.remove();
        });
    },

    '@:{show}'(force) {
        let that = this;

        // 初始化
        if (!that['init.node']) {
            that['init.node'] = true;
            that['@:{init}']();
        }

        if (that.get('show') && !force) { return; };
        that.digest({ show: true });

        // 每次展开重新渲染内容
        let { popId, selectedItems, contentData } = that.get();
        let popNode = Magix5.node(popId);
        that['@:{pop.vframe}'] = that.owner.mount(popNode, '@:./content', {
            selectedItems,
            contentData,
        });
    },

    '@:{hide}'() {
        if (!this.get('show')) { return; }
        this.digest({ show: false });

        // 内容隐藏
        let vf = this['@:{pop.vframe}'];
        if (vf) {
            vf.invoke('@:{hide}');
        }
    },

    /**
     * triggerType = click
     * 点击则立即显示
     */
    async '$root<click>'(e) {
        let that = this;
        let { triggerType } = that.get();
        if (triggerType == 'click') {
            let { contentData, animation } = that.get();
            if (contentData.disabled || (animation == 'expand')) {
                return;
            };

            // 处理动画
            await that.digest({ animation: 'expand' });

            // 展开 or 收起
            that[that.get('show') ? '@:{hide}' : '@:{show}']();
        }
    },

    /**
     * 动画结束移除标记
     */
    '$[data-animation="trigger"]<animationend>'(e) {
        this.digest({ animation: null });
    },

    /**
     * triggerType = hover
     * hover显示加延迟
     */
    '$root<mouseover>'(e) {
        if (Magix5.inside(e.relatedTarget, e.eventTarget)) {
            return;
        }

        let that = this;
        let { triggerType, showDelay } = this.get();
        if (triggerType == 'hover') {
            that['@:{clear.timers}']();
            that['@:{dealy.show.timer}'] = setTimeout(() => {
                that['@:{show}']();
            }, showDelay);
        }
    },

    /**
    * triggerType = hover
    */
    '$root<mouseout>'(e) {
        if (Magix5.inside(e.relatedTarget, e.eventTarget)) {
            return;
        }

        let that = this;
        let { triggerType, hideDelay } = that.get();
        if (triggerType == 'hover') {
            that['@:{clear.timers}']();
            that['@:{dealy.hide.timer}'] = setTimeout(() => {
                that['@:{hide}']();
            }, hideDelay);
        }
    },

    '@:{clear.timers}'() {
        let that = this;
        ['@:{dealy.show.timer}', '@:{dealy.hide.timer}'].forEach(timerKey => {
            if (that[timerKey]) {
                clearTimeout(that[timerKey]);
            }
        });
    },

    '$doc<mousedown,keyup>'(e) {
        let node = e.target;
        let { popId } = this.get();
        let inside = Magix5.inside(node, this.root) || Magix5.inside(node, Magix5.node(popId));
        if (!inside) {
            this['@:{hide}']();
        }
    },

    '$win<resize>'(e) {
        this['@:{hide}']();
    },
});
