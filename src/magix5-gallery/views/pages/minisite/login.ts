import Magix5 from 'magix5';
import View from './base';
Magix.applyStyle('@index.less');
Magix.applyStyle('@login.less');

export default View.extend({
    tmpl: '@login.html',
    assign(extra) {
        this.updater.snapshot();

        let info = $.extend(true, {}, extra);

        // 轮播点样式，默认为品牌色
        let banners = info.data.banners;
        let dotColorList = banners.map(b => {
            return {
                '--mx-carousel-trigger-color': b.dotColor || 'var(--color-brand)'
            };
        })

        this.updater.set(Magix.mix(info, {
            loginFrameData: {
                bizCode: info.biz.mainBizCode
            },
            dotColorList,
        }));

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },
    render() {
        let that = this;
        let { data, biz } = that.updater.get();
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
                that.updater.digest({
                    data,
                });
            }).catch(err => {
                that.updater.digest();
            })
        } else {
            that.updater.digest();
        }
    }
});



