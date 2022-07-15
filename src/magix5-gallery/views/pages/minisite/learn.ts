import Magix5, { Router, applyStyle } from 'magix5';
import View from 'magix5-gallery/view';
applyStyle('@:index.less');
applyStyle('@:learn.less');

export default View.extend({
    tmpl: '@:learn.html',
    init(extra) {
        this.observeLocation(['courseId']);
    },
    assign(extra) {
        this.set(extra);
    },
    async render() {
        let { data } = this.get();
        let courseGroups = data.list || [];
        courseGroups.forEach((g, gi) => {
            g.groupId = gi;
            g.courses.forEach((c, ci) => {
                c.courseId = `${gi}_${ci}`;
            })
        })

        let locParams = Router.parse().params;
        let curCourseId = locParams.courseId || courseGroups[0].courses[0].courseId;
        let curCourse = {};
        for (let i = 0; i < courseGroups.length; i++) {
            courseGroups[i].selected = false;
            let courses = courseGroups[i].courses;
            for (let j = 0; j < courses.length; j++) {
                courses[j].selected = false;
                if (courses[j].courseId == curCourseId) {
                    courses[j].selected = true;
                    courseGroups[i].selected = true;
                    curCourse = courses[j];
                }
            }
        }

        let [content, recs] = await Promise.all([
            this['@:{get.course}'](curCourse['id']),
            this['@:{get.rec}'](curCourse['id'])
        ])

        this.digest({
            courseGroups,
            curCourse,
            content,
            recs
        });
    },

    '@:{get.course}'(id) {
        return new Promise(resolve => {
            resolve('');
            // let response = await fetch('//g.alicdn.com/mm/bp-source/lib/products.json');
            // data = await response.json();
            // $.ajax({
            //     url: 'https://shuyuan.taobao.com/course/getBaseInfo.json',
            //     dataType: 'jsonp',
            //     data: {
            //         id
            //     },
            //     jsonp: 'callback',
            //     success: function (resp) {
            //         resolve($('<div/>').html(resp.data.result.content).text())
            //     },
            //     error: function (xhr) {
            //         // 解耦异常
            //         resolve('');
            //     }
            // });
        });
    },

    '@:{get.rec}'(id) {
        let that = this;
        let { devInfo, biz } = that.get();
        return new Promise(async resolve => {
            // 支持的书院映射
            let channelType = ({
                scaffold: 'subway_xue_recommend',
                subway: 'subway_xue_recommend'
            })[biz.bizCode];

            if (!channelType) {
                resolve([]);
            } else {
                resolve([{
                    "title": "相关问题推荐1",
                    "subTitle": "直通车常见问题",
                    "icon": "<img src='https://img.alicdn.com/tfs/TB12EX_mrY1gK0jSZTEXXXDQVXa-200-200.png' />",
                    "tip": "经常遇到有商家问，我的商品单价很低，能否做直通车推广？一个商品才卖那么几元，直通",
                    btn: '查看详情',
                    link: 'https://www.taobao.com/',
                    outer: true
                },
                {
                    "title": "相关问题推荐2",
                    "subTitle": "直通车常见问题",
                    "icon": "<img src='https://img.alicdn.com/tfs/TB12EX_mrY1gK0jSZTEXXXDQVXa-200-200.png' />",
                    "tip": "经常遇到有商家问，我的商品单价很低，能否做直通车推广？一个商品才卖那么几元，直通",
                    btn: '查看详情',
                    link: 'https://www.taobao.com/',
                    outer: true
                },
                {
                    "title": "相关问题推荐3",
                    "subTitle": "直通车常见问题",
                    "icon": "<img src='https://img.alicdn.com/tfs/TB12EX_mrY1gK0jSZTEXXXDQVXa-200-200.png' />",
                    "tip": "经常遇到有商家问，我的商品单价很低，能否做直通车推广？一个商品才卖那么几元，直通",
                    btn: '查看详情',
                    link: 'https://www.taobao.com/',
                    outer: true
                }]);
                // fetch('https://shuyuan.taobao.com/course/ext/findRecommendList.json',
                //     {
                //         method: 'POST',
                //         body: JSON.stringify({
                //             queryJsonStr: {
                //                 channelType,
                //                 perPageSize: devInfo.pc ? 15 : 6,
                //                 courseId: id
                //             }
                //         })
                //     })
                //     .then(function (res) {
                //         if (resp.data && resp.data.result && resp.data.result.length > 0) {
                //             let cardList = resp.data.result.map(item => {
                //                 // courseType：
                //                 // LIVE 直播、回播
                //                 // VIDEO：视频
                //                 // PTEXT：图文
                //                 let icon = '&#xe7f1;';
                //                 switch (item.courseType) {
                //                     case 'LIVE':
                //                     case 'VIDEO':
                //                         icon = '&#xe616;';
                //                         break;

                //                     case 'PTEXT':
                //                         icon = '&#xe7f1;';
                //                         break;
                //                 }
                //                 return {
                //                     title: item.name,
                //                     subTitle: item.seriseName,
                //                     iconHtml: `<div class="@learn.less:rec-icon"><i class="@scoped.style:iconfont @learn.less:rec-iconfont">${icon}</i></div>`,
                //                     tip: item.description,
                //                     btn: '查看详情',
                //                     link: `https://shuyuan.taobao.com/#!/knowledge/detail/index?id=${item.id}`,
                //                     outer: true
                //                 }
                //             })
                //             resolve(cardList);
                //         } else {
                //             resolve([]);
                //         }
                //     })
                //     .catch(function (res) {
                //         resolve([]);
                //     })
            }
        });
    },

    '@:{toggle}<click>'(e) {
        let { groupIndex } = e.params;
        let { courseGroups } = this.get();
        courseGroups.forEach((g, gi) => {
            if (gi == groupIndex) {
                g.selected = !g.selected;
            } else {
                g.selected = false;
            }
        })
        this.digest({
            courseGroups
        })
    },
    '@:{change}<click>'(e) {
        Router.to({
            courseId: e.params.courseId
        })
    }
});



