<template>
    <div id="errorPage">
        <p class="stat">500</p>
        <p class="tips">服务器崩溃啦</p>
        <img src="~@/assets/images/500.svg" alt="500图片">
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
export default class Error500 extends Vue {
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
