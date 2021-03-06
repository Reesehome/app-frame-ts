// 框架相关，静态加载
export interface State {
	isLoading: boolean;
	headerVal: string;
	isWechat: boolean;
}
export default {
	namespaced: true, // 命名带上下文
	state: <State>{
		isLoading: false,
		headerVal: '项目名称',
		isWechat: false
	},
	mutations: {
		updateLoadingStatus(state: any, payload: any) {
			state.isLoading = payload.isLoading;
		},
		updateHeaderVal(state: State, payload: string) {
			state.headerVal = payload;
		},
		setWechatState(state: State, payload: boolean) {
			state.isWechat = payload;
		}
	}
};
