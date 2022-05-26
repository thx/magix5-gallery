//magix-composer#gallery-config
let baseConfig = require('../mx-base/_config');

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
        return `<${tag} mx-view="${mxView}" ${baseConfig.processAttrs(attrsKV, '', ignores)} mx5-role="mx5-carousel">
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