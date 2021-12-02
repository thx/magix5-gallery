// magix-composer#loader=none;
'src@:./lib/sea.js'
'src@:./lib/magix.js';

(() => {
	const node = document.currentScript as HTMLScriptElement;
	const src = node.src.replace(/[^\/]+$/, '');
	const projectName = 'magix5-gallery';
	const defaultView = `${projectName}/views/default`,
		emptyView = `${projectName}/views/empty`;

	let seajs = window.seajs;
	seajs.config({
		paths: {
			[projectName]: src + projectName
		}
	})

	seajs.use(['magix5', 'magix5-gallery/menu'], (Magix5: Magix5.Magix, Menu) => {
		// 动态加载
		Magix5.View.merge({
			ctor() {
				this.set({
					pkgName: projectName,
					galleryName: 'gallery',
				});
			}
		});

		// 全局样式，不编译
		Magix5.applyStyle(`as@:./magix5-gallery/gallery/mx-style/index.less`);

		// 变量覆盖 todo
		// let varsString = `style@:./magix5-gallery/assets/group_override.less`;
		// Magix.applyStyle('@:moduleId' + 'ext.style', varsString);

		// 项目全局，项目前缀
		Magix5.applyStyle('@:scoped.style');

		// 国际版方案todo
		//      组件里面会优先读取magix.config配置的语言环境
		//      如果需要国际化，则在此处理好配置即可
		//      如不需要国际化，则固定传入zh-cn即可
		// Magix.config({
		// 	medusa: 'zh-cn',
		// 	projectName,
		// 	[`${projectName}.resource`]: src
		// });

		const usePrepare = () => {
			return new Promise(resolve => {
				seajs.use([`${projectName}/prepare`], (Prepare) => {
					Promise.all([Prepare.default()])
						.then(resolve)
						.catch(resolve)
				})
			})
		};

		let routes = {};
		let { menus } = Menu.default;
		menus.forEach(m => {
			m.paths.forEach(p => {
				p.subs.forEach(s => {
					routes[s.path] = defaultView;
				})
			})
		})

		usePrepare().then(() => {
			Magix5.boot({
				defaultPath: '/btn/index',
				defaultView: '/default',
				unmatchView: `${projectName}/gallery/mx-error/index`,
				routes,
				rootId: 'app',
				projectName,
				error(e) {
					console.error(e);
				}
			})
		})
	})
})()
