import Magix5, { Router } from 'magix5';
import View from 'magix5-gallery/view';
Magix5.applyStyle('@:doc.less');

export default View.extend({
    tmpl: '@:doc.html',
    init(options) {
    },
    assign(options) {
        let viewId = this.id;
        let { apis, events, columns, lefts, rights } = this.get();
        let list = [];

        // demo处理  
        // columns：平铺展示的demo
        // lefts, rights：左右分栏的demo
        let demos = {
            text: '使用示例',
            value: viewId + '_demo',
            subs: [],
        }
        if (columns && columns.length) {
            demos.subs.push(...columns.map(d => {
                return Magix5.mix(d, {
                    value: `${viewId}_demo${d.path}`
                })
            }))
        };
        if (lefts && lefts.length && rights && rights.length) {
            // 左右布局的demo两边各一个
            let l = Math.max(lefts.length, rights.length);
            for (let i = 0; i < l; i++) {
                if (lefts[i]) {
                    demos.subs.push(Magix5.mix(lefts[i], {
                        value: `${viewId}_demo${lefts[i].path}`
                    }))
                }
                if (rights[i]) {
                    demos.subs.push(Magix5.mix(rights[i], {
                        value: `${viewId}_demo${rights[i].path}`
                    }))
                }
            }
        }
        list.push(demos);

        // api处理
        if (apis && apis.length) {
            list.push({
                text: 'API',
                value: viewId + '_api',
            })
        }

        // events处理
        if (events && events.length) {
            list.push({
                text: 'Event',
                value: viewId + '_event',
            })
        }

        let { path } = Router.parse();
        this.set({
            list,
            path: `magix5-gallery/views/pages/${path.split('/')[1]}`
        });
    },
    async render() {
        let that = this;
        await that.digest();

        // let { params } = Router.parse();
        // if (!that.$init && params.highlightValue) {
        //     that.digest({ highlightValue: params.highlightValue });
        //     that.$init = 1;
        // }
    },
    '@:{to}<click>'(e) {
        let highlightValue = e.params.highlightValue;

        // 保留参数
        Router.to({ highlightValue });
        this.digest({ highlightValue });

        // 当前demo滚动到顶部
        // let node
        // if (node.scrollIntoViewIfNeeded) {
        //     node.scrollIntoViewIfNeeded();
        // } else if (node.scrollIntoView) {
        //     node.scrollIntoView();
        // }
    },
    '$win<scroll>'(e) {
        let rects = this.root.getBoundingClientRect()
        if (rects.top < 0) {
            if (this.get('fixed')) { return; };
            this.digest({ fixed: true });
        } else {
            if (!this.get('fixed')) { return; };
            this.digest({ fixed: false });
        }
    }
})
