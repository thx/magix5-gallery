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
let ignores = {
    '*mode': 1,
    '*content': 1,
    '*tip': 1,
};
module.exports = {
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
    }
}