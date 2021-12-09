import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            apis: [{
                value: 'mode',
                text: `<pre>展现类型
normal：容器宽度大于360且高度大于360时使用，图文区域展示为320*320
small：容器宽度160 ~ 360且高度160 ~ 360时使用，图文区域展示为120*120
xsmall：容器宽度小于160且高度小于160时使用，仅展示文案不显示图片</pre>`,
                type: 'string',
                def: '当显式指定mode时，指定什么就是什么尺寸<br/>未显式指定，根据组件所处容器尺寸进行计算'
            }, {
                value: 'type',
                text: `<pre>异常类型：
not-found：查看的页面不存在
network-error：网络连接失败
empty-content：暂无内容
empty-search：暂无查询数据
no-access：暂无访问权限
loading：数据计算中</pre>`,
                type: 'string',
                def: 'not-found'
            }, {
                value: 'tip',
                text: '自定义提示信息',
                type: 'string',
                def: `<pre>不同类型默认值不同
not-found：抱歉，您查看的页面不存在
network-error：网络连接失败，请检查您的网络连接
empty-content：暂无内容
empty-search：暂无查询数据
no-access：暂无访问权限
loading：数据计算中，请耐心等待</pre>`
            }, {
                value: 'btns',
                text: '是否需要返回首页 + 返回上一页按钮',
                type: 'boolean',
                def: `<pre>不同类型默认值不同
not-found：true
network-error：true
empty-content：false
empty-search：false
no-access：true
loading：false</pre>`
            }, {
                value: 'bg',
                text: '背景颜色<br/>transparent：透明<br/>grey：灰色',
                type: 'string',
                def: 'transparent'
            }],
            columns: [{
                text: '页面不存在',
                path: 1,
            }, {
                text: '网络连接失败',
                path: 2,
            }, {
                text: '暂无内容',
                path: 3,
            }, {
                text: '暂无查询数据',
                path: 4,
            }, {
                text: '暂无访问权限',
                path: 5,
            }, {
                text: '数据计算中',
                path: 6,
            }],
        });
    },
})
