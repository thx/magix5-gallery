import Magix from 'magix5';
let { Vframe } = Magix;
let isChildOf = (vf, pVf) => {
    while (vf && vf.pId) {
        if (vf.pId == pVf.id) {
            return true;
        }
        vf = Vframe.byId(vf.pId);
    }
    return false;
};
let watchList = [];
let readyVframes = {};
let readyDelayTimer;
let isReady = (vf, allVframe) => {
    let subs = 0,
        ready = 0;
    if (!readyVframes[vf.id]) {
        return false;
    }
    for (let e in allVframe) {
        let f = Vframe.byId(e);
        if (isChildOf(f, vf)) {
            subs++;
            if (readyVframes[f.id]) {
                ready++;
            }
        }
    }
    return subs == ready;
};
let checkAddList = () => {
    let all = Vframe.all();
    for (let [n, created] of watchList) {
        let vf = Vframe.byNode(n);
        if (!vf['@:{subs.ready}'] &&
            isReady(vf, all)) {
            vf['@:{subs.ready}'] = 1;
            if (created) {
                created();
            }
        }
    }
}
let checkRemoveList = vframe => {
    for (let [n, , altered] of watchList) {
        let vf = Vframe.byNode(n);
        if (vf['@:{subs.ready}'] &&
            isChildOf(vframe, vf)) {
            vf['@:{subs.ready}'] = 0;
            if (altered) {
                altered();
            }
        }
    }
};
let removeReadyStatus = vframe => {
    for (let [n] of watchList) {
        let vf = Vframe.byNode(n);
        if (vf['@:{subs.ready}'] &&
            isChildOf(vframe, vf)) {
            vf['@:{subs.ready}'] = 0;
        }
    }
};
let add = async e => {
    removeReadyStatus(e.vframe);
    await e.vframe.invoke('finale');
    readyVframes[e.vframe.id] = 1;
    checkAddList();
};
let remove = e => {
    clearTimeout(readyDelayTimer);
    delete readyVframes[e.vframe.id];
    checkRemoveList(e.vframe);
    readyDelayTimer = setTimeout(checkAddList, 20);
};
Vframe.on('add', add);
Vframe.on('remove', remove);


export default {
    watch(node, created, altered) {
        watchList.push([node, created, altered]);
    },
    isRedy(node) {
        let all = Vframe.all();
        return isReady(node, all);
    },
    remove(node) {
        for (let i = watchList.length; i--;) {
            let [n] = watchList[i];
            if (n == node) {
                watchList.splice(i, 1);
            }
        }
    }
};