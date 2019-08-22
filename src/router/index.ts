import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);

const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/',
		name: 'Layout',
		component: (resolve: any) => require(['@/views/Layout.vue'], resolve),
		children: [
			{
				path: '/home',
				name: 'Home',
				component: (resolve: any) => require(['@/views/Home.vue'], resolve)
			}
		]
	},
	{
		path: '/404',
		name: '404',
		component: (resolve: any) => require(['@/views/error/404.vue'], resolve)
	},
	{
		path: '/403',
		name: '403',
		component: (resolve: any) => require(['@/views/error/403.vue'], resolve)
	},
	{
		path: '/500',
		name: '500',
		component: (resolve: any) => require(['@/views/error/500.vue'], resolve)
	},
	{
		path: '*',
		redirect: '/404'
	}
];

const router = new Router({
	routes,
	mode: 'history'
});

router.beforeEach((to, from, next) => {
	store.commit('app/updateLoadingStatus', { isLoading: true });
	next();
});

router.afterEach(to => {
	const title: string = to.meta && to.meta.header;
	if (title) {
		document.title = title;
		store.commit('app/updateHeaderVal', to.meta.header);
	}
	store.commit('app/updateLoadingStatus', { isLoading: false });
});
export default router;
