import Magix5 from 'magix5';
import View from 'magix5-gallery/views/pages/base/demo';

export default View.extend({
    tmpl: '@:6.html',
    render() {
        this.digest({
            searchList: [{
                text: '计划',
                value: 'campaign'
            }, {
                text: '单元',
                value: 'adgroup'
            }],
            searchValue1: 'adgroup',
            value1: '',
            searchValue2: 'campaign',
            value2: '',
            value: '',
        })
    }
})