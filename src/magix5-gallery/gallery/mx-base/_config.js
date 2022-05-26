//magix-composer#gallery-config
module.exports = {
    processAttrs(attrs, style, ignores, className) {
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
    },
    exceptSlot(type, token) {
        if (type == 'child' &&
            token.tag == 'mx-slot') {
            return true;
        }
        return false;
    },
    getSlotInnerHTMLByName(token, name, builder) {
        //如果有子节点，则从子节点中查找mx-slot节点
        let html = '';
        if (token.children) {
            for (let c of token.children) {
                let { tag, attrsKV } = c;
                if (tag == 'mx-slot') {
                    //查找<mx-slot name="tip"节点
                    if (attrsKV &&
                        attrsKV.name == name) {
                        //根据token生成相应的innerHTML字符串
                        html = builder.buildInnerHTML(c);
                    }
                }
            }
        }
        return html;
    }
};