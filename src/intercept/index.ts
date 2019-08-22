import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import { getToken } from '@/lib/utils';

let env = window.uimenv || process.env;

let $ = axios.create({
	baseURL: env.VUE_APP_BASE_URL, // api 的 base_url
	timeout: 10000 // request timeout
});
// 拦截request,设置全局请求为ajax请求
$.interceptors.request.use(config => {
	config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	store.commit('app/updateLoadingStatus', { isLoading: true });
	// let token;
	// if ((token = getToken())) {
	//     config.headers.common["Authorization"] = "Bearer " + token;
	// }
	return config;
});

// 拦截响应response，并做一些错误处理
$.interceptors.response.use(
	response => {
		const data = response.data;
		store.commit('app/updateLoadingStatus', { isLoading: false });
		if (data) {
			const err: any = new Error('Request Failed');
			err.response = response;
			throw err;
		}
		return data;
	},
	err => {
		// 这里是返回状态码不为200时候的错误处理
		if (err && err.response) {
			switch (err.response.status) {
				case 400:
					err.message = '请求错误';
					break;

				case 401:
					err.message = '未授权，请登录';
					break;

				case 403:
					err.message = '拒绝访问';
					break;

				case 404:
					err.message = `请求地址出错: ${err.response.config.url}`;
					break;

				case 408:
					err.message = '请求超时';
					break;

				case 500:
					err.message = '服务器内部错误';
					break;

				case 501:
					err.message = '服务未实现';
					break;

				case 502:
					err.message = '网关错误';
					break;

				case 503:
					err.message = '服务不可用';
					break;

				case 504:
					err.message = '网关超时';
					break;

				case 505:
					err.message = 'HTTP版本不受支持';
					break;

				default:
			}
		}
		return Promise.reject(err);
	}
);
Vue.prototype.$axios = $;
export default $;
