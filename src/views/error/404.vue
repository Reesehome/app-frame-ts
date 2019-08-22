<template>
    <div id="errorPage">
        <p class="stat">404</p>
        <p class="tips">找不到页面资源</p>
        <img src="~@/assets/images/404.svg" alt="404图片">
        <van-button type="info" @click="onClickBack">回到首页</van-button>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Button } from 'vant';
@Component({
    components: {
        [Button.name]: Button
    }
})
export default class Error404 extends Vue {
    private onClickBack() {
        // 获取标题栏返回的地址，如果有entry参数，则返回
        let reg = new RegExp(/(^|&)entry=([^&]*)(&|$)/, 'i');
        let res = window.location.search.substr(1).match(reg);
        if (!res) {
            this.$router.push({ path: '/' });
            return;
        }
        window.location.href = decodeURIComponent(res[2]);
        sessionStorage.removeItem('userinfo');
        sessionStorage.removeItem('TOKEN_KEY');
    }
}
</script>

<style lang="less" src="@style/errorPage.less">
</style>
