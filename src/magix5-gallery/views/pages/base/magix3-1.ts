import Magix3 from '../../../gallery/mx-magix3/index';
import View from './demo';
Magix3.config({
    crossConfigs: [{
        "apiHost": "//tuijian.taobao.com",
        "projectName": "feeds",
        "source": "//g.alicdn.com/mm/feeds/20200812.212619.484/feeds"
    }, {
        "projectName": "magix-ports",
        "source": "//g.alicdn.com/mm/magix-ports/20220513.171722.564",
        //"source":"//dev.g.alicdn.com/mm/magix-ports/20220601.154517.884/"
    }]
});
Magix3.setPrepare([{
    projectName: 'feeds',
    load: true,
    call: false
}]);
export default View.extend({
    tmpl: '@:./magix3-1.html',
    render() {
        this.digest({
            magix3Params: {
                list: [{
                    title: '笑一笑，十年少',
                    content: '1、岁月磨平了你的棱角，其实就是你被生活盘了。<br/>2、你不是真的胖，只是女娲捏土造你的时候土用多了。<br/>3、当员工好累埃平时做牛做马，到年底了还要表演节目给领导逗乐子。'
                }, {
                    title: '是幽默的深刻，还是深刻的幽默',
                    content: '1、人生，总有不得不走的回头路：比如出门上班走到楼下才发现没带手机。<br/>2、为什么经常看见妻子吊打小三，却很少看见丈夫痛殴奸夫？因为小三一般比妻子瘦弱，而奸夫一般比较丈夫健硕。<br/>3、怕开宝马的同学认出没戴头盔骑摩托车的你，真的想多了。人家工作、购物、居注娱乐去的地方，走的是和你一条线吗？'
                }, {
                    title: '冷段一组，凉意浓',
                    content: '1、过夜的叫酒店，喝酒的却叫夜店。<br/>2、打呼噜的人能在自己的呼噜声中睡着也太不公平了。<br/>3、友谊其实很简单，就是在自己吃到好吃的食物的时候想着对方，然后拍下来发给他。'
                }],
            }
        })
    },
    'test<change>'(e) {
        console.log(e);
    }
})