import Magix5, { Router } from 'magix5';
import View from 'magix5-gallery/view';
Magix5.applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:index.html',
    assign(options) {
        let { apisList, apis, events, methods, columns, lefts, rights } = this.get();
        let list = [];

        // demo处理  
        // columns：平铺展示的demo
        // lefts, rights：左右分栏的demo
        let demos = {
            text: '使用示例',
            value: 'demo',
            subs: [],
        }
        if (columns && columns.length) {
            demos.subs.push(...columns.map(d => {
                return Magix5.mix(d, {
                    value: `demo${d.path}`
                })
            }))
        };
        if ((lefts && lefts.length) || (rights && rights.length)) {
            // 左右布局的demo两边各一个
            let l = Math.max(lefts.length, rights.length);
            for (let i = 0; i < l; i++) {
                if (lefts[i]) {
                    demos.subs.push(Magix5.mix(lefts[i], {
                        value: `demo${lefts[i].path}`
                    }))
                }
                if (rights[i]) {
                    demos.subs.push(Magix5.mix(rights[i], {
                        value: `demo${rights[i].path}`
                    }))
                }
            }
        }
        list.push(demos);

        // api处理
        if (apisList && apisList.length) {
            apisList.forEach((a, i) => {
                Magix5.mix(a, {
                    value: `api${i}`,
                })
                list.push({
                    text: a.text,
                    value: `api${i}`,
                })
            })
        } else if (apis && apis.length) {
            list.push({
                text: 'API',
                value: 'api',
            })
        }

        // events处理
        if (events && events.length) {
            list.push({
                text: 'Event',
                value: 'event',
            })
        }

        // methods事件处理
        if (methods && methods.length) {
            list.push({
                text: 'Method',
                value: 'method',
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
        let { params } = Router.parse();

        that.digest({
            highlightValue: params.highlightValue
        });
    },
})
