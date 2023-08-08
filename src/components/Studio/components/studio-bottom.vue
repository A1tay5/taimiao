<template>
    <div class="bottom" @click.stop>
        <div class="way">
            <img :src="statu.way[statu.wayShow].photo" alt="" v-if="statu.way[statu.wayShow].id === statu.wayShow"
                @click="wayChange">
        </div>
        <div class="word">
            <input type="text" :placeholder="statu.placeWord" v-model="statu.sendWord">
            <div class="send">发送</div>
        </div>
        <div class="message" @click.stop="state.privateMactShow = true"></div>
        <div class="gift" @click="state.giftShow = true"></div>
        <div class="share" @click.stop="state.shareShow = true"></div>
    </div>
    <!-- 私密聊天 -->
    <PrivateMact />
    <!-- 分享 -->
    <ShareIndex v-model:shareShow="statu.shareShow" />
    <!-- 礼物面板 -->
    <GiftCard />
</template>
<script lang="ts" setup name="StudioBottom">
import { reactive, defineProps } from 'vue'
import { authorDetails } from '@/store/modules/authorDetail'
import PrivateMact from '@/components/private-mact/index.vue'
import ShareIndex from '@/components/share/index.vue'
import GiftCard from '@/components/gift-card/index.vue'
const props: any = defineProps({
    privateShow: {
        type: Boolean,
        default: false
    } //消息列表的展示
})
const state = authorDetails()

const statu = reactive({
    way: [
        {
            id: 0,
            photo: new URL('/src/assets/authorDetail/horn.png', import.meta.url).href,
            text: 'Say something~',
            way: 1
        },
        {
            id: 1,
            photo: new URL('/src/assets/authorDetail/room.png', import.meta.url).href,
            text: '100 Coupon',
            way: 2
        },
        {
            id: 2,
            photo: new URL('/src/assets/authorDetail/all.png', import.meta.url).href,
            text: '5k Coupon',
            way: 3
        },
        {
            id: 3,
            photo: new URL('/src/assets/authorDetail/trf.png', import.meta.url).href,
            text: '10k Coupon',
            way: 4,
        },
        {
            id: 4,
            photo: new URL('/src/assets/authorDetail/cel.png', import.meta.url).href,
            text: '100 Coupon',
            way: 0
        },
    ],//房间发言种类
    wayShow: 0,//哪种发言方式
    placeWord: 'Say something~',
    sendWord: '',//发言得话语


})
// 切换房间发言种类
const wayChange = () => {
    statu.wayShow = statu.way[statu.wayShow].way
    statu.placeWord = statu.way[statu.wayShow].text
}

</script>
<style scoped lang='scss'>
.bottom {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 10px;
    z-index: 11;
    width: 100%;
    padding: 0 6px;

    .way {
        width: 80px;
        height: 78px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .word {
        display: flex;
        align-items: center;
        height: 80px;
        padding: 0 14px 0 4px;
        border-radius: 30px;
        background: rgba(0, 0, 0, 0.2);

        input {
            width: 260px;
            margin-left: 20px;
            border: none;
            background-color: transparent;
            font-size: 30px;
            color: #fff;
        }

        .send {
            height: 60px;
            padding: 0 26px;
            line-height: 60px;
            color: #fff;
            text-align: center;
            background: #ff5677;
            border-radius: 30px;
        }
    }

    .message {
        width: 50px;
        height: 50px;
        background: url('@/assets/authorDetail/xiaoxi.png') no-repeat;
        background-size: cover;
    }

    .gift {
        width: 80px;
        height: 80px;
        background: url('@/assets/authorDetail/icon_send_gift2x.png') no-repeat;
        background-size: cover;
    }

    .share {
        width: 80px;
        height: 80px;
        background: url('@/assets/authorDetail/icon_share2x.png') no-repeat;
        background-size: cover;
    }
}
</style>