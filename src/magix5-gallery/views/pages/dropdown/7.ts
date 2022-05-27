import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:7.html',
    render() {
        this.digest({
            list1: [{
                value: 1,
                text: '<img style="width: 50px; height: 50px; margin: 8px 4px 8px 0;" src="https://img.alicdn.com/bao/uploaded/i2/13498885/O1CN01yAamtY2FVNaDTQjt2_!!0-saturn_solar.jpg"/>2019夏装新款韩版女装宽松打底潮上衣短袖T恤OM80147'
            }, {
                value: 2,
                text: '<img style="width: 50px; height: 50px; margin: 8px 4px 8px 0;" src="https://img.alicdn.com/bao/uploaded/i3/13498885/O1CN01Zo87cQ2FVNaHt6Bt2_!!0-saturn_solar.jpg"/>韩都衣舍2019夏装新款女装韩版显瘦打底衫圆领套头T恤IG8397'
            }],
            selected1: 1,
            list2: [{
                value: 1,
                text: '<i class="mx5-iconfont">&#xe677;</i>测试信息'
            }, {
                value: 2,
                text: 'logo'
            }, {
                value: 3,
                text: '123456'
            }],
            selected2: 1,
        })
    },
    'change<change>'(e) {
        this.digest({
            selected: e.selected
        })
    }
})