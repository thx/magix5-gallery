
/**
 * @chongzhi @mozhi
 * 来自rap的项目所有接口集合，该文件由 mm models 命令自动生成，请勿手动更改！
 * 新增接口请在rap上添加，然后执行 mm models 会自动更新本文件
 */

module.exports = [

  // 获取万堂书院详情 - 3871#108050
  {
    "name": "course_get_get",
    "method": "GET",
    "url": "https://shuyuan.taobao.com/course/get.json"
  },
  // 【未登录】获取组件列表 - 3871#119963
  {
    "name": "unlogin_component_findUnLoginList__get",
    "method": "GET",
    "url": "/unlogin/component/findUnLoginList/"
  },
  // 【未登录】获取千牛触达信息 - 3871#120638
  {
    "name": "unlogin_reach_findLoginMainPage_get",
    "method": "GET",
    "url": "/unlogin/reach/findLoginMainPage.json"
  },
  // 【组件本地开发 】查询菜单 - 3871#123106
  {
    "name": "unloginapi_component_findMenuList_get",
    "method": "GET",
    "url": "/unloginapi/component/findMenuList.json"
  },
  // 【组件本地开发 】查询组件 - 3871#123158
  {
    "name": "unloginapi_component_findComponentList_{componentCode}_get",
    "method": "GET",
    "url": "/unloginapi/component/findComponentList/{componentCode}.json"
  },
  // 【组件本地开发 】查询常量 - 3871#123159
  {
    "name": "unloginapi_component_findSiteConstantList_get",
    "method": "GET",
    "url": "/unloginapi/component/findSiteConstantList.json"
  },
  // 【组件本地开发 】查询分支菜单 - 3871#123161
  {
    "name": "unloginapi_component_findAdcBranchMenuList_get",
    "method": "GET",
    "url": "/unloginapi/component/findAdcBranchMenuList.json"
  },
  // 【组件本地开发 】查询分支组件 - 3871#123164
  {
    "name": "unloginapi_component_findAdcBranchComponentList_{componentCode}_get",
    "method": "GET",
    "url": "/unloginapi/component/findAdcBranchComponentList/{componentCode}.json"
  },
  // 【组件本地开发 】查询分支常量 - 3871#123165
  {
    "name": "unloginapi_component_findAdcBranchSiteConstantList_get",
    "method": "GET",
    "url": "/unloginapi/component/findAdcBranchSiteConstantList.json"
  },
  // 【已登录】获取组件列表 - 3871#123189
  {
    "name": "component_findComponentList_get",
    "method": "GET",
    "url": "/component/findComponentList.json"
  },
  // 【已登录】获取组件restful格式 - 3871#123191
  {
    "name": "component_findList__get",
    "method": "GET",
    "url": "/component/findList/"
  },
  // 一站式alp配置接口副本 - 3871#123195
  {
    "name": "one-stop__get",
    "method": "GET",
    "url": "https://mo.m.taobao.com/one-stop/"
  },
  // 用户信息 - 3871#127256
  {
    "name": "loginUser_info_get",
    "method": "GET",
    "url": "/loginUser/info.json"
  },
  // 【组件本地开发 】查询登陆页adc配置 - 3871#138469
  {
    "name": "unloginapi_component_findAdcBranchComponentList_module_login_get",
    "method": "GET",
    "url": "/unloginapi/component/findAdcBranchComponentList/module_login.json"
  },
  // 【组件本地开发 】查询登陆页adc配置(已登录) - 3871#138470
  {
    "name": "component_findList_module_login_get",
    "method": "GET",
    "url": "/component/findList/module_login.json"
  }
]
