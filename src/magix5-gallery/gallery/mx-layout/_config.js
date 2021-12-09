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
module.exports = {
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
            ${attrsKV['*link'] ? (`<a href="${attrsKV['*link']}" target="_blank" class="mx5-layout-title-link">${attrsKV['*link-text'] || '查看详情'}</a>`) : ''}
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
