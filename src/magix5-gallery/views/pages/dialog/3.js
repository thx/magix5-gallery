import Base from '../base/doc';
import Dialog from '../../../gallery/mx-dialog/index';

module.exports = Base.extend({
    tmpl: '@:./3.html',
    render() {
        this.digest();
    },
    'open1<click>'(e) {
        // this.mxDialog(viewPath[string], viewOptions[object], dialogOptions[object])
        //      viewPath: 'dialog view路径'
        //      viewOptions: {
        //          传入dialog的数据，挂载当前dialog实体
        //      }
        //      dialogOptions: { //浮层样式覆盖
        //          width:'宽度',
        //          height:'高度',
        //          modal: 'true or false，是否允许滚动',
        //          mask: 'true or false，是否有遮罩',
        //          closable: 'true or false，是否有右上角关闭按钮'
        //          left: '最终定位相对于屏幕左侧',
        //          top: '最终定位相对于屏幕高侧'
        //      }
        this.mxDialog('@:./multi', {
            number: 1,
            width: 800
        });
    }
}).merge(Dialog);