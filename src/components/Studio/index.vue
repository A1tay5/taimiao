<template>
    <!-- 直播间有数据时得样子 -->
    <div class="studio" @click.stop="closeMact">
        <!-- 头部数据 -->
        <StudioHead />
        <!-- 播放器 -->
        <StudioVideo />
        <!-- 聊天面板 -->
        <StudioChat />
        <!-- 底部数据 -->
        <StudioBottom />
        <!-- 直播看一会跳出来关注 -->
        <FollowMe />
    </div>
</template>
<script lang="ts" setup name="StudioIndex">
import StudioHead from './components/studio-head.vue'
import StudioVideo from './components/studio-video.vue'
import StudioBottom from './components/studio-bottom.vue'
import StudioChat from './components/studio-chat.vue'
import FollowMe from './components/follow-me.vue'
import { ref } from 'vue'
import { authorDetails } from '@/store/modules/authorDetail'
const state: any = authorDetails()
const closeMact = () => {
    state.privateMactShow = false
    state.privateToggle = true
    state.shareShow = false
    state.giftShow = false
}
</script>
<style scoped lang='scss'>
.studio {
    position: relative;
    width: 100vw;
    height: 100vh;
}
</style>