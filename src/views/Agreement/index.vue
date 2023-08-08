<template>
    <van-nav-bar v-if="!type" title="About  MGlobal" left-arrow @click-left="onClickLeft" />
    <div v-if="!type" class="about">
        <img src="../../assets/my/aboutbg.png" alt="">
    </div>
    <div v-if="!type" @click="typetab(1)" class="myarea">User Agreement <van-icon name="arrow" /></div>
    <div v-if="!type" @click="typetab(2)" class="myarea">VJ Agreement <van-icon name="arrow" /></div>
    <div v-if="!type" @click="typetab(3)" class="myarea">User and VJ Policy <van-icon name="arrow" /></div>
    <privacy @refresh="typetab(null)" v-if="type == 1"></privacy>
    <rules @refresh="typetab(null)" v-if="type == 2"></rules>
    <user_reed @refresh="typetab(null)" v-if="type == 3"></user_reed>
</template>
<script setup  lang="ts">
import privacy from './components/privacy.vue'
import rules from './components/rules.vue'
import user_reed from './components/user_reed.vue'
const type: any = ref(null)
import router from "@/router/index";
const onClickLeft = () => {
    router.back()
}
const typetab = (num) => {
    type.value = num
}
</script>
<style lang="scss" scoped>
.about {
    width: 100%;
    height: 350px;
    text-align: center;

    img {
        height: 100%;
    }

    border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.myarea {
    font-size: 35px;
    padding: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>