/**
 * 规范详见 https://done.alibaba-inc.com/file/BfeHD00VvQXv/myXymOLxV7CzLfCj/preview?aid=E94400E7-4A72-4B2C-9F7B-638D34E9091A
 */
import Magix5 from 'magix5';
import View from '../mx-base/view';
Magix5.applyStyle('@:index.less');
const ErrorImgs = {
    'not-found': {
        img: 'https://img.alicdn.com/tfs/TB12EOxWhv1gK0jSZFFXXb0sXXa-600-600.png',
        tip: '抱歉，您查看的页面不存在',
        btns: true
    },
    'network-error': {
        img: 'https://img.alicdn.com/tfs/TB1xcpQmA9l0K4jSZFKXXXFjpXa-600-600.png',
        tip: '网络连接失败，请检查您的网络连接',
        btns: true
    },
    'empty-content': {
        img: 'https://img.alicdn.com/tfs/TB1zGfFVFP7gK0jSZFjXXc5aXXa-600-600.png',
        tip: '暂无内容',
        btns: false
    },
    'empty-search': {
        img: 'https://img.alicdn.com/tfs/TB1My6aiQcx_u4jSZFlXXXnUFXa-600-600.png',
        tip: '暂无查询数据',
        btns: false
    },
    'no-access': {
        img: 'https://img.alicdn.com/tfs/TB14NDrVFT7gK0jSZFpXXaTkpXa-600-600.png',
        tip: '暂无访问权限',
        btns: true
    },
    'loading': {
        img: 'https://img.alicdn.com/tfs/TB1.D_xVNv1gK0jSZFFXXb0sXXa-600-600.png',
        tip: '数据计算中，请耐心等待',
        btns: false
    }
}

export default View.extend({
    tmpl: '@:index.html',
    // init(options) {
    //     this.assign(options);
    // },
    assign(options) {
        // 尺寸 normal small xsmall
        let mode;
        if (options.hasOwnProperty('mode')) {
            mode = options.mode;
        } else {
            // 容器宽度大于360且高度大于360：mode=normal（图文320*320）
            // 容器宽度小于160且高度小于160：mode=xsmall（仅展示文案不显示图片）
            // 容器宽度160 ~ 360或者高度160 ~ 360：mode=small（图文120*120）
            try {
                let { clientWidth, clientHeight } = document.getElementById(this.owner.pId);
                if (clientWidth > 360 && clientHeight > 360) {
                    mode = 'normal';
                } else if (clientWidth < 160 && clientHeight < 160) {
                    mode = 'xsmall';
                } else {
                    mode = 'small';
                }
            } catch (error) {
                mode = 'normal';
            }
        }

        let type = (options.type || 'not-found') + '';
        // 历史配置 兼容
        switch (type) {
            case '404':
                type = 'not-found';
                break;
            case '500':
            case '502':
                type = 'network-error';
                break;
        }

        // 默认配置
        let config = ErrorImgs[type] || ErrorImgs['not-found'];

        // 是否有返回首页和上一步按钮
        let btns = config.btns;
        if (options.hasOwnProperty('btns')) {
            btns = (options.btns + '' === 'true');
        }

        // 背景颜色 transparent grey
        let bg = options.bg || 'transparent';

        this.set({
            bg,
            mode,
            type,
            img: config.img,
            tip: options.tip || config.tip,
            btns
        })
    },
    render() {
        this.digest();
    },
    '@:{back}<click>'(e) {
        e.preventDefault();
        history.back();
    }
});