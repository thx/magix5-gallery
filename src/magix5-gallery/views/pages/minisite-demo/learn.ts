import Magix5, { applyStyle, Router } from 'magix5';
import View from 'magix5-gallery/view';
applyStyle('@index.less');
applyStyle('@learn.less');

export default View.extend({
    tmpl: '@learn.html',
    init(extra) {
        this.assign(extra);

        this.observeLocation(['courseId']);
    },
    assign(extra) {
        this.set({
            biz: extra.biz,
            data: extra.data
        });
    },
    async render() {
        let that = this;
        let { data } = that.get();
        let courseGroups = data.list;
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
            that.getCourse(curCourse.id),
            that.getRec(curCourse.id)
        ])

        that.digest({
            courseGroups,
            curCourse,
            content,
            recs
        });
    },

    getCourse(id) {
        return new Promise(resolve => {
            $.ajax({
                url: 'https://shuyuan.taobao.com/course/getBaseInfo.json',
                dataType: 'jsonp',
                data: {
                    id
                },
                jsonp: 'callback',
                success: function (resp) {
                    resolve($('<div/>').html(resp.data.result.content).text())
                },
                error: function (xhr) {
                    // 解耦异常
                    resolve('');
                }
            });
        });
    },

    getRec(id) {
        let that = this;
        let { devInfo, biz } = that.get();
        return new Promise(resolve => {
            // 支持的书院映射
            let channelType = ({
                subway: 'subway_xue_recommend'
            })[biz.mainBizCode];

            if (!channelType) {
                resolve([]);
            } else {
                $.ajax({
                    url: 'https://shuyuan.taobao.com/course/ext/findRecommendList.json',
                    dataType: 'jsonp',
                    data: {
                        queryJsonStr: JSON.stringify({
                            channelType,
                            perPageSize: devInfo.pc ? 15 : 6,
                            courseId: id
                        })
                    },
                    jsonp: 'callback',
                    success: function (resp) {
                        if (resp.data && resp.data.result && resp.data.result.length > 0) {
                            let cardList = resp.data.result.map(item => {
                                // courseType：
                                // LIVE 直播、回播
                                // VIDEO：视频
                                // PTEXT：图文
                                let icon = '&#xe7f1;';
                                switch (item.courseType) {
                                    case 'LIVE':
                                    case 'VIDEO':
                                        icon = '&#xe616;';
                                        break;

                                    case 'PTEXT':
                                        icon = '&#xe7f1;';
                                        break;
                                }
                                return {
                                    title: item.name,
                                    subTitle: item.seriseName,
                                    iconHtml: `<div class="@learn.less:rec-icon"><i class="@scoped.style:iconfont @learn.less:rec-iconfont">${icon}</i></div>`,
                                    tip: item.description,
                                    btn: '查看详情',
                                    link: `https://shuyuan.taobao.com/#!/knowledge/detail/index?id=${item.id}`,
                                    outer: true
                                }
                            })
                            resolve(cardList);
                        } else {
                            resolve([]);
                        }
                    },
                    error: function (xhr) {
                        // 解耦异常
                        resolve([]);
                    }
                });
            }
        });
    },

    'toggle<click>'(e) {
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
    'change<click>'(e) {
        Router.to({
            courseId: e.params.courseId
        })
    }
});



