import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        name: 'Layout',
        component: (resolve: any) => require(['@/views/Layout.vue'], resolve),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: (resolve: any) =>
                    require(['@/views/Home.vue'], resolve)
            }
        ]
    }
];

const router = new Router({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    store.commit('app/updateLoadingStatus', { isLoading: true });
    const title: string = to.meta && to.meta.title;
    if (title) document.title = title;
    if (to.meta && to.meta.header)
        store.commit('app/updateHeaderVal', to.meta.header);
    next();
});

router.afterEach(() => {
    store.commit('app/updateLoadingStatus', { isLoading: false });
});
export default router;
