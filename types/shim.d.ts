interface Performance {
    memory: {
        usedJSHeapSize: number
    }
}
declare function define(id: string, f: Function);
declare var DEBUG;
declare var crossConfigs;
interface Seajs {
    config(cfg: object): void
    use(deps: string[], factory: any): void
}

interface Window {
    seajs: Seajs
}