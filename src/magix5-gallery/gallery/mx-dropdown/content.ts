import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:content.less');

export default View.extend({
    tmpl: '@:content.html',
    init(options) {
        let that = this;

        that.set({
            searchDelay: 250
        })

        that.on('destroy', () => {
            if (that['@:{search.delay.timer}']) {
                clearTimeout(that['@:{search.delay.timer}']);
            }
        })
    },
    assign(options) {
        // 计算选中态
        let { selectedItems, contentData } = options;
        let selectedMap = {};
        selectedItems.forEach(item => {
            selectedMap[item.value] = true;
        });
        let count = 0;
        contentData.parents.forEach(parent => {
            let ps = 0;
            parent.count = 0;
            parent.disabled = true;
            parent.list.forEach(item => {
                item.selected = selectedMap[item.value] || false;
                parent.disabled = parent.disabled && item.disabled;
                parent.count++;
                if (item.selected) {
                    ps++;
                }
                count++;
            });
            // 1: 全不选；2：部分选中；3：全选；
            parent.type = (ps > 0 && ps == parent.count) ? 3 : (ps == 0 ? 1 : 2);
        });

        this.set({
            ...contentData,
            count,
            texts: {
                search: '搜索关键词',
                select: '全选',
                unselect: '清空',
                submit: '确定',
                cancel: '取消',
                empty: '无匹配内容'
            }
        })
    },

    async render() {
        let that = this;
        let { keyword } = that.get();
        let result = await that['@:{fn.search}'](that['@:{last.value}'] = keyword);
        await that.digest(result);

        // 每次show时重新定位
        that['@:{set.pos}']();
    },

    '@:{set.pos}'() {
        let node = this.root; // 当前节点
        let parentNode = this.owner.parent().root; // 父节点

        // offsetWeight=content + padding*2 + border*2
        // clientWidth = content + padding*2
        let width = parentNode.offsetWidth,
            height = parentNode.offsetHeight,
            offset = this['@:{mx.style.offset}'](parentNode);
        let contentWidth = node.offsetWidth,
            contentHeight = node.offsetHeight,
            winWidth = window.innerWidth,
            winHeight = window.innerHeight,
            winScrollTop = window.pageYOffset;

        let gap = 10,
            top = offset.top + height,
            left = offset.left;

        // 修正到可视范围之内
        if (top + contentHeight > winHeight + winScrollTop) {
            top = winHeight + winScrollTop - contentHeight - gap;
        }
        if (left + contentWidth > winWidth) {
            let scrollbarWidth = winWidth - document.documentElement.clientWidth;
            left = winWidth - contentWidth - scrollbarWidth;
        }

        node.style.top = top + 'px';
        node.style.left = left + 'px';
        node.classList.remove('mx5-output-hide');
        node.classList.add('mx5-output-show');
    },

    /**
     * 单选
     */
    '@:{select}<click>'(e) {
        Magix5.dispatch(this.root, 'submit', {
            data: {
                selectedItems: [e.params.item]
            }
        });
        this['@:{hide}']();
    },

    /**
     * 多选全选
     */
    // '@:{check.all}<click>'(e) {
    //     let checked = e.params.checked;
    //     let { parents, count, max, selectedItems: oldSelectedItems } = this.get();
    //     let last = max > 0 ? (max - oldSelectedItems.length) : (count - oldSelectedItems.length);

    //     let selectedItems = [];
    //     parents.forEach(parent => {
    //         let ps = 0;
    //         parent.list.forEach(item => {
    //             if (checked) {
    //                 // 选中
    //                 if (!item.disabled) {
    //                     if (!item.selected && last > 0) {
    //                         last--;
    //                         item.selected = true;
    //                     }
    //                     if (item.selected) {
    //                         selectedItems.push(item);
    //                         ps++;
    //                     }
    //                 }
    //             } else {
    //                 // 取消选择
    //                 item.selected = false;
    //             }
    //         });
    //         // 1: 全不选；2：部分选中；3：全选；
    //         parent.type = (ps > 0 && ps == parent.count) ? 3 : (ps == 0 ? 1 : 2);
    //     })
    //     this.digest({
    //         selectedItems,
    //         parents,
    //     })
    // },

    /**
    * 多选分组全选
    */
    // '@:{check.parent}<change>'(e) {
    //     let checked = e.target.checked;
    //     let { parentIndex } = e.params;
    //     let { parents, count, max, selectedItems: oldSelectedItems } = this.get();
    //     let last = max > 0 ? (max - oldSelectedItems.length) : (count - oldSelectedItems.length);
    //     let selectedItems = [];

    //     parents.forEach((parent, pi) => {
    //         if (parentIndex == pi) {
    //             let ps = 0;
    //             parent.list.forEach(item => {
    //                 if (checked) {
    //                     // 选中
    //                     if (!item.disabled) {
    //                         if (!item.selected && last > 0) {
    //                             last--;
    //                             item.selected = true;
    //                         }
    //                         if (item.selected) {
    //                             selectedItems.push(item);
    //                             ps++;
    //                         }
    //                     }
    //                 } else {
    //                     // 取消选择
    //                     item.selected = false;
    //                 }
    //             });
    //             // 1: 全不选；2：部分选中；3：全选；
    //             parent.type = (ps > 0 && ps == parent.count) ? 3 : (ps == 0 ? 1 : 2);
    //         }
    //     })
    //     this.digest({
    //         selectedItems,
    //         parents,
    //     })
    // },

    /**
     * 多选单个
     */
    // '@:{check}<change>'(e) {
    //     let checked = e.target.checked;
    //     let { parentIndex, itemIndex } = e.params;
    //     let { parents } = this.get();
    //     let selectedItems = [];

    //     parents.forEach((parent, pi) => {
    //         let ps = 0;
    //         parent.list.forEach((item, ii) => {
    //             if (parentIndex == pi && itemIndex == ii) {
    //                 item.selected = checked;
    //             }
    //             if (item.selected) {
    //                 selectedItems.push(item);
    //                 ps++;
    //             }
    //         });
    //         // 1: 全不选；2：部分选中；3：全选；
    //         parent.type = (ps > 0 && ps == parent.count) ? 3 : (ps == 0 ? 1 : 2);
    //     })
    //     this.digest({
    //         selectedItems,
    //         parents,
    //     })
    // },

    /**
     * 多选确定
     */
    // '@:{submit}<click>'(e) {
    //     let me = this;
    //     let viewOptions = me.viewOptions;

    //     let { parents, keyword } = me.get();
    //     let selectedItems = [];
    //     let selectedIndexes = [], index = 0; //用于判断选择是否连续
    //     parents.forEach(parent => {
    //         parent.list.forEach(item => {
    //             index += 1;
    //             if (item.selected) {
    //                 selectedItems.push(item);

    //                 let len = selectedIndexes.length;
    //                 if (len == 0) {
    //                     selectedIndexes.push(index);
    //                 } else {
    //                     if (selectedIndexes[len - 1] + 1 == index) {
    //                         selectedIndexes[len - 1] = index;
    //                     } else {
    //                         selectedIndexes.push(index);
    //                     }
    //                 }
    //             }
    //         })
    //     })

    //     let submitFn = () => {
    //         let { min, max, continuous, name } = me.get();
    //         if ((min > 0) && (selectedItems.length < min)) {
    //             me.digest({
    //                 errMsg: `至少选${min}个`
    //             })
    //             return;
    //         }
    //         if ((max > 0) && (selectedItems.length > max)) {
    //             me.digest({
    //                 errMsg: `至多选${max}个`
    //             })
    //             return;
    //         }
    //         if (continuous && (selectedItems.length > 0) && (selectedIndexes.length > 1)) {
    //             // 连续选择
    //             me.digest({
    //                 errMsg: `请选择连续的${name || '数据'}`
    //             })
    //             return;
    //         }

    //         if (viewOptions.submit) {
    //             viewOptions.submit({
    //                 keyword,
    //                 selectedItems
    //             });
    //         }
    //     }
    //     if (viewOptions.data.submitChecker) {
    //         // 支持自定义校验函数
    //         viewOptions.data.submitChecker(selectedItems).then((errMsg) => {
    //             if (!errMsg) {
    //                 submitFn();
    //             } else {
    //                 me.digest({
    //                     errMsg
    //                 })
    //             }
    //         });
    //     } else {
    //         submitFn();
    //     }
    // },

    /**
     * 多选取消
     */
    // '@:{cancel}<click>'(e) {
    //     let viewOptions = this.viewOptions;
    //     if (viewOptions.cancel) {
    //         viewOptions.cancel();
    //     }
    // },

    '@:{fn.search}'(val) {
        let that = this;

        return new Promise(resolve => {
            let { parents } = that.get();
            let allHide;
            if (!val) {
                allHide = false;
                parents.forEach(parent => {
                    parent.hide = false;
                    parent.list.forEach(item => {
                        item.hide = false;
                    })
                })
            } else {
                allHide = true;
                let lowVal = (val + '').toLocaleLowerCase();
                parents.forEach(parent => {
                    let groupHide = true;
                    parent.list.forEach(item => {
                        let text = item.text + '',
                            value = item.value + '';

                        // text的匹配不区分大小写
                        // value区分
                        item.hide = (text.toLocaleLowerCase().indexOf(lowVal) < 0) && (value.indexOf(val) < 0);
                        groupHide = groupHide && item.hide;
                    })
                    parent.hide = groupHide;
                    allHide = allHide && groupHide;
                })
            }

            resolve({
                parents,
                allHide
            });
        })
    },

    '@:{search}<change>'(e) {
        e.stopPropagation();

        let that = this;
        clearTimeout(that['@:{search.delay.timer}']);
        let val = e.value;
        that.set({ keyword: val });
        that['@:{search.delay.timer}'] = setTimeout(async () => {
            if (val != that['@:{last.value}']) {
                let result = await that['@:{fn.search}'](that['@:{last.value}'] = val);
                that.digest(result);
            }
        }, that.get('searchDelay'));
    },

    '@:{hide}'() {
        let node = this.root;
        node.classList.remove('mx5-output-show');
        node.classList.add('mx5-output-hide');
    }
});