import Magix5, { applyStyle, mix } from 'magix5';
import View from './base';
applyStyle('@index.less');
applyStyle('@login.less');

export default View.extend({
    tmpl: '@login.html',
    assign(extra) {
        let info = JSON.parse(JSON.stringify(extra));

        // 轮播点样式，默认为品牌色
        let banners = info.data.banners;
        let dotColorList = banners.map(b => {
            return {
                '--mx-carousel-trigger-color': b.dotColor || 'var(--color-brand)'
            };
        })

        this.set(mix(info, {
            loginFrameData: {
                bizCode: info.biz.mainBizCode
            },
            dotColorList,
        }));
    },
    render() {
        let that = this;
        let { data, biz } = that.get();
        if (data.needFetchQianniu || data.banners[0].needFetchQianniu) {
            // 读取千牛配置的banner
            that.requester.unlogin_reach_findLoginMainPage_get({
                bizCode: biz.bizCode.split('_')[0],
                sourceChannel: 'qianniu'
            }).then(res => {
                let content = res.data.result;
                if (content && content.img && content.link && content.link.url) {
                    content.spmExtra = 'isqianniu';
                    data.banners.unshift(content);
                }
                that.digest({
                    data,
                });
            }).catch(err => {
                that.digest();
            })
        } else {
            that.digest();
        }
    }
});



