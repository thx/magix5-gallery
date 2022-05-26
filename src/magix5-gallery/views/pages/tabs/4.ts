import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:4.html',
    async render() {
        const list = [
            { text: '模块1', value: 1 },
            { text: '模块2', value: 2, disabled: true },
            { text: '模块3', value: 3 },
            { text: '模块4', value: 4, disabled: true },
        ];
        await this.digest({
            list,
            selected: list[0].value,
        });
    },
    'changeTab<change>'(e) {
        const { selected, text } = e;
        console.log(selected, text);
        this.digest({
            selected,
            text,
        });
    },
});
