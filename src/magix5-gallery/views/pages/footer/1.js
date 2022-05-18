import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

module.exports = View.extend({
    tmpl: '@:./1.html',
    render() {
        this.digest({
            list: [{
                text: '左对齐（默认）',
                value: 'left'
            }, {
                text: '居中对齐',
                value: 'center'
            }, {
                text: '右对齐',
                value: 'right'
            }],
            current: 'left',
            bizCodes: [{
                text: 'adStrategy（策略中心）',
                value: 'adStrategy'
            }, {
                text: 'unionMedia（联盟媒体测）',
                value: 'unionMedia'
            }, {
                text: 'unionMerchant（联盟商家测）',
                value: 'unionMerchant'
            }, {
                text: 'tanxSSP',
                value: 'tanxSSP'
            }],
            types: [{
                text: 'alimama（默认）',
                value: 'alimama'
            }, {
                text: 'taobao',
                value: 'taobao'
            }, {
                text: 'etao',
                value: 'etao'
            }, {
                text: 'tanx',
                value: 'tanx'
            }, {
                text: 'iconfont',
                value: 'iconfont'
            }],
            currentType: 'alimama',
            currentBizcode: ''
        });
    },
    'change<change>'(e) {
        this.digest({
            current: e.params.value
        })
    },
    'changeType<change>'(e) {
        this.digest({
            currentType: e.params.value,
            currentBizcode: ''
        })
    },
    'changeBizCode<change>'(e) {
        this.digest({
            currentType: '',
            currentBizcode: e.params.value
        })
    }
});