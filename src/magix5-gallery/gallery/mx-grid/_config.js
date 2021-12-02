//magix-composer#gallery-config

let DirectionMap = {
    'row': 'row',
    'col': 'column'
}
let JustifyMap = {
    'left': 'flex-start',
    'right': 'flex-end',
    'center': 'center',
    'space-between': 'space-between',
    'space-around': 'space-around'
}
let AlignMap = {
    'top': 'flex-start',
    'bottom': 'flex-end',
    'center': 'center',
    'stretch': 'stretch'
}

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
    'mx-grid.row'(i) {
        let { content, attrsKV } = i;

        let styles = [
            'display: flex'
        ]
        if (attrsKV.width) {
            styles.push(`width: ${attrsKV.width}`);
        }
        if (attrsKV.height) {
            styles.push(`height: ${attrsKV.height}`);
        }

        let direction = DirectionMap[attrsKV.direction || 'row'] || 'row';
        styles.push(`flex-direction: ${direction}`);

        let justify = JustifyMap[attrsKV.justify || 'left'] || 'flex-start';
        styles.push(`justify-content: ${justify}`);

        let align = AlignMap[attrsKV.align || 'stretch'] || 'stretch';
        styles.push(`align-items: ${align}`);

        let gutter = attrsKV.gutter || 0;
        styles.push(`--mx-grid-gutter: ${gutter}`);
        if (direction == 'row') {
            styles.push(`margin-left: calc(0px - var(--mx-grid-gutter) / 2)`);
            styles.push(`margin-right: calc(0px - var(--mx-grid-gutter) / 2)`);
        } else {
            styles.push(`margin-top: calc(0px - var(--mx-grid-gutter) / 2)`);
            styles.push(`margin-bottom: calc(0px - var(--mx-grid-gutter) / 2)`);
        }

        return `<div ${ProcessAttr(attrsKV, styles.join(';'), {
            width: 1,
            height: 1,
            direction: 1,
            justify: 1,
            align: 1,
            gutter: 1,
            content: 1
        })}>${content}</div>`;
    },
    'mx-grid.col'(i) {
        let { content, attrsKV, nodesMap, pId } = i;
        let styles = [];
        let pNode = nodesMap[pId];

        // width > flex
        if (attrsKV.width) {
            styles.push(`flex: 0 0 ${attrsKV.width}`);
        } else {
            let flex = attrsKV.flex || 1;
            styles.push(`flex: ${flex}`);
        }

        if (attrsKV.height) {
            styles.push(`height: ${attrsKV.height}`);
        }

        if (pNode.tag == 'mx-grid.row' &&
            pNode.attrsKV.gutter) {
            if (pNode.attrsKV.direction == 'col') {
                styles.push(`margin-top: calc(var(--mx-grid-gutter) / 2)`);
                styles.push(`margin-bottom: calc(var(--mx-grid-gutter) / 2)`);
            } else {
                styles.push(`margin-left: calc(var(--mx-grid-gutter) / 2)`);
                styles.push(`margin-right: calc(var(--mx-grid-gutter) / 2)`);
            }
        }

        return `<div ${ProcessAttr(attrsKV, styles.join(';'), {
            width: 1,
            height: 1,
            content: 1
        })}>${content}</div>`;
    }
};
