// import Magix from 'magix';
// import Constant from './constant';
// import Service from './services/service';

// // 项目样式，配置在package.json的scopedCss，可以通过@scoped:name获取
// Magix.applyStyle('@scoped.style');

// let getUserInfo = () => {
//     return new Promise((resolve, reject) => {
//         resolve({
//             meta: {
//                 nickName: '测试用户'
//             }
//         })
//         return

//         let requestService = Service.getService();
//         let s = new requestService();

//         // 此处login和boot调用的是同一个处理文件
//         // 只获取数据，不做回跳到index，boot里面自行跳转
//         s.all('user-info', (err, bag) => {
//             if (err) {
//                 $(window).trigger('loginout');
//                 return reject(err);
//                 // return reject({
//                 //     redirectUrl: '/index.html'
//                 // })
//             }

//             resolve(bag.get('user'));
//         });

//     })
// }

// let getConstant = () => {
//     return new Promise((resolve, reject) => {
//         // 测试数据
//         resolve({});
//         return;
//         let requestService = Service.getService();
//         let s = new requestService();

//         s.all('global', (err, bag) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(bag.get('global'));
//             }
//         });
//     })
// }

export default async () => {

  // Promise.all([getUserInfo(), getConstant()]).then(([user, all]) => {
  //     // 和本地常量码表merge
  //     Magix.mix(all, Constant);

  //     // 用户信息和全量码表请通过Magix.config(projectName + '.user')这种形式获取
  //     // 比如脚手架中就是Magix.config('zs_scaffold.user')
  //     // 避免跨项目mount的时候冲突
  //     Magix.config({
  //         'zs_scaffold.user': user,
  //         'zs_scaffold.all': all
  //     });
  //     resolve();
  // }).catch(reject);

}
