import Magix5, { Router } from 'magix5';
import View from 'magix5-gallery/view';
Magix5.applyStyle('@:doc.less');

export default View.extend({
    tmpl: '@:doc.html',
    init(options) {
        this.assign(options);
    },
    assign(options) {
        let viewId = this.id;
        let { apis, columns, lefts, rights } = this.get();
        let list = [];

        // demo处理
        let demos = {
            text: '使用示例',
            value: viewId + '_demo',
            subs: [],
        }
        if (columns && columns.length) {
            demos.subs.push(...columns.map(d => {
                Magix5.mix(d, {
                    highlightId: `${viewId}_demo${d.value}`
                })
                return {
                    text: d.text,
                    value: d.highlightId,
                }
            }))
        };
        if (lefts && lefts.length && rights && rights.length) {
            // 左右布局的demo两边各一个
            let l = Math.max(lefts.length, rights.length);
            for (let i = 0; i < l; i++) {
                if (lefts[i]) {
                    Magix5.mix(lefts[i], {
                        highlightId: `${viewId}_demo${lefts[i].value}`
                    })
                    demos.subs.push({
                        text: lefts[i].text,
                        value: lefts[i].highlightId
                    })
                }
                if (rights[i]) {
                    Magix5.mix(rights[i], {
                        highlightId: `${viewId}_demo${rights[i].value}`
                    })
                    demos.subs.push({
                        text: rights[i].text,
                        value: rights[i].highlightId
                    })
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
        // if (!that.$init && params.highlightId) {
        //     that.digest({ highlightId: params.highlightId });
        //     that.$init = 1;
        // }
    },
    '@:{to}<click>'(e) {
        let highlightId = e.params.key;

        // 保留参数
        Router.to({ highlightId });
        this.digest({ highlightId });

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
