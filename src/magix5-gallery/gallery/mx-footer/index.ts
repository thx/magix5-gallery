/**
 * 版权信息：https://yuque.antfin-inc.com/fe-p2/sg5kfn/gxm1ua
 */
import Magix5, { applyStyle, mark } from 'magix5';
import BaseView from '../mx-base/view';
applyStyle('@:./index.less');

export default BaseView.extend({
    tmpl: '@:./index.html',
    assign(options) {
        // 宽度范围修正
        let width = options.width || 1000;
        let maxWidth = window.innerWidth;
        if (+width > maxWidth) {
            width = maxWidth;
        }

        // 简易模式
        let simple = (options.mode === 'simple');

        // 对齐方式，默认居中对齐
        let textAlign = options.textAlign || 'center';

        this.set({
            bizCode: options.bizCode,
            type: options.type,
            needProducts: (options.products + '' === 'true'),// 是否需要产品线信息
            simple,
            width,
            textAlign
        });
    },
    '@:{render.by.data}'(data = {}) {
        let { type, bizCode, needProducts, simple } = this.get();
        let devInfo = this['@:{get.dev.info}']();
        let href = window.location.href;
        // 上方
        //      products：上方竖版关联外链（默认复用顶部header的，如果有单独bizCode定义的则用bizCode定义的）
        //      qrcode 妈妈二维码
        //      qncode 千牛二维码
        // 下方
        //      bottoms 下方横版的外链数据
        let { bottoms, domains, bizCodes } = data.footer;
        for (let k in domains) {
            // reg=true：需要校验域名
            // reg=false：直接匹配
            let reg = new RegExp(`${k}\.(com|net|cn)`, 'i');
            if (!type && domains[k].reg && reg.test(href)) {
                type = k;
            }
        };

        // 指定产品线信息 or 域名匹配信息
        let configs = bizCodes[bizCode] || domains[type] || domains['alimama'];

        // 产品线信息
        let products = [];
        if (needProducts) {
            let ps = (configs.products && configs.products.length) ? configs.products : data.products;
            ps.forEach(g => {
                g.seconds.forEach(s => {
                    if (!s.text) {
                        s.text = g.text;
                    }
                })
                products = products.concat(g.seconds);
            })
            products.forEach(p => {
                // 无线默认收起子产品详情
                p.show = (devInfo.pad || devInfo.phone) ? false : true;
            })
        }

        let { links = [], copyrights = [] } = configs.bottoms || domains['alimama'].bottoms;
        // 必须显示的信息：copyrights 版权信息 + 备案信息
        copyrights.forEach(i => {
            i.forEach(j => {
                j.required = true;
            });
        });
        // 1. 无线：只显示版权信息
        // 2. 非无线：简易模式显示必要信息；非简易模式都显示
        if (devInfo.phone) {
            bottoms = copyrights;
        } else {
            // 相关链接信息，第一行信息必显示
            bottoms[0] = bottoms[0].concat(links);
            bottoms[0].forEach(i => {
                i.required = true;
            });
            bottoms = bottoms.concat(copyrights);
            if (!simple) {
                bottoms.forEach(i => {
                    i.forEach(j => {
                        j.required = true;
                    });
                });
            }
        }

        let qrcodes = [];
        ['qrcode', 'qncode'].forEach(key => {
            let q = configs[key] || data.footer[key];
            if (q && q.img) {
                qrcodes.push(q);
            }
        })

        this.digest({
            logo: configs.logo,
            products,
            qrcodes,
            bottoms,
            devInfo
        });
    },
    async render() {
        let renderMark = mark(this, '@:{render.mark}');
        let data = {
            products: [],
            footer: {
                bottoms: [[{
                    "text": "关于阿里妈妈",
                    "link": "//www.alimama.com"
                }]],
                bizCodes: {},
                domains: {
                    alimama: {
                        "bottoms": {
                            "links": [
                                {
                                    "text": "法律声明及隐私权政策",
                                    "link": "https://terms.alicdn.com/legal-agreement/terms/suit_bu1_ali_mama_division/suit_bu1_ali_mama_division202107201832_24375.html"
                                }
                            ],
                            "copyrights": [
                                [
                                    {
                                        "text": "© 2007-现在 阿里妈妈版权所有"
                                    },
                                    {
                                        "link": "//idinfo.zjamr.zj.gov.cn/bscx.do?method=lzxx&id=3301843301080000022791",
                                        "img": "//img.alicdn.com/tfs/TB1D24er.T1gK0jSZFrXXcNCXXa-65-70.png"
                                    },
                                    {
                                        "text": "浙公网安备 33010002000075号",
                                        "link": "//www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010002000075",
                                        "img": "//img.alicdn.com/tfs/TB1hIher4z1gK0jSZSgXXavwpXa-20-20.png"
                                    }
                                ],
                                [
                                    {
                                        "text": "增值电信业务经营许可证：浙B2-20070195",
                                        "link": "//beian.miit.gov.cn/"
                                    }
                                ]
                            ]
                        }
                    },
                }
            }
        };
        try {
            let response = await fetch('//g.alicdn.com/mm/bp-source/lib/products.json');
            data = await response.json();
        } catch {

        }
        if (renderMark()) {
            this['@:{render.by.data}'](data);
        }
    },

    /**
     * 无线展开收起，同一时间只允许展开一个
     */
    'toggle<click>'(e) {
        let { products } = this.get();
        let index = e.params.index;
        for (let i = 0; i < products.length; i++) {
            if (index == i) {
                products[i].show = !products[i].show;
            } else {
                products[i].show = false;
            }
        }
        this.digest({
            products
        })
    }
});
