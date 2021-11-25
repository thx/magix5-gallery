// magix-composer#loader=none;
'@:./lib/sea.js'
'@:./lib/magix.js';

(() => {
	const node = document.getElementById('boot') as HTMLScriptElement;
	const src = node.src.replace('/boot.js', '')
	const projectName = 'magix5-gallery';
	const defaultView = `${projectName}/views/default`,
		emptyView = `${projectName}/views/empty`;

	let seajs = window.seajs;
	seajs.config({
		paths: {
			[projectName]: src + '/' + projectName
		}
	})

	seajs.use(['magix5', 'magix5-gallery/menu'], (Magix: Magix5.Magix, Menu) => {
		// 全局样式，不编译
		let globalStyle = `style@:./magix5-gallery/gallery/mx-style/index.less`;
		Magix.applyStyle('@:moduleId' + 'ext.style', globalStyle);

		// 变量覆盖 todo
		// let varsString = `style@:./magix5-gallery/assets/group_override.less`;
		// Magix.applyStyle('@:moduleId' + 'ext.style', varsString);

		// 项目全局，项目前缀
		let scopedStype = `style@:./magix5-gallery/assets/base.less`;
		Magix.applyStyle('@:scoped.style', scopedStype);

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
			Magix.boot({
				defaultPath: '/btn/index',
				defaultView: '/default',
				unmatchView: `${projectName}/gallery/mx-error/index`,
				routes,
				rootId: 'app',
				error(e) {
					console.error(e);
				}
			})
		})
	})
})()
