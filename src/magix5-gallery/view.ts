/**
 * 每次项目各自的通用方法定义
 * 具体页面继承该View
 * 包括挂在在view上的接口管理的fetch，save
 */
import Magix from 'magix5';
import ProjectService from "./services/service";
import View from './gallery/mx-base/view';
export default View.extend({

}).merge(ProjectService);
