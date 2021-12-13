import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:branch.html',
    assign(options) {
        let { data, closeMap, highlightMap = {}, valueKey } = options;
        data.children.forEach(item => {
            let val = item[valueKey];
            item.close = closeMap[val];
            item.highlight = highlightMap[val];
        })

        this.set(options);
    },
    render() {
        let that = this;
        that.digest();

        // 部分选中态
        // let { data } = that.get();
        // data.children.forEach((item, index) => {
        //     let node = document.getElementById(`cb_${that.id}_${index}`);
        //     if (item.highlight) {
        //         // 滚动到可视范围之内
        //         if (node[0].scrollIntoViewIfNeeded) {
        //             node[0].scrollIntoViewIfNeeded();
        //         } else if (node[0].scrollIntoView) {
        //             node[0].scrollIntoView();
        //         }
        //     }
        // })
    },

    '@:{check.parent.state}'() {
        let that = this;
        let { data, indeterminateState, checkedState, uncheckedState } = that.get();
        let parent = this.owner.parent();
        if (parent) {
            let hasChecked = false,
                hasUnchecked = false;
            data.children.forEach(item => {
                if (item.state == indeterminateState) {
                    hasChecked = hasUnchecked = true;
                } else if (item.state == checkedState) {
                    hasChecked = true;
                } else {
                    hasUnchecked = true;
                }
            })

            // 更新父view数据状态
            let state = (hasChecked && hasUnchecked) ? indeterminateState : (hasChecked ? checkedState : uncheckedState);
            data.state = state;
            that.digest({
                data
            })
            parent.invoke('@:{check.parent.state}');
        }
    },

    '@:{check}<change>'(e) {
        let that = this;
        let index = e.params.index,
            selected = e.target.checked;

        let { data, checkedState, uncheckedState } = that.get();
        data.children.forEach((item, i) => {
            if (index == i) {
                let _loop = (c) => {
                    if (c.children && c.children.length) {
                        c.children.forEach(cc => {
                            _loop(cc);
                        })
                    }

                    c.state = selected ? checkedState : uncheckedState;
                }
                _loop(item);
            }
        });
        that.digest({
            data
        })
        that['@:{check.parent.state}']();
    },

    /**
     * 展开收起
     */
    '@:{toggle}<click>'(e) {
        e.stopPropagation();
        let index = e.params.index;
        let { data, closeMap, valueKey } = this.get();
        let item = data.children[index]
        let close = !(item.close + '' === 'true');
        data.children[index].close = close;
        closeMap[data.children[index][valueKey]] = close;

        this.digest({
            data,
            closeMap
        })
    }
});