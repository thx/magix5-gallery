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
    tag: 1
}
module.exports = {
    // 'mx-carousel': {
    //     'mx-role': 'mx5-carousel',
    //     tag: 'div'
    // },
    'mx-carousel'(i) {
        let { content, attrsKV, mxView } = i;
        let tag = attrsKV.tag || 'div';
        return `<${tag} mx-view="${mxView}" ${ProcessAttr(attrsKV, '', ignores)} mx5-role="mx5-carousel">
            <div mx5-carousel-root>
                <div mx5-carousel-panels>${content}</div>
            </div>
        </${tag}>`;
    },
    'mx-carousel.panel'(i) {
        let { content, attrs } = i;
        return `<div ${attrs} mx5-carousel-panel>${content}</div>`;
    }
}