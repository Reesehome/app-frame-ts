import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

// 与shims-vue文件分开，导入方式才不报错
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter;
        $route: Route;
    }
}
