import ProjectView from '../view'
import Magix5 from 'magix5';

let { applyStyle, mark } = Magix5;
applyStyle('@:./default.less')

export default ProjectView.extend({
  tmpl: '@:./default.html',
  async render() {
    let renderMark = mark(this, '@:{render.mark}');
    // let [bag] = await this.fetch({
    //   name: 'api_tag_topic_list_get'
    // });
    // let list = bag.get('data.list', []);
    if (renderMark()) {
      await this.digest({
        user: {
          name: 'magix5-gallery'
        },
        list: [{
          month: 1,
        }, {
          month: 2,
        }]
      })
    }
  },
  'log<click>'() {
    console.log(this.get(), this.$refs);
  }
});