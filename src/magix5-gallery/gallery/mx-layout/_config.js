//magix-composer#gallery-config

let ProcessAttr = (attrs, style, ignores, className) => {
    let attrStr = '',
        classAdded = false,
        styleAdded = false;
    for (let p in attrs) {
        if (ignores[p] !== 1) {
            let v = attrs[p];
            if ((p == 'class') && className) {
                attrStr += ` class="${className} ${v}"`;
                classAdded = true;
            } else if ((p == 'style') && style) {
                attrStr += ` style="${style};${v}"`;
                styleAdded = true;
            } else {
                if (v === true) v = '';
                else v = '="' + v + '"';
                attrStr += ' ' + p + v;
            }
        }
    }
    if (!classAdded && className) {
        attrStr += ` class="${className}"`;
    }
    if (!styleAdded && style) {
        attrStr += ` style="${style}"`;
    }
    return attrStr;
};
let exceptSlot = (type, token) => {
    if (type == 'child' &&
        token.tag == 'mx-slot') {
        return true;
    }
    return false;
};
module.exports = {
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
        let border = attrsKV['*border'];//变量支持
        let cmd = builder.readCmd(border);//目前仅支持简单的表达式，如{{=expr}}
        if (cmd.succeed) {//成功读取变量
            //因为style属性固定出现，内容使用if控制语句即可动态控制
            styles.push(`{{if ${cmd.content}}}border-bottom: 1px solid var(--mx5-layout-title-border-color){{/if}}`);
            //data-border属性根据条件决定是否有，不固定的属性使用条件语句
            //动态属性需要buildCmd重构下指令
            let rebuildCmd = builder.buildCmd(cmd.line, '=', cmd.art, cmd.content);
            borderTest = `data-border="${rebuildCmd}?"`;//仅控制属性出现
            borderTest += ` data-border2="${rebuildCmd}?content"`//内容
            borderTest += ` data-border3="${rebuildCmd}??border3"`//不为null或undefined

        } else if ((border + '') !== 'false') {//字面量
            styles.push('border-bottom: 1px solid var(--mx5-layout-title-border-color)');
        }

        let restHTML = builder.buildInnerHTML(currentToken, exceptSlot);
        return `<div ${borderTest} ${ProcessAttr(attrsKV, styles.join(';'), {
            '*content': 1,
            '*icon-tip': 1,
            '*tip': 1,
            '*link': 1,
            '*link-text': 1,
            '*border': 1,
        }, 'mx5-clearfix')}><div>${contentSlotValue}</div>${restHTML}</div>`;
    },
    'mx-layout.title'(i) {
        let { content, attrsKV } = i;

        let styles = [
            'padding: var(--mx5-layout-title-v-gap) var(--mx5-layout-title-h-gap)'
        ];
        if ((attrsKV['*border'] + '') !== 'false') {
            styles.push('border-bottom: 1px solid var(--mx5-layout-title-border-color)');
        }

        let tmpl = `<div ${ProcessAttr(attrsKV, styles.join(';'), {
            '*content': 1,
            '*icon-tip': 1,
            '*tip': 1,
            '*link': 1,
            '*link-text': 1,
            '*border': 1,
        }, 'mx5-clearfix')}>
            <div style="float: left; display: inline-flex; height: var(--mx5-input-height); overflow: hidden; align-items: center; justify-content: center;">
                <span class="mx5-layout-title" mx-html="${attrsKV['*content']}"></span>
                ${attrsKV['*icon-tip'] ? (`<mx-popover class="mx5-iconfont mx5-iconfont-tip" style="margin-left: 4px;" *content="${attrsKV['*icon-tip']}">&#xe72f;</mx-popover>`) : ''}
                ${attrsKV['*tip'] ? (`<span style="margin-left: 16px; color: #999; font-size: 12px;" mx-html="${attrsKV['*tip']}"></span>`) : ''}
            </div>
            ${attrsKV['*link'] ? (`<a href="${attrsKV['*link']}" target="_blank" class="mx5-layout-title-link" rel="noopener noreferrer">${attrsKV['*link-text'] || '查看详情'}</a>`) : ''}
            ${content || ''}
        </div>`;
        return tmpl;
    },
    'mx-layout.body'(i) {
        let { content, attrsKV } = i;
        return `<div ${ProcessAttr(attrsKV, 'padding: var(--mx5-layout-body-v-gap) var(--mx5-layout-body-h-gap);', {
            '*content': 1
        }, 'mx5-clearfix')}>${attrsKV['*content'] || content}</div>`;
    }
};
