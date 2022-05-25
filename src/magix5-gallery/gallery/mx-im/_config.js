//magix-composer#gallery-config
let baseConfig = require('../mx-base/_config');

let ignores = {
    uid: 1,
    uname: 1,
    '*uid': 1,
    '*uname': 1
};
module.exports = {
    /**
    * 钉钉
    */
    'mx-im.dd'(i) {
        let { attrsKV } = i;
        return `<a href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=${attrsKV['*uid'] || attrsKV.uid}" ${baseConfig.processAttrs(attrsKV, '', ignores)}>
            <i class="mx5-iconfont mx5-color-brand mx5-fs18">&#xe677;</i>${attrsKV['*uname'] || attrsKV.uname}
        </a>`;
    }
};