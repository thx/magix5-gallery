import State from '../../../gallery/mx-inspector/state';
import View from './demo';
export default View.extend({
    tmpl: '@:./state-1.html',
    init() {
        let statusList = [];
        State.watch(this.root, () => {
            statusList.push(`${this.id} 自身及所有子view(如果有)渲染完成 ${this.get('time')}`);
            this.digest({
                status: statusList
            })
        }, () => {
            statusList.push(`${this.id} 有子view销毁 ${this.get('time')}`);
            this.digest({
                status: statusList
            });
        });
        this.on('destroy', () => {
            State.remove(this.root);
        });
    },
    render() {
        this.digest({
            show: true,
            time: Date.now()
        });
    },
    'toggleChildren<click>'() {
        this.digest({
            show: !this.get('show'),
            time: Date.now()
        });
    }
})