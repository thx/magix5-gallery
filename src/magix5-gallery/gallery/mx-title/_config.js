//magix-composer#gallery-config
let baseConfig = require('../mx-base/_config');

let ignores = {
    '*mode': 1,
    '*content': 1,
    '*tip': 1,
};
module.exports = {
    'mx-title'(i, builder) {
        let { attrsKV, content, tokensMap, id } = i;

        // 需要考虑mode为变量的情况，如<mx-title *mode="{{=mode}}"/>
        let mode = attrsKV['*mode'] || 'first';
        let modeClass = `@:./index.less:title--${mode}`;

        // 从tokensMap中拿出当前节点原始token
        let currentToken = tokensMap[id];
        let tipSlotValue = baseConfig.getSlotInnerHTMLByName(currentToken, 'tip', builder);

        // 优先使用属性*content的内容
        if (attrsKV['*content']) {
            content = attrsKV['*content'];
        } else {
            content = builder.buildInnerHTML(currentToken, baseConfig.exceptSlot);
        }
        let tip = attrsKV['*tip'] || tipSlotValue || '';
        if (tip) {
            tip = `<span class="@:./index.less:tip" mx-html="${tip}"></span>`;
        }
        return content ? `<div ${baseConfig.processAttrs(attrsKV, '', ignores, modeClass)} mx-view="${i.mxView}">
            <span class="@:./index.less:content" mx-html="${content}"></span>
            ${tip}
        </div>` : '';
    }
}