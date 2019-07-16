<template>
    <div>
        <van-nav-bar left-text="返回" left-arrow title="我是标题栏"></van-nav-bar>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { NavBar, Icon } from 'vant';

@Component({
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon
    }
})
export default class Layout extends Vue {
    // data
    showTitle: boolean = false;
    // methods

    created() {
        this.$nextTick(() => {
            // 判断浏览器是否微信内置，如果是则隐藏标题栏
            const ua = window.navigator.userAgent.toLowerCase();
            let matchval = ua.match(/MicroMessenger/i);
            if (matchval && matchval[0] === 'micromessenger') {
                const dom: any = document.querySelector('.layout_content');
                dom.style.height = 'calc(100% + 15px)';
                dom.style.overflow = 'scroll';
            }
        });
    }
}
</script>

<style lang="less">
.van-nav-bar {
    background: #f8f8f8;
    .van-nav-bar__text,
    .van-icon {
        color: #111;
    }
}
</style>
