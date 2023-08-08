<template>
    <div class="share" v-if="state.shareShow">
        <div class="title">Share</div>
        <!-- 三种分享方式 -->
        <div class="share_content">
            <div class="box" v-for="item in shareList" :key="item.id">
                <img :src="item.photo" alt="">
                <span>{{ item.text }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="ShareIndex">
import { ref } from 'vue'
import { authorDetails } from '@/store/modules/authorDetail'
const state = authorDetails()
const shareList = ref([
    { id: 1, photo: new URL('/src/assets/authorDetail/icon_myshare_facebook.png', import.meta.url).href, text: 'Facebook' },
    { id: 2, photo: new URL('/src/assets/authorDetail/twitter.png', import.meta.url).href, text: 'Twitter' },
    { id: 3, photo: new URL('/src/assets/authorDetail/copylink.png', import.meta.url).href, text: 'Copy link' }
])
</script>
<style scoped lang='scss'>
.share {
    background: rgba(0, 0, 0, 0.6);
    filter: alpha(opacity=30);
    position: absolute;
    width: 100%;
    height: 300px;
    position: fixed;
    bottom: 0rem;
    left: 0;
    right: 0;
    z-index: 12;
    .title {
        height: 100px;
        line-height: 100px;
        font-size: 30px;
        color: rgba(255, 255, 255, .5);
        text-align: center;
    }

    .share_content {
        display: flex;
        justify-content: space-between;
        padding: 0 70px;

        .box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
                width: 100px;
                height: 100px;
            }

            span {
                font-size: 30px;
                color: rgba(255, 255, 255, .5)
            }
        }
    }
}
</style>