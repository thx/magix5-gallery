import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        let apis = [{
            value: 'width',
            text: '导航中间区域宽度，默认屏幕宽度，会根据屏幕宽度进行修正',
            type: 'number',
            def: 'window.innerWidth'
        }, {
            value: 'navs',
            text: `导航数组<pre>[{
    text:"一级菜单展示文案",
    link: "配置了该字段时直接外链打开link",
    outer: "link是否外链打开，默认true",
    tag: "打标，文案或者html片段均可",
    tagColor: "打标颜色，默认红色",
    info: { // 抄底详情说明，子菜单无选中时显示
        'subTitle': '下划线小标题',
        'title': '标题',
        'tip': '提示信息',
        'link': '了解详情外链',
        'linkText': '了解详情文案，默认为了解详情'
    },
    subs: [{
        text: "二级菜单展示文案",
        link: "配置了该字段时直接外链打开link",
        outer: "link是否外链打开，默认true",
        group: "三级分组的名称，如需三级分组，则相同组配置相同的组名即可",
        tag: "打标，文案或者html片段均可",
        tagColor: "打标颜色，默认红色",
        tagContent: "完全自定义打标内容，优先级tagContent>tag",
        info: { // 详情说明
            'subTitle': '下划线小标题',
            'title': '标题',
            'tip': '提示信息',
            'link': '了解详情外链',
            'linkText': '了解详情文案，默认为了解详情'
        },
    }]
}]</pre>`,
            type: 'array',
            def: ''
        }, {
            value: 'logo-nav',
            text: `<pre>点击logo跳转的地址，如果为一级只配置一级即可，
如果为某个二级菜单，请包装成navs的结构
{
    link: "配置了该字段时直接外链打开link",
    outer: "link是否外链打开，默认true",
    subs: [{
        text: "二级菜单展示文案",
        link: "配置了该字段时直接外链打开link",
        outer: "link是否外链打开，默认true",
    }]
} </pre>`,
            type: 'object',
            def: 'navs[0]'
        }, {
            value: 'text-key',
            text: 'navs里text取值字段',
            type: 'string',
            def: 'text'
        }, {
            value: 'link-key',
            text: 'navs里link取值字段',
            type: 'string',
            def: 'link'
        }, {
            value: 'outer-key',
            text: 'navs里outer取值字段',
            type: 'string',
            def: 'outer'
        }, {
            value: 'cur',
            text: '当前哪个导航，对应navs的value，默认不选中任何一个导航',
            type: 'string',
            def: ''
        }, {
            value: 'links',
            text: '顶部妈妈相关产品线信息是否需要',
            type: 'boolean',
            def: 'true'
        }, {
            value: 'ceiling',
            text: '是否需要滚定吸顶功能',
            type: 'boolean',
            def: 'true'
        }, {
            value: 'login',
            text: '<div class="mx5-mb5">是否需要显示用户登录信息，links=true时才生效</div><img width="600" src="https://img.alicdn.com/tfs/TB17_QneYj1gK0jSZFOXXc7GpXa-1652-200.png">',
            type: 'boolean',
            def: 'true'
        }, {
            value: 'user',
            text: '登录的用户名称，有该值认为已登录，否则未登录，login=true时必有',
            type: 'string',
            def: ''
        },
        {
            value: 'biz-code',
            text: `各产品bizCode，用于包装登陆框逻辑，必传，<a href="#!/dialog/index?highlightId=mx_12_demo13" class="mx5-color-brand">详细定义参见mxLoginView</a>
<div>注意传入biz-code时，有内置logo逻辑，此时忽略自定义传入的logo</div>
<div>不传biz-code时，以传入logo为准</div>`,
            type: 'string',
            def: ''
        }, {
            value: 'logo',
            text: '项目logo的图片地址，高度34px，长度图片自适应，距离第一个菜单64px',
            type: 'string',
            def: ''
        }, {
            value: 'logout-url',
            text: '登出接口，login=true时必有',
            type: 'string',
            def: ''
        }, {
            value: 'right-view',
            text: '<div class="mx5-mb5">右侧预留自定义view</div><img width="600" src="https://img.alicdn.com/tfs/TB1y0Ame1L2gK0jSZFmXXc7iXXa-1652-200.png">',
            type: 'viewpath',
            def: ''
        }, {
            value: 'right-view-data',
            text: '传入right-view的data',
            type: 'object',
            def: '{}'
        }, {
            value: 'right-ceiling-show',
            text: '右侧自定义的view默认不展示，吸顶的时候显示',
            type: 'boolean',
            def: 'false'
        }, {
            value: 'mode',
            text: '导航样式<br/>common：白底色版本<br/>dark：深底色版本',
            type: 'string',
            def: 'common'
        }, {
            value: 'color',
            text: '自定义选中态高亮文案颜色',
            type: 'string',
            def: '品牌色'
        }, {
            value: 'color-bg',
            text: '自定义背景颜色',
            type: 'string',
            def: '#ffffff'
        }, {
            value: 'color-text',
            text: '自定义文案颜色，不同状态颜色基于此进行透明度变化<br/>默认opacity=0.5，hover时opacity=1，选中opacity=1&加粗',
            type: 'string',
            def: '#333333'
        }];

        let columns = [{
            text: '全屏使用',
            path: 1
        }, {
            text: '自定义key',
            path: 2
        }, {
            text: 'logo跳转',
            path: 3
        }, {
            text: '深底色版本',
            path: 4
        }, {
            text: '内置logo',
            path: 5
        }, {
            text: '自定义颜色',
            path: 6
        }]

        this.set({
            apis,
            columns,
        });
    },
})
