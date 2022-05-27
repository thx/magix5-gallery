/**
 * 下拉框单选
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:content.html',
    init(options) {
        let that = this;
        that.on('destroy', () => {
            if (that['@:{search.delay.timer}']) {
                clearTimeout(that['@:{search.delay.timer}']);
            }
        })
    },

    assign(options) {
        // 计算选中态
        let { parents, selectedItems } = options;

        let selectedMap = {};
        selectedItems.forEach(item => {
            selectedMap[item.value] = true;
        });

        parents.forEach(parent => {
            parent.disabled = true;
            parent.list.forEach(item => {
                parent.disabled = parent.disabled && item.disabled;
                item.selected = selectedMap[item.value] || false;
            });
        });
        this.set({
            ...options,
            parents,
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
        // 父节点
        let parentNode = this.owner.parent().root;
        let width = parentNode.offsetWidth,
            height = parentNode.offsetHeight,
            offset = this['@:{mx.style.offset}'](parentNode);

        let contentWidth = this.root.offsetWidth,
            contentHeight = this.root.offsetHeight,
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

        this.root.style.top = top + 'px';
        this.root.style.left = left + 'px';
        this.root.classList.add('mx5-output-show');
        this.root.classList.remove('mx5-output-hide');
    },

    /**
     * 单选
     */
    '@:{select}<click>'(e) {
        e.stopPropagation();

        let { item, operationType } = e.params;
        Magix5.dispatch(this.root, 'submit', {
            data: {
                selectedItems: [item],
                operationType,
                operationItem: item,
            }
        });
        this['@:{hide}']();
    },

    /**
    * 单选，移除
    */
    '@:{delete}<click>'(e) {
        e.stopPropagation();

        let { parents } = this.get();
        let deleteItem = e.params.item;
        for (let i = 0; i < parents.length; i++) {
            for (let j = 0; j < parents[i].list.length; j++) {
                if (parents[i].list[j].value == deleteItem.value) {
                    parents[i].list.splice(j, 1);
                    break;
                }
            }
            if (parents[i].list.length == 0) {
                parents.splice(i, 1);
            }
        }

        // 如果删除项为当前选中项，回置到可选项第一个
        let first = false, selectedItem = {};
        parents.forEach(parent => {
            parent.list.forEach(item => {
                if (!item.disabled) {
                    if (deleteItem.selected && !first) {
                        first = true;
                        item.selected = true;
                    }
                    if (item.selected) {
                        selectedItem = item;
                    }
                }
            });
        })

        this.digest({
            parents
        });

        Magix5.dispatch(this.root, 'submit', {
            data: {
                parents,
                selectedItems: [selectedItem],
                operationType: 'delete',
                operationItem: deleteItem,
            }
        });
        this['@:{hide}']();
    },


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
        let { constants } = that.get();

        clearTimeout(that['@:{search.delay.timer}']);
        let val = e.value;
        that.set({ keyword: val });
        that['@:{search.delay.timer}'] = setTimeout(async () => {
            if (val != that['@:{last.value}']) {
                let result = await that['@:{fn.search}'](that['@:{last.value}'] = val);
                that.digest(result);
            }
        }, constants.searchDelay);
    },

    '@:{hide}'() {
        this.root.classList.remove('mx5-output-show');
        this.root.classList.add('mx5-output-hide');
    }
});