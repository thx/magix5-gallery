// magix-composer#loader=none;

'@:./lib/sea.js'
'@:./lib/magix.js';
(() => {
  const node = document.getElementById('boot') as HTMLScriptElement;
  const src = node.src.replace('/boot.js', '')
  const projectName = 'magix5-scaffold';
  let seajs = window.seajs;
  seajs.config({
    paths: {
      [projectName]: src + '/' + projectName
    }
  })

  seajs.use(['magix5'], (Magix: Magix5.Magix) => {
    Magix.attach(window, 'loginout', () => {
      const loc = Magix.Router.parse()
      if (loc.hash.path != '/login/index') {
        location.href = 'index.html?mxredirectUrl=' + encodeURIComponent(location.href) + '#!/login/index'
      }
    });
    Magix.applyStyle('@:{mx-style.group}', 'style@:./magix5-scaffold/gallery/mx-style/group.less');
    Magix.applyStyle('@:{mx-style.normalize}', 'style@:./magix5-scaffold/gallery/mx-style/normalize.less');
    Magix.applyStyle('@:{mx-style.icons}', 'style@:./magix5-scaffold/gallery/mx-style/icons.less');
    // Magix.applyStyle('@global.style')

    // medusa：国际版配置
    //      组件里面会优先读取magix.config配置的语言环境
    //      如果需要国际化，则在此处理好配置即可
    //      如不需要国际化，则固定传入zh-cn即可
    Magix.config({
      medusa: 'zh-cn',
      projectName,
      [`${projectName}.resource`]: src
    });
    const usePrepare = () => {
      return new Promise(resolve => {
        seajs.use([`${projectName}/prepare`], (Prepare) => {
          Promise.all([Prepare.default()])
            .then(resolve)
            .catch(resolve)
        })
      })
    }
    // seajs.use([projectName + '/dataplus/dataplus/analysis', projectName + '/dataplus/dataplus/index'], () => {
    usePrepare().then(() => {
      // const deps = ['scroll'];
      // [
      //   '/menu',
      //   '/gallery/mx-form/index',
      //   '/gallery/mx-form/validator',
      //   '/gallery/mx-dialog/index',
      //   '/format'
      // ].forEach(p => {
      //   deps.push(projectName + p)
      // })

      // seajs.use(deps, (Scroll, Menu, Form, Validator, Dialog, FormatFn) => {
      //   Magix.View.merge(Form, Validator, Dialog, {
      //     ctor() {
      //       this.updater.set({
      //         viewId: this.id,
      //         pkgName: projectName,
      //         formatHelper: FormatFn.default
      //       })
      //     }
      //   })

      // const { defaultPath, defaultView, routes, menus } = Menu.default.menuConfig()
      // Magix.config({
      //   [`${projectName}.menus`]: menus
      // })
      // const tracker = new Tracker({
      //   pid: projectName,
      //   uidResolver: () => {
      //     const user = Magix.config(projectName + '.user')
      //     return user.userId
      //   }
      // })

      Magix.boot({
        defaultPath: '/index',
        defaultView: '/default',
        unmatchView: projectName + '/views/pages/common/error',
        routes: {
          '/index': projectName + '/views/default'
        },
        rootId: 'app',
        error(e) {
          console.error(e)
          // tracker.logError(e, {
          //   code: 11 // 自定义的错误类型
          // })
        }
      })

      // 预加载静态资源
      // seajs.use([`${projectName}/preloadModule`], (preload) => {
      //   preload.default.start()
      // })

      // 对原生异步promise等进行捕获
      // tracker.install()
      // })
    })
  })
  // })
})()
