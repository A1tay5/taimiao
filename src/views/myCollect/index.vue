<template>
    <van-nav-bar :title="type" left-arrow @click-left="onClickLeft" />
    <Imgbox @refresh="typeApi()" :type="type == 'My Collection' ? 3 : 4" @reload="reload()" :load="load" :List="list" />
</template>
<script setup  lang="ts">
import router from '@/router/index'
import { useRoute } from "vue-router"
import { CollectVideoStreamList, MyBuyVideoList } from '@/api/openfans'
import Imgbox from '@/components/Imgbox/openfansbox.vue'
import { useUserStore } from '@/store/modules/user';
import { useOpenfansStore } from '@/store/modules/opfans';
const useUser = useUserStore()
const useopfans = useOpenfansStore()

const type: any = ref()
const route = useRoute()
const list: any = ref([])
const load = ref(false)
const page = ref(0)

const reload = () => {
    if (type.value == 'My Collection') {
        getList(CollectVideoStreamList)
    } else if (type.value == 'My Purchases') {
        getList(MyBuyVideoList)
    }
}
const getList = (fn) => {
    page.value += 1
    const data: any = {
        useridx: useUser.info.useridx,
        page: page.value,
        pagesize: 20,
    }
    console.log(data);

    fn(data).then(res => {
        if (res.data) {
            list.value = [...list.value, ...res.data]
            if (type.value == 'My Collection') {
                useopfans.OpcolList = list.value
            } else if (type.value == 'My Purchases') {
                useopfans.OpbyList = list.value
            }
        } else {
            load.value = true
        }
    }).catch(err => {
        console.log(err);

    })
}
const typeApi = () => {
    page.value = 0
    load.value = false
    list.value = []
    if (type.value == 'My Collection') {
        getList(CollectVideoStreamList)
    } else if (type.value == 'My Purchases') {
        getList(MyBuyVideoList)
    }
}
if (route.query.type) {
    switch (route.query.type) {
        case 'My Collection':
            type.value = 'My Collection'
            break;
        case 'My Purchases':
            type.value = 'My Purchases'
            break;
        default:
            break;
    }
}
const onClickLeft = () => {
    router.back()
}
onMounted(() => {
    typeApi()
})
</script>
<style lang="scss" scoped></style>