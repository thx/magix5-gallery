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
    'mx-title'(i) {
        let { attrsKV } = i;
        let modeClass = ({
            first: '@:./index.less:title-first',
            second: '@:./index.less:title-second',
        })[attrsKV['*mode'] || 'first'] || '@:./index.less:title-first';

        let content = attrsKV['*content'] || i.content,
            tip = attrsKV['*tip'];

        return content ? `<div ${ProcessAttr(attrsKV, '', {
            '*mode': 1,
            '*content': 1,
            '*tip': 1,
        }, modeClass)} mx-view="${i.mxView}">
            <span class="@:./index.less:content" mx-html="${content}"></span>
            ${tip ? ('<span class="@:./index.less:tip" mx-html="' + tip + '"></span>') : ''}
        </div>` : '';
    }
}