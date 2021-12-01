
import Magix5 from 'magix5';

export default {
    mxCopy(text) {
        if (navigator.clipboard) {
            // https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard
            return navigator.clipboard.writeText(text);
        } else {
            return new Promise((resolve, reject) => {
                try {
                    if (document.execCommand) {
                        // 已废弃，Clipboard 替代

                        // 创建节点
                        let input = document.createElement('input');
                        document.body.appendChild(input);
                        input.id = this.id + Magix5.guid('mx5-copy-');
                        input.style.position = 'absolute';
                        input.style.opacity = '0';
                        // input.setAttribute('readonly', 'readonly');
                        input.setAttribute('value', text);
                        input.select();

                        // 复制
                        document.execCommand('copy');

                        // 移除节点
                        document.body.removeChild(input);
                    } else if (window.clipboardData) {
                        window.clipboardData.setData('Text', text);
                    }

                    resolve();
                } catch (e) {
                    reject();
                }
            })
        }
    }
}