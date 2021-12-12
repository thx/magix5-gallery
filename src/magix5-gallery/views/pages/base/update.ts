import Magix5 from 'magix5';
import View from 'magix5-gallery/view';
Magix5.applyStyle('@:update.less');

export default View.extend({
    tmpl: '@:update.html',
    init() {
        let list = [{
            version: '0.0.2',
            time: '2021-11-24',
            subs: [{
                type: 'add',
                subs: [{
                    text: 'mx-btn：支持配置link-href，link-target外链参数，<a href="#/btn/index" class="mx5-link-brand">点击查看</a>'
                }, {
                    text: 'todo',
                }]
            }]
        },{
            version: '0.0.1',
            time: '2021-11-24',
            subs: [{
                type: 'add',
                subs: [{
                    text: 'mx-btn：支持配置link-href，link-target外链参数，<a href="#/btn/index" class="mx5-link-brand">点击查看</a>'
                }, {
                    text: 'todo',
                }]
            }, {
                type: 'notice',
                subs: [{
                    text: 'todo',
                    subs: [{
                        text: 'todo',
                    }, {
                        text: 'todo',
                    }]
                }, {
                    text: 'todo',
                }]
            }, {
                type: 'bug',
                subs: [{
                    text: 'todo',
                    subs: [{
                        text: 'todo',
                    }, {
                        text: 'todo',
                    }]
                }, {
                    text: 'todo',
                }]
            }]
        }];
        this.set({
            list,
            expand: 10
        })
    },
    render() {
        this.digest();
    },
    '@:{expand}<click>'(e) {
        let { expand } = this.get();
        this.digest({
            expand: expand + 10
        })
    }
})