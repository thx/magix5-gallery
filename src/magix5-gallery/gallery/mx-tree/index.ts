/**
 * 数据处理版
 * 缺点：展开收起无缓动效果
 * 优点：只渲染展开的数据，性能较好
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    init(options) {
        this.set({
            searchDelay: 400,
            uncheckedState: 1, // 全不选
            indeterminateState: 2, // 部分选中 
            checkedState: 3, // 全选
            checkboxAll: 'checkbox_all' + this.id,
            radioAll: 'radio_all' + this.id
        });

        this.on('destroy', () => {
            if (this['@:{search.delay.timer}']) {
                clearTimeout(this['@:{search.delay.timer}']);
            }
        });

        // 保留历史展开收起状态
        this['@:{close.map}'] = {};
    },
    assign(options) {
        let { checkboxAll } = this.get();

        // 显示模式
        // multiple：多选
        // single：单选
        // readonly：只读
        let type = options.type || 'multiple';
        if (['multiple', 'single', 'readonly'].indexOf(type) < 0) {
            type = 'multiple';
        }

        let valueKey = options.valueKey || 'value';
        let textKey = options.textKey || 'text';
        let parentKey = options.parentKey || 'pValue';

        // 是否支持搜索
        let search = (options.search + '') === 'true';

        // 搜索框宽度
        let width = options.width || '100%';
        if (width.indexOf('%') < 0 && width.indexOf('px') < 0) { width += 'px'; };
        // 最大高度
        let height = options.height;

        // 是否可展开收起，默认false
        let needExpand = (options.needExpand + '') === 'true';
        // 展开收起状态，默认false
        let close = (options.close + '') === 'true';

        // 是否有连接线
        let hasLine = (options.hasLine + '') === 'true';

        this['@{origin.list}'] = options.list || [];
        this['@{origin.map}'] = {};
        this['@{origin.list}'].forEach(item => {
            this['@{origin.map}'][item[valueKey]] = item;
        });

        // 组织树状结构
        let info = this['@:{list.to.tree}'](options.list, valueKey, parentKey);
        // 多选模式下：是否需要全选功能，默认关闭
        let needAll = (options.needAll + '') === 'true';
        if (type == 'multiple' && needAll) {
            info.children = JSON.parse(JSON.stringify([{
                [valueKey]: checkboxAll,
                [textKey]: '全选',
                isAll: true,
                children: info.list
            }]))
        } else {
            info.children = info.list;
        }

        // 多选模式下：叶子节点的选中结果
        let valueType = 'bottom';
        let bottomMap = {};
        (options.bottomValues || []).forEach(val => {
            bottomMap[val] = true;
        });
        if (options.hasOwnProperty('realValues')) {
            // 汇总到父节点的选中值，realValues
            // 转成叶子节点选中值
            valueType = 'real';
            bottomMap = {};
            let realValues = (options.realValues || []).map(val => {
                return val + '';
            })
            let _lp1 = (arr, match) => {
                arr.forEach(item => {
                    let val = item[valueKey] + '';
                    if (item.children && item.children.length > 0) {
                        _lp1(item.children, (match || (realValues.indexOf(val) > -1)));
                    } else {
                        // 叶子节点
                        if (match || (realValues.indexOf(val) > -1)) {
                            bottomMap[val] = true;
                        }
                    }
                })
            }
            info.children.forEach(item => {
                let val = item[valueKey] + '';
                let match = (realValues.indexOf(val) > -1);
                if (item.children && item.children.length) {
                    _lp1(item.children, match);
                } else {
                    if (match) {
                        bottomMap[val] = true;
                    }
                }
            })
        }

        // 递归判断每个节点的状态
        let getState = (item) => {
            let allCount = 0,
                selectedCount = 0;
            let _lp2 = (item) => {
                if (item.children && item.children.length) {
                    item.children.forEach(sub => {
                        _lp2(sub);
                    })
                } else {
                    // 叶子节点
                    allCount++;
                    if (bottomMap[item[valueKey]]) {
                        selectedCount++;
                    }
                }
            }
            _lp2(item);

            let { uncheckedState, checkedState, indeterminateState } = this.get();
            let state = uncheckedState;
            if (selectedCount > 0) {
                state = (selectedCount == allCount) ? checkedState : indeterminateState;
            }
            return state;
        }

        // 切换数据时保留历史展开收起状态
        let closeMap = {};
        let _lp3 = (arr) => {
            arr.forEach(item => {
                // 获取当前节点展开状态
                if (item[valueKey] == checkboxAll) {
                    // 全选节点不计入默认收起状态
                    closeMap[item[valueKey]] = false;
                } else {
                    closeMap[item[valueKey]] = close;
                }

                if (type == 'multiple') {
                    // 多选模式下：获取当前节点选中状态
                    item.state = getState(item);
                }

                if (item.children && item.children.length > 0) {
                    _lp3(item.children);
                }
            })
        }
        _lp3(info.children);
        this['@:{close.map}'] = Magix5.mix(closeMap, this['@:{close.map}']);

        this.set({
            type,
            valueType,
            width,
            height,
            search,
            keyword: this['@:{last.value}'] || '',
            hasLine,
            needExpand,
            valueKey,
            textKey,
            parentKey,
            info,
            closeMap: this['@:{close.map}'],
            highlightMap: {},
            radioSelected: options.selected || '', // 单选选中结果
        });
    },

    render() {
        this.digest();
    },

    '@:{change}<change>'(e) {
        e.stopPropagation();
        this['@:{trigger}']();
    },

    /**
     * 双向绑定
     */
    '@:{trigger}'() {
        let { type, info, valueKey, checkedState, checkboxAll, radioAll } = this.get();
        // 只读模式无需绑定数据
        if (type == 'readonly') {
            return;
        }

        let data = {};
        if (type == 'multiple') {
            // 叶子节点
            let bottomValues = [], bottomItems = [];
            let _lp1 = (arr) => {
                arr.forEach(item => {
                    if (item.children && item.children.length) {
                        _lp1(item.children);
                    } else {
                        if (item.state == checkedState) {
                            bottomValues.push(item[valueKey]);
                            bottomItems.push(item);
                        }
                    }
                })
            }
            _lp1(info.children);


            // 汇总到父节点
            let realValues = [], realItems = [];
            let _lp2 = (arr) => {
                arr.forEach(item => {
                    if (item.state == checkedState) {
                        realValues.push(item[valueKey]);
                        realItems.push(item);
                    } else {
                        if (item.children && item.children.length) {
                            _lp2(item.children);
                        }
                    }
                })
            }
            _lp2(info.children);
            if (realValues.length == 1 && realValues[0] == checkboxAll) {
                // 全选功能
                realValues = [], realItems = [];
                info.children[0].children.forEach(item => {
                    realValues.push(item[valueKey]);
                    realItems.push(item);
                })
            }

            Magix5.mix(data, {
                bottomValues,
                bottomItems,
                realValues,
                realItems
            })
        } else if (type == 'single') {
            let radioSelected = document.querySelector(`input[name*="${radioAll}"]:checked`);
            Magix5.mix(data, {
                selected: radioSelected ? radioSelected.getAttribute('value') : ''
            })
        }
        Magix5.dispatch(this.root, 'change', data);
    },

    /**
     * 展开+命中高亮
     */
    '@:{fn.search}'(val) {
        let { textKey, valueKey, parentKey } = this.get();
        let originList = this['@{origin.list}'];
        let originMap = {};
        // 所有都收起
        originList.forEach(item => {
            this['@:{close.map}'][item[valueKey]] = true;
            originMap[item[valueKey]] = item;
        })

        // 搜索命中的匹配值
        this['@{highlight.map}'] = {};

        let list = [];
        let lowVal = (val + '').toLocaleLowerCase();
        for (let i = 0; i < originList.length; i++) {
            let item = originList[i];
            let it = (item[textKey] + '').toLocaleLowerCase();
            if (lowVal && (it.indexOf(lowVal) > -1)) {
                list.push(item);
                this['@{highlight.map}'][item[valueKey]] = true;
            }
        }
        if (list.length > 0) {
            // 命中值的父节点全部展开
            let _lp = (item) => {
                if (item[parentKey]) {
                    this['@:{close.map}'][item[parentKey]] = false;
                    _lp(originMap[item[parentKey]]);
                }
            }
            list.forEach(item => {
                _lp(item);
            })
        }

        this.digest({
            closeMap: this['@:{close.map}'],
            highlightMap: this['@{highlight.map}']
        })
    },

    '@:{search}<keyup>'(e) {
        e.stopPropagation();

        let that = this;
        clearTimeout(that['@:{search.delay.timer}']);
        let val = e.value;
        that.updater.set({ keyword: val });
        that['@:{search.delay.timer}'] = setTimeout(() => {
            if (val != that['@:{last.value}']) {
                that['@:{fn.search}'](that['@:{last.value}'] = val);
            }
        }, that.get('searchDelay'));
    },

    '@:{list.to.tree}': (list, id, pId) => {
        list = list || [];
        let map = {},
            listMap = {},
            rootList = [];
        for (let i = 0, max = list.length; i < max; i++) {
            let one = Magix5.mix({}, list[i]);
            map[one[id]] = one;
            if (listMap[one[id]]) {
                one.children = listMap[one[id]];
            }
            if (Magix5.has(one, pId) && (one[pId] !== '') && (one[pId] !== null) && (one[pId] !== undefined)) {
                if (map[one[pId]]) {
                    let c = map[one[pId]].children || (map[one[pId]].children = []);
                    c.push(one);
                } else {
                    if (!listMap[one[pId]]) listMap[one[pId]] = [one];
                    else listMap[one[pId]].push(one);
                }
            } else {
                rootList.push(one);
            }
        }
        return {
            list: rootList,
            map
        };
    }
});