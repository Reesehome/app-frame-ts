import Vue from 'vue';
import Vuex from 'vuex';
import app, { State as appState } from './module/app';

Vue.use(Vuex);

export interface State {
    app: appState;
}
const store = new Vuex.Store({
    strict: true, // 严格模式：必须通过mutations改变state
    modules: {
        app
    }
});
// 动态注册模块
// store.registerModule("loading", {
//     state: {
//         isLoading: false
//     },
//     mutations: {
//         updateLoadingStatus(state, payload) {
//             state.isLoading = payload.isLoading;
//         }
//     }
// });

export default store;
