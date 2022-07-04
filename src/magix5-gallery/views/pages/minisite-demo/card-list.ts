/**
 * 3卡片信息
 * 
 * 可展示位学习资源模块，数据来源可走万堂书院
 */
import Magix5, { applyStyle } from 'magix5';
import View from './base';
applyStyle('@index.less');

export default View.extend({
    tmpl: '@card-common.html',
    render() {
        let that = this;
        let cardType = 'carousel-common-list';
        let { data, biz } = that.get();

        let channelType = ({
            subway: 'subway_login_recommend'
        })[biz.mainBizCode];
        if (data.needShuyuan && channelType) {
            $.ajax({
                url: 'https://shuyuan.taobao.com/course/ext/findRecommendList.json',
                dataType: 'jsonp',
                data: {
                    queryJsonStr: JSON.stringify({
                        channelType,
                        perPageSize: 3
                    })
                },
                jsonp: 'callback',
                success: function (resp) {
                    // 通过接口获取数据，有数据则以万堂返回数据为准，无数据则走alp的默认配置
                    if (resp.data && resp.data.result && resp.data.result.length > 0) {
                        let cardList = resp.data.result.map(item => {
                            return {
                                img: item.mainPictureUrl,
                                title: item.name,
                                tip: item.description,
                                btn: '查看详情',
                                link: `https://shuyuan.taobao.com/#!/knowledge/detail/index?id=${item.id}`,
                                outer: true
                            }
                        })
                        that.digest({
                            cardList,
                            cardType
                        });
                    } else {
                        that.digest({
                            cardType
                        });
                    }
                },
                error: function (xhr) {
                    // 解耦异常
                    that.digest({
                        cardType
                    });
                }
            });
        } else {
            that.digest({
                cardType
            });
        }
    }
});
