/*
    该文件为gallery静态编译汇总文件，静态编译不同与运行时的组件，需要更好的理解静态代码的语法识别及转换规则
    理论上只要不需要访问运行时的环境，均可以使用静态编译转换，无论多复杂

    <mx-guard *code="{{=ctrlCode}}" *where="{{#where}}" *list="{{#list}}"/>

    =>

    {{if ctrlCode}}
        <div mx-click="{{=where}}?ctrlClick()">
            控制模块
            <span>{{=where}}</span>
            <ul>
                {{each list as out}}
                    <li>{{=out.name}}</li>
                {{/each}}
            </ul>
        </div>
    {{/if}}

    为什么要使用静态编译？
    自定义[view/组件]默认无高度且存在异步加载，[view/组件]内容渲染后会造成界面抖动，静态编译本质上不是[view/组件]，只是一段`html`片断的简写，最终渲染时不存在异步加载，体验上更好

    静态编译型的组件酌情使用，因为编写难度高，较难覆盖到所有场景
 */
let exceptSlot = (type, token) => {
    if (type == 'child' &&
        token.tag == 'mx-slot') {
        return true;
    }
    return false;
};
export default {
    'mx-title'(i) {
        let { attrsKV, content } = i;
        let mode = attrsKV['*mode'] || 'first';
        //需要考虑mode为变量的情况，如<mx-title *mode="{{=mode}}"/>
        let modeClass = `@:./index.less:title--${mode}`;
        //优先使用属性*content的内容
        if (attrsKV['*content']) {
            content = attrsKV['*content'];
        }
        let tip = attrsKV['*tip'] || '';
        if (tip) {
            tip = `<span class="@:./index.less:tip" mx-html="${tip}"></span>`;
        }
        return content ? `<div ${ProcessAttr(attrsKV, '', ignores, modeClass)} mx-view="${i.mxView}">
            <span class="@:./index.less:content" mx-html="${content}"></span>
            ${tip}
        </div>` : '';
    },
    'mx-layout.test'(node, builder) {
        let { tokensMap, attrsKV } = node;
        //从tokensMap中拿出当前节点原始token
        let currentToken = tokensMap[node.id];
        let contentSlotValue;
        //如果有子节点，则从子节点中查找mx-slot节点
        if (currentToken.children) {
            for (let c of currentToken.children) {
                let { tag, attrsKV } = c;
                if (tag == 'mx-slot') {
                    //查找<mx-slot name="content"节点
                    if (attrsKV &&
                        attrsKV.name == 'content') {
                        //根据token生成相应的innerHTML字符串
                        contentSlotValue = builder.buildInnerHTML(c);
                    }
                }
            }
        }
        if (!contentSlotValue) {//如果未找到mx-slot name="content"节点，则从属性中读取content内容
            contentSlotValue = attrsKV['*content'];
        }
        let styles = [
            'padding: var(--mx5-layout-title-v-gap) var(--mx5-layout-title-h-gap)'
        ];
        let borderTest = '';
        let border = attrsKV['*border'];//读取*border，有可能是变量
        let cmd = builder.readCmd(border);//目前仅支持简单的变量表达式，如{{=expr}}
        if (cmd.succeed) {//成功读取变量
            //因为style属性固定出现，内容使用if控制语句即可动态控制
            styles.push(`{{if ${cmd.content}}}border-bottom: 1px solid var(--mx5-layout-title-border-color){{/if}}`);
            //data-border属性根据条件是否出现，不固定的属性使用条件语句
            //动态属性需要buildCmd重构下指令
            //a="{{=b}}??"
            let rebuildCmd = builder.buildCmd(cmd.line, '=', cmd.art, cmd.content);
            borderTest = `data-border="${rebuildCmd}?"`;//仅控制属性出现
            borderTest += ` data-border2="${rebuildCmd}?content"`//内容
            borderTest += ` data-border3="${rebuildCmd}??border3"`//不为null或undefined

        } else if ((border + '') !== 'false') {//字面量
            styles.push('border-bottom: 1px solid var(--mx5-layout-title-border-color)');
        }
        //根据当前token，生成排除子token中mx-slot外的其它节点成字符串
        let restHTML = builder.buildInnerHTML(currentToken, exceptSlot);
        let popover=attrsKV['*icon-tip'] ? (`<mx-popover class="mx5-iconfont mx5-iconfont-tip" style="margin-left: 4px;" *content="${attrsKV['*icon-tip']}">&#xe72f;</mx-popover>`) : '';
        return `<div ${borderTest} ${ProcessAttr(attrsKV, styles.join(';'), {
            '*content': 1,
            '*icon-tip': 1,
            '*tip': 1,
            '*link': 1,
            '*link-text': 1,
            '*border': 1,
        }, 'mx5-clearfix')}><div>${contentSlotValue}</div>${restHTML}${popover}</div>`;
    },
}