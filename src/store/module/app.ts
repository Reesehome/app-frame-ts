// 框架相关，静态加载
export interface State {
    isLoading: boolean;
    headerVal: string;
    backTo: string;
}
export default {
    namespaced: true, // 命名带上下文
    state: <State>{
        isLoading: false,
        headerVal: '项目名称',
        backTo: ""
    },
    mutations: {
        updateLoadingStatus(state: any, payload: any) {
            state.isLoading = payload.isLoading;
        },
        updateHeaderVal(state: State, payload: string) {
            state.headerVal = payload;
        },
        updateBackTo(state: State, payload: string | null) {
            // payload为null时，默认跳回外链入口，为''时，Header组件会跳转回上一页
            if (typeof payload === "string") {
                state.backTo = payload;
            } else {
                // 获取标题栏返回的地址
                let reg = new RegExp(/(^|&)entry=([^&]*)(&|$)/, "i");
                let res = window.location.search.substr(1).match(reg);
                state.backTo = res ? res[2] : "";
            }
        }
    }
};
