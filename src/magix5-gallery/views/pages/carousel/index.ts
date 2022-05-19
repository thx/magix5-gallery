import Magix5 from 'magix5';
import View from '../base/doc';

export default View.extend({
    init(options) {
        this.set({
            methods: [{
                value: 'next()',
                text: '跳转下一帧',
                desc: `<pre>
let instance = Vframe.byNode(Magix5.node(nodeId));
instance.invoke('next');
                </pre>`,
            }, {
                value: 'prev()',
                text: '跳转上一帧',
                desc: `<pre>
let instance = Vframe.byNode(Magix5.node(nodeId));
instance.invoke('prev');
                </pre>`,
            },{
                value: 'to(index)',
                text: '跳转某一帧，定义同active，从0开始',
                desc: `<pre>
let instance = Vframe.byNode(Magix5.node(nodeId));
instance.invoke('to',2);
                </pre>`,
            }],
            apis: [{
                value: 'mode',
                text: [
                    '动画播放模式',
                    'carousel：跑马灯切换',
                    'fade：渐显渐隐'
                ].join('<br>'),
                type: 'string',
                def: 'carousel'
            }, {
                value: 'height',
                text: '容器高度',
                type: 'number',
                def: 200
            }, {
                value: 'active',
                text: '默认激活第几帧，第一帧为0',
                type: 'number',
                def: 0
            }, {
                value: 'autoplay',
                text: '是否自动播放，自动播放时鼠标hover暂停播放，移出恢复播放',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'dots',
                text: '是否显示缩略点',
                type: 'boolean',
                def: 'true'
            }, {
                value: 'dot-type',
                text: `<pre>内置轮播点样式
1. line-in-center：轮播内容内部线型点居中显示
2. line-in-left：轮播内容内部线型点居左显示
3. line-in-right：轮播内容内部线型点居右显示
4. line-out-center：轮播内容外部线型点居中显示
5. dot-in-center：轮播内容内部圆形点居中显示
6. dot-in-left：轮播内容内部圆形点居左显示
7. dot-in-right：轮播内容内部圆形点居右显示
8. dot-out-center：轮播内容外部圆形点居中显示
</pre>`,
                type: 'string',
                def: 'dot-in-center'
            },/* {
                value: 'dot-vars',
                text: '轮播点可定义变量，使用css变量格式',
                type: 'object',
                def: `<pre style="width: 340px;">
    {
        // 轮播点默认颜色，默认0.4，hover0.8，选中态1
        '--mx-carousel-trigger-color': '#ffffff', 
    
        // 轮播点显示位置与边界的距离
        '--mx-carousel-trigger-gap': '12px',
    
        // 线型轮播点宽度
        '--mx-carousel-line-width': '20px',
    
        // 线型轮播点高度
        '--mx-carousel-line-height': '5px',
    
        // 线型轮播点距离
        '--mx-carousel-line-gap': '2px',
    
        // 圆点轮播点大小，点与点的距离=该直径
        '--mx-carousel-dot-size': '12px'
    }
    </pre>`
            }, {
                value: 'dot-vars-list',
                text: '数组轮播点可定义变量，使用css变量格式，<br/>支持每帧配置不一样的样式<br/>dot-vars-list = [dot-vars,dot-vars]',
                type: 'object',
                def: `<pre style="width: 340px;">
    [{
        // 轮播点默认颜色，默认0.4，hover0.8，选中态1
        '--mx-carousel-trigger-color': '#ffffff', 
    
        // 轮播点显示位置与边界的距离
        '--mx-carousel-trigger-gap': '12px',
    
        // 线型轮播点宽度
        '--mx-carousel-line-width': '20px',
    
        // 线型轮播点高度
        '--mx-carousel-line-height': '5px',
    
        // 线型轮播点距离
        '--mx-carousel-line-gap': '2px',
    
        // 圆点轮播点大小，点与点的距离=该直径
        '--mx-carousel-dot-size': '12px'
    }]
    </pre>`
            }, */{
                value: 'triggers',
                text: '是否显示左右切换箭头，默认不显示，配置显示时hover出现切换箭头',
                type: 'boolean',
                def: 'false'
            }, /*{
                value: 'prev-trigger',
                text: '自定义上一帧trigger的id',
                type: 'string',
                def: ''
            }, {
                value: 'next-trigger',
                text: '自定义下一帧trigger的id',
                type: 'string',
                def: ''
            }, */{
                value: 'interval',
                text: '播放间隔，单位毫秒',
                type: 'number',
                def: '3000'
            }, {
                value: 'timing',
                text: [
                    '定义同transition-timing-function',
                    'linear：规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）',
                    'ease：规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）',
                    'ease-in：规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）',
                    'ease-out：规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）',
                    'ease-in-out：规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）',
                    'cubic-bezier(n,n,n,n)：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值'
                ].join('<br>'),
                type: 'string',
                def: 'ease-in-out'
            }, {
                value: 'duration',
                text: '动画持续时间',
                type: 'string',
                def: '0.5s'
            }, {
                value: 'vertical',
                text: '是否垂直方向播放',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'mousewheel',
                text: '垂直方向播放时，是否支持鼠标滚动事件',
                type: 'boolean',
                def: 'false'
            }, {
                value: 'trigger-hook',
                text: `<pre class="w340">
    翻页钩子
    triggerHook: (currentIndex, targetIndex) => {
        // currentIndex: 当前页码，从0开始
        // targetIndex: 目标页码，从0开始
        return new Promise((resolve, reject) => {
            if (...) {
                // 禁止翻页
                reject();
            } else {
                // 允许翻页
                resolve();
            }
        })
    }
    </pre>`,
                type: 'function'
            }],
            events: [{
                type: 'change',
                text: '切换展示帧时触发',
                params: [{
                    value: 'active',
                    text: '当前第几帧，从0开始',
                    type: 'number'
                }]
            }],
            lefts: [{
                text: '跑马灯水平滚动',
                path: 1
            }, {
                text: '垂直滚动',
                path: 3
            }, {
                text: '翻页hook',
                path: 5
            }],
            rights: [{
                text: '默认轮播点样式',
                path: 2
            }, {
                text: '外部控制轮播',
                path: 4
            }]
        });
    },
})
