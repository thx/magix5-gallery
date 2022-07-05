/**
 * 3卡片信息
 * 
 * 可展示位学习资源模块，数据来源可走万堂书院
 */
import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@:index.less');

export default View.extend({
    tmpl: '@:card-list.html',
    render() {
        this.digest({
            cardType: 'carousel-common-list'
        });
    }
});
