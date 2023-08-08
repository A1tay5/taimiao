<template>
    <van-pull-refresh v-model="refresh" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="box">
                <div class="item" v-for="(item, index) in porp.List" :key="index">
                    <img v-lazys="item.smallpic" alt="" @click="Go(index)">
                    <div class="rate" v-if="item.rate">
                        <img :src="item.rate" alt="">
                    </div>
                    <div class="familyName" v-if="item.familyName">
                        {{ item.familyName }}
                    </div>
                    <div class="name">
                        {{ item.myname }}
                    </div>
                    <div class="allnum">
                        {{ item.allnum }}
                    </div>
                    <div class="lock3" v-if="item.locktype >= 0 && item.locktype <= 3">
                        <img src="../../assets/home/lock.png" alt="">
                    </div>
                    <div class="lock7" v-if="item.locktype > 3">
                        <img src="../../assets/home/PIC03.png" alt="">
                        <img v-if="item.dataPic" class="datapic" :src="item.dataPic" alt="">
                    </div>
                </div>
            </div>

        </van-list>
    </van-pull-refresh>
</template>
<script setup  lang="ts">
const router = useRouter();
const emit = defineEmits(["reload", "refresh"]);
import { authorDetails } from '@/store/modules/authorDetail';
const useauthor = authorDetails()

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
const Go = (index) => {
    if (porp.type == 0) {
        useauthor.authorProIndex = index
        router.push(`/details?type=pro`)
    } else if (porp.type == 1) {
        useauthor.authorStarIndex = index
        router.push(`/details?type=star`)
    } else if (porp.type == 2) {
        useauthor.authorInterIndex = index
        router.push(`/details?type=inter`)
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
    padding: 10px 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 48%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0;
        border-radius: 10px;
        overflow: hidden;
        position: relative;

        img {
            width: 100%;
        }

        .allnum {
            position: absolute;
            bottom: 5px;
            right: 10px;
            color: #fff;
            font-size: 22px;
        }

        .familyName {
            position: absolute;
            top: 10px;
            right: 0;
            background-image: url('@/assets/home/whi.png');
            font-size: 23px;
            color: #fff;
            padding: 5px 5px 0 15px;
            display: flex;
        }

        .name {
            position: absolute;
            bottom: 5px;
            left: 10px;
            color: #fff;
            font-size: 22px;
        }

        .rate {
            position: absolute;
            top: 5px;
            left: 5px;
            width: 50px;

            img {
                width: 100%;
            }
        }

        .lock3 {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100px;
                height: 100px;
            }
        }

        .lock7 {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 150px;
                height: 150px;
            }

            .datapic {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
            }
        }
    }
}
</style>