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
    'mx-layout'(i) {
        return `<div ${ProcessAttr(i.attrsKV, null, {}, 'mx5-grid')}>${i.content}</div>`;
    },
    'mx-layout.title'(i) {
        let { content, attrsKV } = i;

        let styles = [
            'padding: var(--mx-layout-title-v-gap, 10px) var(--mx-layout-title-h-gap, 24px)'
        ];
        if ((attrsKV.border + '') !== 'none') {
            styles.push('border-bottom: 1px solid var(--mx-layout-title-color-border, #e6e6e6)');
        }

        let tmpl = `<div ${ProcessAttr(attrsKV, styles.join(';'), {
            icon: 1,
            tip: 1,
            'icon-tip': 1,
            border: 1,
            content: 1
        }, 'clearfix')}>`;

        // 标题，提示，icon
        tmpl += '<div style="float: left; display: inline-flex; height: var(--input-height); overflow: hidden; align-items: center; justify-content: center;">';
        if (attrsKV.icon) {
            tmpl += `<span style="margin-right: 4px; color: #ccc;">${attrsKV.icon}</span>`;
        }
        tmpl += `<span class="grid-title" style="margin-right: 16px;">${attrsKV.content}${attrsKV['icon-tip'] ? `<mx-popover class="mc-iconfont mc-tip-iconfont" tag="i" width="220" content="${attrsKV['icon-tip']}">&#xe72f;</mx-popover>` : ''}</span>`;
        if (attrsKV.tip) {
            tmpl += `<span style="margin-right: 16px; color: #999; font-size: 12px;">${attrsKV.tip}</span>`;
        }
        tmpl += '</div>';

        // 筛选项
        if (content) {
            tmpl += `${content}`;
        }

        tmpl += '</div>';
        return tmpl;
    },
    'mx-layout.body'(i) {
        let { content, attrsKV } = i;
        return `<div ${ProcessAttr(attrsKV, 'padding: var(--mx-layout-body-v-gap, 16px) var(--mx-layout-body-h-gap, 24px);', {
            content: 1
        }, 'clearfix')}>${content}</div>`;
    }
};
