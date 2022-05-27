import Magix5, { Router } from 'magix5';
import View from 'magix5-gallery/view';
import Menu from 'magix5-gallery/menu';
Magix5.applyStyle('@:default.less');

export default View.extend({
	tmpl: '@:default.html',
	init() {
		// 所有路由均映射到当前view上，在这里监听路由变化
		this.observeLocation({
			path: true,
		});
	},
	async render() {
		window.scrollTo(0, 0);
		let that = this;

		// 当前路径
		let { path } = Router.parse();
		let headers = JSON.parse(JSON.stringify(Menu.menus));

		// 路径index映射
		let pathMap = {};
		headers.forEach((header, i) => {
			header.paths = header.paths || [];
			header.paths.forEach(item => {
				(item.subs || []).forEach(sub => {
					pathMap[sub.path] = i;
				})
			})
		});
		// 顶部一级导航选中态
		let curIndex = pathMap[path];
		Magix5.mix(headers[curIndex], {
			cur: true
		})

		// 当前路径所属组展开
		let list = headers[curIndex].paths;
		let cur = {}, prev = {}, next = {};
		let count = 0;
		list.forEach((item, index) => {
			Magix5.mix(item, {
				index,
				subs: item.subs || []
			})
			item.subs.forEach((sub, subIndex) => {
				count++;
				if (sub.path == path) {
					let prevItem = list[index - 1],
						nextItem = list[index + 1];
					if (item.subs[subIndex - 1]) {
						prev = item.subs[subIndex - 1];
					} else if (prevItem && prevItem.subs && prevItem.subs.length) {
						prev = prevItem.subs[prevItem.subs.length - 1];
					}

					if (item.subs[subIndex + 1]) {
						next = item.subs[subIndex + 1];
					} else if (nextItem && nextItem.subs && nextItem.subs.length) {
						next = nextItem.subs[0];
					}
					cur = {
						name: (item.name ? `${item.name}&nbsp;-&nbsp;` : '') + `${sub.fullName || sub.name}`,
						tip: sub.tip
					};
				}
			});
		});

		await that.digest({
			headers,
			count,
			list,
			cur,
			prev,
			next,
			path,
			view: `magix5-gallery/views/pages${path}`,
			minHeight: window.innerHeight
		});

		// 当前选中项滚动到可视范围之内
		let curNode = document.querySelector('.@:default.less:cur-nav');
		if (curNode) {
			if (curNode.scrollIntoViewIfNeeded) {
				curNode.scrollIntoViewIfNeeded();
			} else if (curNode.scrollIntoView) {
				curNode.scrollIntoView();
			}
		}
	},

	'$win<scroll>'(e) {
		let bd = document.querySelector('.@:default.less:base');
		let { top } = bd.getBoundingClientRect() || {};
		if (top < 0) {
			if (this.get('fixed')) { return; };
			this.digest({ fixed: true });
		} else {
			if (!this.get('fixed')) { return; };
			this.digest({ fixed: false });
		}
	},

	'$win<resize>'() {
		this.digest({
			minHeight: window.innerHeight
		});
	},
})
