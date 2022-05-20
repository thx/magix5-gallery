import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:3.html',
    async render() {
        const list = [
            {
                text: '模块1',
                name: 'name1',
                desc: 'Module1',
                flag: 1,
                age: 15,
                value: 100,
            },
            {
                text: '模块2',
                name: 'name2',
                desc: 'Module2',
                flag: 2,
                age: 16,
                value: 200,
            },
            {
                text: '模块3',
                name: 'name3',
                desc: 'Module3',
                flag: 3,
                age: 17,
                value: 300,
            },
            {
                text: '模块4',
                name: 'name4',
                desc: 'Module4',
                flag: 4,
                age: 18,
                value: 400,
            },
        ];
        await this.digest({
            list,
            selected1: list[0].value,
            selected2: list[0].age,
            selected3: list[0].flag,
        });
    },
});
