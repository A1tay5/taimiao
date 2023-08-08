<template>
    <div class="swiper">
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">
                <div class="video-slide">
                    <nutVideo ref="child0" :id="0" id1="0" :active="id" :url="oplist[0].VideoUrl"
                        :backimg="oplist[0].VideoPicUrl" v-if="oplist[0].VideoUrl">
                    </nutVideo>
                    <div class="videoImg" v-else>
                        <img :src="oplist[0].VideoPicUrl" alt="" @click="popshow = true">
                        <van-popup v-model:show="popshow" :close-on-click-overlay="false">
                            <div class="giftdialog">
                                <div class="giftimg">
                                    <img src="https://img.winnine.com.au/pic/gift/20230428/202304281623326344.png" alt="">
                                    <div class="gift_num">
                                        X1
                                    </div>
                                </div>
                                <div class="byvideobutton" @click="byVideo(0)">Unlock Video
                                    <br>
                                    by 10000 coupons
                                </div>
                            </div>
                        </van-popup>
                    </div>
                    <div class="iconright">
                        <div class="gift" @click="giftshow = true">
                            <img src="../../assets/opfans/videoGift.png" alt="">
                        </div>
                        <div class="user">
                            <img :src="oplist[0].PicUrl" alt="">
                        </div>
                        <div @click="clickLike(0)" :class="oplist[0].like ? 'heartAnimation' : ''" class="like">
                            <span>{{ oplist[0].CollectNums }}</span>
                        </div>
                        <div class="look">
                            <img src="../../assets/opfans/look.png" alt="">
                            <span>{{ oplist[0].PlayNums }}</span>
                        </div>
                    </div>
                    <div class="close">
                        <img src="../../assets/opfans/close.png" @click="close" alt="">
                        <span>{{ oplist[0].AppName }}</span>
                    </div>
                    <div class="rtitle">
                        <div class="txt">IDX:{{ oplist[0].UserIdx }}</div>
                        <div class="txt">VID:{{ oplist[0].Vid }} </div>
                    </div>
                    <div class="bltitle">
                        <div class="txt">{{ oplist[0].AppName }}</div>
                        <div class="txt">{{ oplist[0].NickName }}</div>
                        <div class="txt">{{ oplist[0].VideoTitle }}</div>
                    </div>
                    <div class="brtitle">
                        openFans
                    </div>
                    <van-popup position="bottom" v-model:show="giftshow">
                        <Gift></Gift>
                    </van-popup>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="video-slide">
                    <nutVideo ref="child1" :id="1" id1="1" :active="id" :url="oplist[1].VideoUrl"
                        :backimg="oplist[1].VideoPicUrl" v-if="oplist[1].VideoUrl">
                    </nutVideo>
                    <div class="videoImg" v-else>
                        <img :src="oplist[1].VideoPicUrl" alt="" @click="popshow = true">
                        <van-popup v-model:show="popshow" :close-on-click-overlay="false">
                            <div class="giftdialog">
                                <div class="giftimg">
                                    <img src="https://img.winnine.com.au/pic/gift/20230428/202304281623326344.png" alt="">
                                    <div class="gift_num">
                                        X1
                                    </div>
                                </div>
                                <div class="byvideobutton" @click="byVideo(1)">Unlock Video
                                    <br>
                                    by 10000 coupons
                                </div>
                            </div>
                        </van-popup>
                    </div>
                    <div class="iconright">
                        <div class="gift" @click="giftshow = true">
                            <img src="../../assets/opfans/videoGift.png" alt="">
                        </div>
                        <div class="user">
                            <img :src="oplist[1].PicUrl" alt="">
                        </div>
                        <div @click="clickLike(1)" :class="oplist[1].like ? 'heartAnimation' : ''" class="like">
                            <span>{{ oplist[1].CollectNums }}</span>
                        </div>
                        <div class="look">
                            <img src="../../assets/opfans/look.png" alt="">
                            <span>{{ oplist[1].PlayNums }}</span>
                        </div>
                    </div>
                    <div class="close">
                        <img src="../../assets/opfans/close.png" @click="close" alt="">
                        <span>{{ oplist[1].AppName }}</span>
                    </div>
                    <div class="rtitle">
                        <div class="txt">IDX:{{ oplist[1].UserIdx }}</div>
                        <div class="txt">VID:{{ oplist[1].Vid }} </div>
                    </div>
                    <div class="bltitle">
                        <div class="txt">{{ oplist[1].AppName }}</div>
                        <div class="txt">{{ oplist[1].NickName }}</div>
                        <div class="txt">{{ oplist[1].VideoTitle }}</div>
                    </div>
                    <div class="brtitle">
                        openFans
                    </div>
                    <van-popup position="bottom" v-model:show="giftshow">
                        <Gift></Gift>
                    </van-popup>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup  lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import nutVideo from './video/nutvideo.vue';
import Gift from '@/components/opfans/Gift.vue';
import Swiper from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { VideoInfo, openList, CollectVideo, IsCollect, BuyVideo, CollectVideoStreamList, MyBuyVideoList } from '@/api/openfans'
import { AES_Encrypt } from '@/utils/aes'
import router from '@/router';
import { useRoute } from "vue-router"
import { useOpenfansStore } from '@/store/modules/opfans';
import { useUserStore } from '@/store/modules/user';
const useopfans = useOpenfansStore()
const useUser = useUserStore()
const route = useRoute()
const opfansList: any = ref([
])
const child0: any = ref(null);
const child1: any = ref(null);
const oplist = ref()
const page = ref(0)
const endpage = ref()
const mtype: any = ref()
const popshow = ref(false)
const giftshow = ref(false)
const id = ref(0)
const stratIndex = ref(0)
const Encrypt = (data) => {
    const ep = AES_Encrypt(JSON.stringify(data))
    const base64EncodedStr = btoa(ep);
    const obj = {
        data: base64EncodedStr
    }
    return obj
}
const clickLike = (index) => {
    if ('like' in oplist.value[index]) {
        const data: any = {
            vid: oplist.value[index].Vid,
            useridx: useUser.info.useridx,
            type: oplist.value[index].like ? 0 : 1
        }
        const obj = Encrypt(data)
        CollectVideo(obj).then((res) => {
            if (res.data == '1') {
                oplist.value[index].like = data.type
                oplist.value[index].CollectNums = data.type ? (oplist.value[index].CollectNums + 1) : (oplist.value[index].CollectNums - 1)
            }
        })
    }
}
const getList = (fn) => {
    const data: any = {
        useridx: useUser.info.useridx,
        page: page.value,
        pagesize: 20,
    }
    fn(data).then(res => {
        if (res.data) {
            opfansList.value = [...opfansList.value, ...res.data]
            endpage.value = res.totalPage
        } else {
            endpage.value = page.value - 1
        }
    }).catch(err => {
        console.log(err);

    })
}
const spliceList = (i) => {
    if (opfansList.value[i + 1]) {
        oplist.value = opfansList.value.slice(i, i + 2)
    } else {
        oplist.value = [opfansList.value[i], {}]
    }
}
const getOpenList = () => {
    if (endpage.value && page.value > endpage.value) {
        return
    }
    page.value += 1
    if (mtype.value == 'col') {
        getList(CollectVideoStreamList)
        return
    } else if (mtype.value == 'by') {
        getList(MyBuyVideoList)
        return
    }
    const data: any = {
        useridx: useUser.info.useridx,
        page: page.value,
        pagesize: 20,
        mtype: mtype.value
    }
    openList(data).then((res: any) => {
        console.log(res);

        if (res.data) {
            opfansList.value = [...opfansList.value, ...res.data]
            endpage.value = res.totalPage
        } else {
            endpage.value = page.value - 1
        }
    }).catch(err => {
        console.log(err);

    })
}
const getCollectInfo = (index) => {
    const data = {
        useridx: useUser.info.useridx,
        vid: oplist.value[index].Vid,
    }
    const obj = Encrypt(data)
    IsCollect(obj).then((res: any) => {
        oplist.value[index].like = res.data
        console.log(oplist.value[index]);
    })
}
const getVideoInfo = (index) => {
    const data = {
        useridx: useUser.info.useridx,
        vid: oplist.value[index].Vid,
        // token: '',
        isonline: 0
    }
    const obj = Encrypt(data)
    VideoInfo(obj).then((res: any) => {
        oplist.value[index] = res.data
        popshow.value = res.data.VideoUrl ? false : true
        getCollectInfo(index)
    })
}
if (route.query.type) {
    switch (route.query.type) {
        case 'hot':
            stratIndex.value = useopfans.hotIndex
            opfansList.value = useopfans.OpHotList
            mtype.value = 1
            break;
        case 'new':
            stratIndex.value = useopfans.newIndex
            opfansList.value = useopfans.OpnewList
            mtype.value = 0

            break;
        case 'fow':
            stratIndex.value = useopfans.fowIndex
            opfansList.value = useopfans.OpfowList
            mtype.value = 2

            break;
        case 'col':
            stratIndex.value = useopfans.colIndex
            opfansList.value = useopfans.OpcolList
            mtype.value = 'col'
            break;
        case 'by':
            stratIndex.value = useopfans.byIndex
            opfansList.value = useopfans.OpbyList
            mtype.value = 'by'
            break;
        case 'ser':
            stratIndex.value = useopfans.serIndex
            opfansList.value = useopfans.OpserlList
            mtype.value = 'ser'
            break;
        default:
            break;
    }
    page.value = Math.floor(stratIndex.value / 20) + 1
    spliceList(stratIndex.value)
    getOpenList()
}

const byVideo = (index) => {
    popshow.value = false
    const data = {
        useridx: useUser.info.useridx,
        vid: oplist.value[index].Vid,
        // token: '',
        fromidx: oplist.value[index].UserIdx
    }
    const objInfo = Encrypt(data)
    BuyVideo(objInfo).then((res: any) => {
        console.log(res);
        if (res.res == '1') {
            oplist.value[index].VideoUrl = res.data
        } else if (res.res == '0') {
            window.open('https://www.mlive.in.th/mlive/topup/topup.php')
        }
    })
    // window.open('https://www.mlive.in.th/mlive/topup/topup.php')
}
const close = () => {
    router.back()
}
onMounted(() => {
    const swiper: any = new Swiper('.swiper', {
        // Optional parameters
        direction: 'vertical',
        allowSlidePrev: stratIndex.value == 0 ? false : true,
        allowSlideNext: stratIndex.value == opfansList.value.length - 1 ? false : true,
        loop: true,
        speed: 500,
        on: {
            init: function () {
                getVideoInfo(0)
            },
            click: (s: any, e: any) => {
                if (e.target.className == "nut-video-player" || e.target.className == "playbuttonimg" || e.target.className == "playbutton") {
                    id.value ? child1.value.select() : child0.value.select()
                }
            },
            slideChangeTransitionStart: function () {

            },
            slideChangeTransitionEnd: function () {
            },
            // 下一个
            slideNextTransitionStart: function () {
                swiper.allowSlidePrev = true
                oplist.value[id.value].VideoUrl = null
                if (id.value == 1) {
                    if (stratIndex.value + 2 < opfansList.value.length) {

                        if (opfansList.value.length - stratIndex.value - 2 >= 2) {
                            stratIndex.value += 2
                            spliceList(stratIndex.value)
                        } else {
                            oplist.value = [opfansList.value[opfansList.value.length - 1], {}]
                            stratIndex.value += 2
                            swiper.allowSlideNext = false
                        }

                    } else {
                        console.log('nextNone');

                    }
                    id.value = 0
                } else {
                    id.value = id.value + 1
                    if (stratIndex.value + 2 == opfansList.value.length) {
                        swiper.allowSlideNext = false
                    }
                }
                getVideoInfo(id.value)
                if (opfansList.value.length - stratIndex.value < 5) {
                    getOpenList()
                }
            },
            // 上一个
            slidePrevTransitionStart: function () {
                swiper.allowSlideNext = true
                oplist.value[id.value].VideoUrl = null
                if (id.value == 0) {
                    if (stratIndex.value > 0) {
                        if (stratIndex.value - 2 >= 0) {
                            stratIndex.value -= 2
                            spliceList(stratIndex.value)
                        } else {
                            oplist.value = [{}, opfansList.value[0]]
                            stratIndex.value -= 2
                            swiper.allowSlidePrev = false
                        }

                    } else {

                    }
                    id.value = 1
                } else {
                    id.value = id.value - 1
                    if (stratIndex.value == 0) {
                        swiper.allowSlidePrev = false
                    }
                }
                getVideoInfo(id.value)
            },
        }
    });

})
onBeforeUnmount(() => {
    const swiper = document.querySelector(`.swiper`)
    swiper?.remove()
})
</script>
<style lang="scss" scoped>
.swiper {
    width: 100%;
    height: 100vh;
}

.video-slide {
    width: 100%;
    height: 100%;

    .videoImg {
        position: relative;
        width: 100%;
        height: 100%;

        .giftdialog {
            background-color: rgba(0, 0, 0, .4);
            width: 85vw;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 30px 100px;
            box-sizing: border-box;

            .byvideobutton {
                width: 100%;
                margin-top: 20px;
                background-color: #fea4be;
                padding: 20px 10px;
                color: #fff;
                text-align: center;
                font-size: 38px;
                line-height: 45px
            }

            .giftimg {
                width: 180px;
                height: 180px;
                background-color: #fec90a;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                .gift_num {
                    position: absolute;
                    right: 0;
                    top: 0px;
                    background-color: #f7677e;
                    border-radius: 30px;
                    color: #fff;
                    padding: 0 15px;
                }

                img {
                    width: 130px;
                    height: 130px;
                }
            }

        }

        .lockpop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .iconright {
        position: absolute;
        right: 20px;
        top: 350px;
        width: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;


        .gift {
            img {
                width: 120px;
            }
        }

        .user {
            margin: 60px 0 40px;

            img {
                width: 100px;
                border-radius: 50%;
            }
        }

        .like {

            width: 100%;
            background-image: url('@/assets/opfans/lovevjvideoimg.png');
            background-repeat: no-repeat;
            height: 150px;
            background-size: 2900%;
            display: flex;
            align-items: flex-end;
            justify-content: center;

            span {
                margin-bottom: -20px;
            }
        }

        .look {
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                width: 120px;
            }
        }
    }

    .close {
        position: absolute;
        left: 30px;
        top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 50px;
        }

        span {
            margin-top: 20px;
            color: #fff;
            font-size: 25px;
        }
    }

    .rtitle {
        position: absolute;
        top: 70px;
        right: 30px;
        display: flex;
        color: #fff;
        font-size: 25px;
        flex-direction: column;
        align-items: flex-end;
    }

    .bltitle {
        position: absolute;
        bottom: 150px;
        left: 30px;
        display: flex;
        color: #fff;
        font-size: 25px;
        flex-direction: column;
    }

    .brtitle {
        position: absolute;
        right: 30px;
        bottom: 250px;
        color: #fff;
        font-size: 30px;
    }
}

.lockpop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
}

@keyframes heartBlast {
    0% {
        background-position: left;
    }

    100% {
        background-position: right;
    }
}

.heartAnimation {
    display: inline-block;
    // -webkit-animation-name: heartBlast;
    animation-name: heartBlast;
    -webkit-animation-duration: .8s;
    animation-duration: .8s;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
    -webkit-animation-timing-function: steps(28);
    animation-timing-function: steps(28);
    background-position: right;
}
</style>