<template>
    <van-nav-bar title="Weekly Rank" left-arrow @click-left="onClickLeft" />

    <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="Weekly">
            No one on your ranking，go live now!
        </van-tab>
        <van-tab title="Monthly">
            No one on your ranking，go live now!
        </van-tab>
        <van-tab title="Rank">
            <RANK></RANK>
        </van-tab>
    </van-tabs>
</template>
<script setup  lang="ts">
import router from '@/router/index'
import RANK from './components/rank.vue'
const active = ref(0)
const onClickTab = () => {

}
const onClickLeft = () => {
    router.back()
}
</script>
<style lang="scss" scoped></style>