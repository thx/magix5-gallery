/**
 * 分页组件
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@index.html',
    assign(options) {
        let that = this;

        // 展示类型
        //    square 方形
        //    circle 圆形
        let mode = options.mode, allowModeMap = { square: true, circle: true };
        if (!allowModeMap[mode]) {
            mode = '@:./path.css:--name';
            mode = that['@{get.css.var}']('--mx-pagination-mode', 'square');
        }

        // 可选翻页数
        let sizes = options.sizes || [];
        if (!sizes || !sizes.length) {
            sizes = [10, 20, 30, 40];
        }

        // 当前第几页
        // 优先级page > offset
        let page,
            size = +options.size || 40,
            offset = +options.offset;
        if (options.page) {
            page = options.page;
        } else if (offset) {
            page = parseInt(offset / size + '') + 1;
        } else {
            page = 1;
        }

        that.set({
            mode,
            hideTotal: options.hideTotal + '' === 'true',  // 默认false
            jump: (options.jump + '') !== 'false', // 是否有快捷跳转，默认true
            simplify: (options.simplify + '') === 'true', // 默认false
            mini: (options.mini + '') === 'true', // 顺序翻页，默认false
            total: (options.total | 0) || 0, //总数
            page, // 当前页数，从1开始
            size, // 当前分页数
            sizes, //可选分页数
            sizesChange: (options.sizesChange + '') !== 'false', // 是否可切换分页数，默认true
            step: options.step || 5, //页码过多时，中间显示多少条页码
        });
    },
    render() {
        let that = this;
        let data = that.get();
        let total = data.total;
        let page = data.page | 0;
        let pages = Math.ceil((data.total || 1) / data.size);
        if (page > pages) {
            page = pages;
        }

        let step = data.step | 0;
        let middle = step / 2 | 0;
        let start = Math.max(1, page - middle);
        let end = Math.min(pages, start + step - 1);
        start = Math.max(1, end - step + 1);
        let offset;
        if (start <= 2) { //=2 +1  =1  +2
            offset = 3 - start;
            if (end + offset < pages) {
                end += offset;
            }
        }
        if (end + 2 > pages) {
            offset = 2 - (pages - end);
            if ((start - offset) > 1) {
                start -= offset;
            }
        }
        if (start == 3) {
            start -= 1;
        }
        if (end + 2 == pages) {
            end += 1;
        }
        let offsetStart = (page - 1) * data.size + 1;
        let offsetEnd = Math.min(data.total, page * data.size);

        if (total == 0) {
            offsetStart = offsetEnd = 0;
        }

        let texts = {
            "pager.offset": "当前第 {min} - {max} 条，",
            "pager.per.page": "每页显示",
            "pager.total": "共 {total} 条",
            "pager.unit": "条",
            "pager.jump.to": "向第",
            "pager.jump.unit": "页",
        }

        let tipOffset = texts['pager.offset'].replace('{min}', `${offsetStart}`).replace('{max}', `${offsetEnd}`),
            tipTotal = texts['pager.total'].replace('{total}', `${total}`),
            tipPer = texts['pager.per.page'],
            tipUnit = texts['pager.unit'],
            tipJumpTo = texts['pager.jump.to'],
            tipJumpUnit = texts['pager.jump.unit'];

        // 跳转，下一页
        let next = page + 1;
        if (next > pages) {
            next = pages;
        }

        that.digest({
            offsetStart,
            offsetEnd,
            pages,
            page,
            start,
            end,
            next,
            tipOffset,
            tipTotal,
            tipPer,
            tipUnit,
            tipJumpTo,
            tipJumpUnit
        });
    },
    '@:{fire.event}'() {
        this.render();
        // let that = this;
        // let node = $('#' + that.id);
        // let { page, size } = that.get();
        // let offset = (page - 1) * size;
        // node.trigger({
        //     type: 'change',
        //     page,
        //     size,
        //     offset
        // });
    },
    '@:{to.page}<click>'(e) {
        e.preventDefault();
        this.set(e.params);
        this['@:{fire.event}']();
    },
    '@:{change.size}<change>'(e) {
        e.stopPropagation();
        this.set({ size: e.value });
        this['@:{fire.event}']();
    },
    '@:{jump}<click>'(e) {
        e.stopPropagation();
        var i = $(`#${this.id}_jump_input`);
        let page = +(i.val());
        if (!Number.isInteger(page)) {
            return;
        }
        this.set({ page });
        this['@:{fire.event}']();
    },
});

