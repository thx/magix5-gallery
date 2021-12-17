import Magix5 from 'magix5';
import View from '../mx-base/view';
let { node, applyStyle, mark } = Magix5;
applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:branch.html',
    assign(options) {
        let { data, closeMap, highlightMap = {}, valueKey } = options;
        for (let c of data.children) {
            let val = c[valueKey];
            c.close = closeMap[val];
            c.highlight = highlightMap[val];
        }
        this.set(options);
        return !data.close;
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

    '@:{update.parent.state}'() {
        let { data,
            indeterminateState,
            checkedState,
            uncheckedState } = this.get();
        let parent = this.owner.parent();
        if (parent) {
            let hasChecked = false,
                hasUnchecked = false;
            for (let c of data.children) {
                if (c.state == indeterminateState) {
                    hasUnchecked = hasChecked = true;
                } else if (c.state == checkedState) {
                    hasChecked = true;
                } else {
                    hasUnchecked = true;
                }
            }
            // 更新父view数据状态
            let state = (hasChecked && hasUnchecked) ? indeterminateState : (hasChecked ? checkedState : uncheckedState);
            data.state = state;
            parent.invoke('@:{update.parent.state}');
        } else {
            this.digest({
                data
            });
        }
    },

    '@:{check}<change>'({ params, target }) {
        let { index } = params,
            selected = target.checked;

        let { data,
            checkedState,
            uncheckedState } = this.get();
        let setState = item => {
            item.state = selected ? checkedState : uncheckedState;
            if (item &&
                item.children) {
                for (let c of item.children) {
                    setState(c);
                }
            }
        };
        setState(data.children[index]);
        this['@:{update.parent.state}']();
    },

    /**
     * 展开收起
     */
    async '@:{toggle}<click>'(e) {
        e.stopPropagation();
        let index = e.params.index;
        let { data, closeMap, valueKey } = this.get();
        let item = data.children[index]
        let close = !(item.close + '' === 'true');
        data.children[index].close = close;
        closeMap[data.children[index][valueKey]] = close;

        // let toggleMark = mark(this, '@:{toggle.mark}');
        // let childrenNode = node<HTMLElement>(`${this.id}_children_${index}`);
        // let contentHeight = childrenNode.scrollHeight;
        // let from = close ? contentHeight : 0;
        // let to = close ? 0 : contentHeight;
        // childrenNode.style.height = from + 'px';
        // await Magix5.delay(0);
        // childrenNode.style.height = to + 'px';
        // await Magix5.delay(2000);
        // if (childrenNode &&
        //     childrenNode.animate) {
        //     let animations = childrenNode.getAnimations();
        //     let ps = [];
        //     for (let a of animations) {
        //         if (a.playState == 'running') {
        //             a.reverse();
        //             ps.push(a.finished);
        //         }
        //     }
        //     if (ps.length) {
        //         await Promise.all(ps);
        //     } else {
        //         let duration = this['@:{get.css.var}']('--mx5-animation-duration', '0.2s');
        //         if (duration.endsWith('ms')) {
        //             duration = parseFloat(duration);
        //         } else if (duration.endsWith('s')) {
        //             duration = 1000 * parseFloat(duration);
        //         }
        //         duration *= 10;
        //         let contentHeight = childrenNode.scrollHeight;
        //         let from = close ? contentHeight : 0;
        //         let to = close ? 0 : contentHeight;

        //         let a = childrenNode.animate([{
        //             height: from + 'px'
        //         }, {
        //             height: to + 'px'
        //         }], {
        //             duration,
        //             fill: 'forwards'
        //         });
        //         await a.finished;
        //     }
        // }
        // if (toggleMark()) {
        //     if (to) {
        //         childrenNode.style.height = 'auto';
        //     }
        this.digest({
            data,
            closeMap
        });
        // if (childrenNode &&
        //     childrenNode.animate) {
        //     let animations = childrenNode.getAnimations();
        //     for (let a of animations) {
        //         a.cancel();
        //     }
        // }
        // }
    }
});