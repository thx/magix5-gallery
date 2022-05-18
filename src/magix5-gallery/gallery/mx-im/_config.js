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
    uid: 1,
    uname: 1
};
module.exports = {
    /**
    * 钉钉
    */
    'mx-im.dd'(i) {
        let { attrsKV } = i;
        return `<a href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=${attrsKV.uid}" ${ProcessAttr(attrsKV, '', ignores)}>
            <i class="mx5-iconfont mx5-color-brand mx5-fs18">&#xe677;</i>${attrsKV.uname}
        </a>`;
    }
}