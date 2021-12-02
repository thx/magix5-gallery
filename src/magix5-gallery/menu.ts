export default {
    menus: [{
        id: 'gallery',
        name: '组件',
        path: '/btn/index',
        paths: [{
            name: '开发指南',
            subs: [{
                name: '更新记录',
                path: '/base/update'
            }, {
                name: '相关文档链接',
                path: '/base/links',
            }]
        }, {
            name: '样式',
            subs: [{
                name: 'mx-grid 栅格',
                path: '/grid/index',
            }, {
                name: 'mx-layout 布局',
                path: '/layout/index',
            }]
        }, {
            name: '通用',
            subs: [{
                name: 'mx-btn 按钮',
                tip: '点击查看<a rel="noopener noreferrer" target="_blank" href="https://done.alibaba-inc.com/file/BfeHD00VvQXv/ROf2KIXCwf3UfVd6/preview?aid=0F362069-A45F-4B3E-AB2B-F4B17371AE14" class="mx5-link-brand">按钮交互规范</a>',
                path: '/btn/index',
            },
            // {
            //     name: 'mx-radio 单选',
            //     tip: '包装原生radio，支持配置说明，打标',
            //     path: '/radio/index',
            // }, {
            //     name: 'mx-checkbox 多选',
            //     tip: '包装indeterminate状态；支持级联选择功能',
            //     path: '/checkbox/index',
            // }, 
            {
                name: 'mx-error 空/异常状态',
                tip: '各种异常情况提示页面（包含empty空状态，no access无权限等场景）',
                path: '/error/index',
            }]
        }, {
            name: '数据输入',
            subs: [
                // {
                //     name: 'mx-input 输入框',
                //     tip: '包装input，处理动效样式及输入提示等功能',
                //     path: '/input/index',
                // }, {
                //     name: 'mx-textarea 多行文本框',
                //     tip: '包装多行文本框，处理动效样式及输入提示等功能',
                //     path: '/textarea/index',
                // }, {
                //     name: 'mx-dropdown 下拉框单选',
                //     tip: '支持click展开和hover展开；<span class="mx5-color-brand">下拉列表追加到body；</span>支持双向绑定',
                //     path: '/dropdown/index',
                // }, {
                //     name: 'mx-dropdown 下拉框多选',
                //     tip: '支持click展开和hover展开；<span class="mx5-color-brand">下拉列表追加到body；</span>支持双向绑定',
                //     path: '/dropdown/multi',
                // },

                {
                    name: 'mx-copy 复制',
                    tip: '该组件引入了第三方插件 <a rel="noopener noreferrer" target="_blank" href="https://clipboardjs.com/" class="mx5-color-brand">https://clipboardjs.com/</a>',
                    path: '/copy/index',
                }]
        },
        // {
        //     name: '导航',
        //     subs: [{
        //         name: 'mx-pagination 翻页器',
        //         tip: '支持复杂模式，精简版和顺序翻页版本，pager支持双向绑定',
        //         path: '/pagination/index',
        //     }, {
        //         name: 'mx-tabs 底边线tab分组',
        //         tip: '一般适用于一级导航，支持双向绑定',
        //         path: '/tabs/index',
        //     }, {
        //         name: 'mx-tabs.box 盒状tab分组',
        //         tip: '一般适用于快捷筛选，支持双向绑定',
        //         path: '/tabs/box',
        //     }]
        // }, 
        // {
        //     name: '内容展示',
        //     subs: [{
        //         name: 'mx-number 数据展示',
        //         tip: '数值跳动动画',
        //         path: '/number/index',
        //     }, {
        //         name: 'mx-form 表单',
        //         path: '/form/index',
        //     }, {
        //         name: '表单支持的校验项',
        //         fullName: 'mx-form 表单支持的校验项',
        //         path: '/form/valids',
        //         child: true,
        //     }, {
        //         name: '表单双向绑定+校验',
        //         fullName: 'mx-form 表单双向绑定+校验',
        //         path: '/form/sync',
        //         child: true,
        //     }, {
        //         name: '警告类校验场景',
        //         fullName: 'mx-form 表单警告类校验场景',
        //         path: '/form/warn',
        //         child: true,
        //     }, {
        //         name: '表单样式',
        //         fullName: 'mx-form 表单样式',
        //         path: '/form/style',
        //         child: true,
        //     }, {
        //         name: 'mx-tree 树状结构',
        //         tip: '支持纯展示，单选，多选',
        //         path: '/tree/index'
        //     }]
        // }, 
        {
            name: '反馈',
            subs: [{
                name: 'mx-popover 气泡通知',
                tip: '默认使用span标签生成，支持自定义展示view',
                path: '/popover/index'
            }, {
                name: 'mx-loading 加载',
                path: '/loading/index',
            }]
        }
            //     , {
            //     name: '实用功能',
            //     subs: [{
            //         name: '离开提醒',
            //         path: '/feature/exit'
            //     }]
            // }
        ]
    }]
}