import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:1.html',
    render() {
        this.digest({
            // rightView: '@./right',
            navs: [{
                text: '只一级',
                link: '#/header/index?header=demo1_1',
            }, {
                text: '二级(本页外链混合)',
                subs: [{
                    text: '本页打开2_1',
                    link: '#/header/index?header=demo1_2_1',
                }, {
                    text: '本页打开2_2',
                    link: '#/header/index?header=demo1_2_2',
                }, {
                    text: '外链打开',
                    link: 'https://www.taobao.com/',
                    outer: true,
                }]
            }, {
                text: '二级(纯外链)',
                subs: [{
                    text: '外链打开3_1',
                    link: 'https://www.taobao.com/'
                }, {
                    text: '外链打开3_1',
                    link: 'https://www.taobao.com/'
                }]
            }, {
                text: '二级(纯本页)',
                subs: [{
                    text: '本页打开4_1',
                    link: '#/header/index?header=demo1_4_1',
                }, {
                    text: '本页打开4_2',
                    link: '#/header/index?header=demo1_4_2',
                }, {
                    text: '本页打开4_3',
                    link: '#/header/index?header=demo1_4_3',
                }]
            }, {
                text: '外链打开',
                link: 'https://www.taobao.com/',
                outer: true,
                tag: 'HOT',
            }]
        });
    }
})