/**
 * 每次项目各自的通用方法定义
 * 具体页面继承该View
 * 包括挂在在view上的接口管理的fetch，save
 */
import Magix from 'magix5';
import ProjectService from "./services/service";
import FormSync from './gallery/mx-form/sync';
import Refs from "./gallery/mx-form/refs";
let { View, config } = Magix;
export default View.extend({

}).merge(ProjectService, FormSync, Refs, {
    ctor() {
        let attrs = this.root ? this.root.attributes : {};
        let spm = (attrs['data-spm-click'] || {})['value'] || '';
        let projectName = config<string>('projectName');
        this.set({
            pkgName: projectName,
            galleryName: 'gallery',
            spm
        });
    }
});
