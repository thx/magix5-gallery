import Magix from 'magix5';

let { View, applyStyle, dispatch, mark, inside } = Magix;
applyStyle('@:./index.less');

export default View.extend({
    init() {
        this.on('destroy', () => {
            this['@:{stop.auto.play}']();

            // if (this['@{mousewheel.delay.timer}']) {
            //     clearTimeout(this['@{mousewheel.delay.timer}']);
            // }

            // if (this['@{transition.end.timer}']) {
            //     clearTimeout(this['@{transition.end.timer}']);
            // }
        });
    },
    assign(data) {
        let { root } = this;
        let carouselRoot = root.querySelector(':scope>[mx5-carousel-root]');
        let panelsRoot = carouselRoot.querySelector(':scope>[mx5-carousel-panels]');
        let panels = panelsRoot.querySelectorAll(':scope>[mx5-carousel-panel]');
        let vertical = (data.vertical + '') === 'true';
        this['@:{carousel.root}'] = carouselRoot;
        this['@:{panels.root}'] = panelsRoot;
        let active = data.active || 0;
        let len = panels.length;
        if (active < 0) {
            active = 0;
        } else if (active > len - 1) {
            active = len - 1;
        }
        this['@:{data}'] = data;
        this['@:{start.autoplay.bind}'] = this['@:{start.auto.play}'].bind(this);
        //this.set(data);
        this.set({
            mode: data.mode || 'carousel',
            width: data.width || this.root.offsetWidth || 400,
            height: data.height || 200,
            active, // 当前第几帧动画
            duration: data.duration || '.5s', // 动画持续时间
            interval: (data.interval | 0) || 3000, // 播放暂停间隔，单位毫秒
            triggers: (data.triggers + '') === 'true', // 是否显示轮播点，默认不显示
            triggerHook: data.triggerHook,
            timing: data.timing || 'ease-in-out',
            dots: (data.dots + '') !== 'false', // 是否显示轮播点，默认显示
            dotWrapperClass: `@:./index.less:dot-types--${(vertical ? 'v' : 'h')}-${(data.dotType || 'dot-in-center')}`,
            multiPanels: len > 1,
            autoplay: (data.autoplay + '') === 'true' && len > 1,  // 是否自动播放
            vertical,
            panels,
        });
    },
    render() {
        let active = this.get('active');
        let autoplay = this.get('autoplay');
        this['@:{update.stage.size}']();
        this['@:{append.controls}']();
        this['@:{to.panel}'](active, true);
        if (autoplay) {
            this['@:{start.auto.play}']();
        }
    },
    '@:{append.controls}'() {
        let { triggers, multiPanels, dots, panels, dotWrapperClass } = this.get();
        let carouselRoot = this.root as HTMLDivElement;
        //使用同一个轮播对象的情况下，先清理节点
        let triggerNodes = carouselRoot.querySelectorAll(':scope>[mx5-carousel-trigger]');
        for (let n of triggerNodes) {
            carouselRoot.removeChild(n);
        }
        let dotNodes = carouselRoot.querySelectorAll(':scope>[mx5-carousel-dots]');
        for (let n of dotNodes) {
            carouselRoot.removeChild(n);
        }
        if (multiPanels) {
            if (dots) {
                let dotInner = '';
                for (let i = 0; i < panels.length; i++) {
                    dotInner += `<span mx5-carousel-dot="${i}" class="@:index.less:dot"></span>`;
                }
                carouselRoot.insertAdjacentHTML('beforeend', `<div class="@:./index.less:dots ${dotWrapperClass}" mx5-carousel-dots>${dotInner}</div>`);
            }
            if (triggers) {
                carouselRoot.insertAdjacentHTML('beforeend', `<i mx5-carousel-trigger="left" class="@:./index.less:{triggers,triggers-left} mx5-iconfont">&#xe6c4;</i><i mx5-carousel-trigger="right" class="@:./index.less:{triggers,triggers-right} mx5-iconfont">&#xe6c4;</i>`);
            }
        }
    },
    async '@:{to.panel}'(index, immediate) {
        if (this['@:{animating}']) {
            return;
        }
        index = +index;
        let { mode, duration,
            timing, width, height,
            vertical, panels, triggerHook } = this.get();
        let dt = (+(duration + '').replace('s', '')) * 1000;
        let cName = '@:./index.less:active';
        let len = panels.length;
        let oldActive = +this.get('active');
        let active = ((index >= len) ? 0 : ((index < 0) ? (len - 1) : index));
        let toPanelMark = mark(this, '@:{to.panel}');
        let carouselRoot = this.root;

        let toPanel = () => {
            if (!immediate) {
                // 防止快速重复点击
                this['@:{animating}'] = true;
            }
            this.set({
                active
            });
            // 高亮对应的节点
            //that.updater.set({ active });

            // 同一帧重复点击不会触发动画，回置到非动画态
            if ((oldActive == active) && this['@:{animating}']) {
                this['@:{animating}'] = false;
            }

            // // 底部操作点，每帧可能轮播点样式不同
            // that['@{dots.node}'].removeClass(cName).eq(active).addClass(cName);
            // let { dotWrapperStyleList, dotWrapperStyles } = that.updater.get();
            // let dotWrapper = that['@{dots.node}'].parent('.@index.less:dots');
            // dotWrapper.attr('style', dotWrapperStyleList[active] || dotWrapperStyles);

            let dotNodes = carouselRoot.querySelectorAll(':scope>[mx5-carousel-dots]>[mx5-carousel-dot]');
            for (let dn of dotNodes) {
                dn.classList.remove(cName);
            }
            let activeaNode = dotNodes[active];
            if (activeaNode) {
                activeaNode?.classList.add(cName);
            }

            switch (mode) {
                case 'carousel':
                    // 平滑轮播时需要调整位置
                    if (oldActive == 0 && index == -1) {
                        // 从第一帧到最后一帧
                        let style = panels[len - 1].style;
                        if (vertical) {
                            style.top = -height + 'px';
                        } else {
                            style.left = -width + 'px';
                        }
                    } else if (oldActive == len - 1 && index == len) {
                        let style = panels[0].style;
                        if (vertical) {
                            style.top = height * len + 'px';
                        } else {
                            style.left = width * len + 'px';
                        }
                    }
                    let style = [
                        'transform', `translate3d(${vertical ? `0,${(0 - index * height)}px` : `${(0 - index * width)}px,0`},0)`,
                        'transition', `transform ${duration} ${immediate ? 0 : timing}`
                    ];
                    let panelsRootStyle = this['@:{panels.root}'].style;
                    for (let i = 0; i < style.length; i += 2) {
                        let key = style[i],
                            value = style[i + 1];
                        panelsRootStyle[key] = value;
                    }
                    setTimeout(() => {
                        // 动画完成之后再纠正
                        if (toPanelMark()) {
                            for (let i = 0; i < len; i++) {
                                let style = panels[i].style;
                                if (vertical) {
                                    style.top = height * i + 'px';
                                } else {
                                    style.left = width * i + 'px';
                                }
                            }
                            panelsRootStyle.transition = '';
                            panelsRootStyle.transform = `translate3d(${vertical ? `0,${(0 - active * height)}px` : `${(0 - active * width)}px,0`},0)`;
                            this['@:{animating}'] = false;
                        }
                    }, dt);
                    break;

                case 'fade':
                    // fade顺序不会改变，直接纠正
                    // 最后一帧往后回到第一帧
                    // 第一帧往前到最后一帧
                    // 当前帧挪到最上方
                    for (let i = 0; i < len; i++) {
                        let style = panels[i].style;
                        if (i == active) {
                            style.transition = `opacity ${duration} ${timing}`;
                            style.zIndex = 3;
                            style.opacity = 1;
                        } else {
                            style.zIndex = 2;
                            style.opacity = 0;
                        }
                    }

                    setTimeout(() => {
                        if (toPanelMark()) {
                            this['@:{animating}'] = false;
                        }
                    }, dt);
                    break;
            }

            if (!immediate) {
                dispatch(this.root, 'change', {
                    active
                });
            }
        }

        if (triggerHook) {
            try {
                await triggerHook(oldActive, active);
                if (toPanelMark()) {
                    toPanel();
                }
            } catch (ex) {
                console.log(ex);
            }
        } else {
            toPanel();
        }
    },
    '@:{update.stage.size}'() {
        let { width, height, mode, vertical, panels } = this.get();
        let len = panels.length;
        switch (mode) {
            case 'carousel':
                // 跑马灯
                for (let i = 0; i < len; i++) {
                    let style = [
                        'position', 'absolute',
                        'width', width + 'px',
                        'height', height + 'px'
                    ];
                    if (vertical) {
                        style.push('top', height * i + 'px',
                            'left', '0');
                    } else {
                        style.push('top', '0', 'left', width * i + 'px');
                    }
                    for (let j = 0; j < style.length; j += 2) {
                        let key = style[j],
                            value = style[j + 1];
                        panels[i].style[key] = value;
                    }
                }
                break;

            case 'fade':
                // 渐显渐隐
                for (let i = 0; i < len; i++) {
                    let style = panels[i].style;
                    style.position = 'absolute';
                    style.opacity = 0;
                    style.top = 0;
                    style.left = 0;
                    style.width = width + 'px';
                    style.height = height + 'px';
                }
                break;
        }
        let panelsRootStyle = this['@:{panels.root}'].style;
        let carouselRootStyle = this['@:{carousel.root}'].style;
        if (vertical) {
            panelsRootStyle.height = len * height + 'px';
            panelsRootStyle.width = width + 'px';
        } else {
            panelsRootStyle.height = height + 'px';
            panelsRootStyle.width = len * width + 'px';
        }
        carouselRootStyle.width = width + 'px';
        carouselRootStyle.height = height + 'px';
    },
    '@:{start.auto.play}'() {
        this['@:{stop.auto.play}']();
        let autoMark = mark(this, '@:{autoplay.mark}');
        // interval  轮播间隔时间
        // duration  轮播动画时间
        let { interval, duration } = this.get();
        let dt = +(duration + '').replace('s', '');
        this['@:{play.task}'] = setInterval(() => {
            if (autoMark()) {
                let active = this.get('active');
                this['@:{to.panel}'](++active);
            }
        }, interval + dt * 1000);
    },

    '@:{stop.auto.play}'() {
        if (this['@:{over.timer}']) {
            clearTimeout(this['@:{over.timer}']);
        }
        if (this['@:{play.task}']) {
            clearInterval(this['@:{play.task}']);
        }
    },
    '@:{resize}'() {
        let data = this['@:{data}'];
        let active = this.get('active');
        let root = this.root;
        this.set({
            width: data.width || root.offsetWidth || 400,
            height: data.height || 200
        });
        this['@:{update.stage.size}']();
        this['@:{to.panel}'](active, true);
    },
    '@:{trigger}'(offset) {
        let { active, multiPanels } = this.get();

        // 大于一帧才可轮播
        if (multiPanels) {
            active = (+active) + (+offset);
            this['@:{to.panel}'](active);
        }
    },
    /**
     * 外部调用，下一帧
     */
    next() {
        this['@:{trigger}'](1);
    },

    /**
     * 外部调用，上一帧
     */
    prev() {
        this['@:{trigger}'](-1);
    },

    /**
     * 外部调用，直接跳转
     */
    to(index) {
        this['@:{to.panel}'](index);
    },
    '$[mx5-carousel-trigger]<click>'(e: Magix5.MagixMouseEvent) {
        e.preventDefault();
        let value = e.eventTarget.getAttribute('mx5-carousel-trigger');
        this['@:{trigger}'](value == 'left' ? -1 : 1);
    },
    '$[mx5-carousel-dot]<click>'(e) {
        e.preventDefault();
        let index = +e.eventTarget.getAttribute('mx5-carousel-dot');
        if (index == this.get('active')) {
            return;
        }
        this['@:{to.panel}'](index);
    },
    '$root<pointerover>'(e) {
        let pointerIn = !inside(e.relatedTarget, e.eventTarget);
        if (pointerIn) {
            this['@:{stop.auto.play}']();
        }
    },
    '$root<pointerout>'(e: Magix5.MagixMouseEvent) {
        let pointerOut = !inside(e.relatedTarget, e.eventTarget);
        if (pointerOut) {
            let autoplay = this.get('autoplay');
            if (autoplay) {
                this['@:{over.timer}'] = setTimeout(this['@:{start.autoplay.bind}'], 50);
            }
        }
    },
    '$win<resize>'() {
        this['@:{resize}']();
    }
});