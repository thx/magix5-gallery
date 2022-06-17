import View from './doc';

export default View.extend({
    init(options) {
        this.set({
            methods: [{
                value: 'watch(domNode,crated,alter)',
                text: '监控某个节点上的view及所有后代view的渲染情怀',
                desc: `domNode为监控的节点，created是所有view渲染完成的回调，alter是有子view销毁时的回调`,
            }, {
                value: 'remove(domNode)',
                text: '删除监控',
                desc: `domNode为监控的节点`,
            },{
                value: 'isReady(domNode)',
                text: '判断某个dom节点上所有view是否渲染完成',
                desc: `domNode为监控的节点`,
            }],
            columns: [{
                text: '基础使用',
                path: 'state-1'
            }],
        });
    },
})
