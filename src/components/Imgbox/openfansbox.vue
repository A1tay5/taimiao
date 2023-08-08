<template>
    <van-pull-refresh v-model="refresh" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="box">

                <div class="item" v-for="(item, index) in porp.List" :key="index" @click="Go(index)">
                    <img v-lazys="item.VideoPicUrl" alt="">
                    <div class="top" v-if="item.PayType">
                        <span>{{ item.ExpireTime }}</span>
                        <img src="../../assets/opfans/payType.png" alt="">
                    </div>
                    <div class="tips">
                        <div class="txt">
                            <span>{{ item.VideoTitle }}</span>
                            <span>{{ secondsToMmss(item.Duration) }}</span>
                        </div>
                        <div class="txt">
                            <div class="user">
                                <img v-lazys="item.PicUrl" alt="">
                                <span>{{ item.NickName }}</span>
                            </div>
                            <div class="looknum">
                                <img src="../../assets/opfans/look.png" alt="">
                                <span>{{ item.PlayNums }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="openFansLock" v-if="!item.VideoUrl">
                        <img src="../../assets/opfans/openFansLock.png" alt="">
                    </div>
                </div>
            </div>

        </van-list>
    </van-pull-refresh>
</template>
<script setup  lang="ts">
const router = useRouter();
import { useOpenfansStore } from '@/store/modules/opfans';
const useopfans = useOpenfansStore()

const emit = defineEmits(["reload", "refresh"]);
const porp = defineProps({
    List: {
        type: [Object],
        default: []
    }
    ,
    type: {
        type: Number,
        default: 0
    },
    load: {
        type: Boolean,
        default: false
    }
})
const loading = ref(false);
const refresh = ref(false);
const finished = ref(false);
const onLoad = () => {
    if (porp.List.length && !finished.value) {
        emit("reload")
    } else {
        loading.value = false
    }
};
const onRefresh = () => {
    emit("refresh")
}
const secondsToMmss = (seconds) => {
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}
const Go = (index) => {
    if (porp.type == 0) {
        useopfans.hotIndex = index
        router.push(`/openfans?type=hot`)
    } else if (porp.type == 1) {
        useopfans.newIndex = index
        router.push(`/openfans?type=new`)
    } else if (porp.type == 2) {
        useopfans.fowIndex = index
        router.push(`/openfans?type=fow`)
    } else if (porp.type == 3) {
        useopfans.colIndex = index
        router.push(`/openfans?type=col`)
    } else if (porp.type == 4) {
        useopfans.byIndex = index
        router.push(`/openfans?type=by`)
    } else if (porp.type == 5) {
        useopfans.serIndex = index
        router.push(`/openfans?type=ser`)
    }
}
watch(
    () => porp.List,
    () => {
        refresh.value = false
        loading.value = false
    }
)
watch(
    () => porp.load,
    () => {
        finished.value = porp.load
        loading.value = false

    }
)
</script>
<style lang="scss" scoped>
.box {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 49%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0;
        height: 480px;
        border-radius: 20px;
        overflow: hidden;
        position: relative;

        .top {
            position: absolute;
            left: 0;
            bottom: top;
            width: 100%;
            padding: 15px;
            color: #fff;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 40px;
            }
        }

        .tips {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 15px;
            // display: flex;
            color: #fff;
            box-sizing: border-box;

            .txt {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .looknum {
                    display: flex;
                    align-items: center;

                    img {
                        width: 40px;
                    }
                }

                .user {
                    display: flex;
                    align-items: center;
                    font-size: 20px;

                    img {
                        width: 40px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                }
            }
        }

        img {
            width: 100%;
            height: 100%;
        }

        .openFansLock {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 300px;
                height: 300px;
            }
        }
    }
}
</style>