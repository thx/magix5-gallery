import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:2.html',
    render() {
        this.digest({
            link: '点此<a href="https://www.taobao.com/" target="_blank" class="mx5-link-brand" data-spm-click="gostr=/alimama.99.dmp;locaid=de66987da">查看详情</a>',
            icon: '<i class="mx5-mr5 mx5-iconfont">&#xe63d;</i>',
            img: '<img src="//img.alicdn.com/tfs/TB1LtU5V5LaK1RjSZFxXXamPFXa-500-100.png" />',
        });
    },
})