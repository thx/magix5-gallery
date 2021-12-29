//magix-composer#gallery-config

module.exports = {
    'mx-loading.test'(node) {
        let brand = node.attrsKV['*brand'];
        let inner = '';
        if (brand == 'true') {
            inner = `<picture class="@:./index.less:m-img">
                <source class="@:./index.less:m-img" type="image/webp" srcset="https://img.alicdn.com/imgextra/i4/O1CN01UlNpXg1pByutEZSoc_!!6000000005323-49-tps-96-96.webp">
                <source class="@:./index.less:m-img" type="image/png" srcset="https://img.alicdn.com/imgextra/i2/O1CN01YkLhgX1TS5IDT9kJJ_!!6000000002380-54-tps-96-96.apng">
                <img class="@:./index.less:m-img" src="https://img.alicdn.com/imgextra/i2/O1CN01DpsTcB1Kdgmtb59n5_!!6000000001187-1-tps-48-48.gif" />
            </picture>`;
        } else {
            inner = `<svg class="@:./index.less:bg" 
                width="36" 
                height="36" 
                viewBox="18 18 36 36">
                <defs>
                    <lineargradient id="{{= $viewId }}_colors" x1="0%" y1="0%" x2="100%" y2="64.9%">
                        <stop offset="0%" stop-color="var(--mx5-color-brand)"></stop>
                        <stop offset="100%" stop-color="var(--mx5-color-brand)"></stop>
                    </lineargradient>
                </defs>
                <circle
                    cx="36"
                    cy="36"
                    r="16"
                    fill="none" 
                    stroke="#DEE1E8"
                    stroke-width="4" 
                    stroke-miterlimit="10"/>
                <circle class="@:./index.less:path" 
                    cx="36"
                    cy="36"
                    r="16"
                    fill="none" 
                    stroke="url(#{{= $viewId }}_colors)"
                    stroke-width="4"
                    stroke-miterlimit="10"/>
            </svg>`;
        }
        return `<div mx-role="mx5-loading" mx-view="${node.mxView}"><div style="height:${brand ? '100vh' : '200px'}" class="@:./index.less:wrapper">${inner}</div></div>`
    }
}