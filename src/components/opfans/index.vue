<template>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="Hot">
            <Imgbox @refresh="refresh(0)" @reload="load(0)" :load="HotLoad" :type="0" :List="OpHotList" />
        </van-tab>
        <van-tab title="New">
            <Imgbox @refresh="refresh(1)" @reload="load(1)" :load="newLoad" :type="1" :List="OpnewList" />
        </van-tab>
        <van-tab title="Followed">
            <Imgbox @refresh="refresh(2)" @reload="load(2)" :load="fowLoad" :type="2" :List="OpfowList" />
        </van-tab>
    </van-tabs>
</template>
<script setup  lang="ts">
import { ref } from "vue";
import { openList } from '@/api/openfans'
import { useOpenfansStore } from '@/store/modules/opfans';
import Imgbox from '@/components/Imgbox/openfansbox.vue'
import { useUserStore } from '@/store/modules/user';
const useUser = useUserStore()
const useopfans = useOpenfansStore()
const active = ref(0)
const OpnewList: any = ref([])
const OpHotList: any = ref([])
const OpfowList: any = ref([])
const newNum: any = ref({
    page: 1,
    totalpage: 0
})
const HotNum: any = ref({
    page: 1,
    totalpage: 0
})
const fowNum: any = ref({
    page: 1,
    totalpage: 0
})
const newLoad: any = ref(false)
const HotLoad: any = ref(false)
const fowLoad: any = ref(false)
const getOpenList = (type) => {
    const data: any = {
        useridx: useUser.info.useridx,
        page: type == 0 ? HotNum.value.page : type == 1 ? newNum.value.page : fowNum.value.page,
        pagesize: 20,
        mtype: type == 0 ? 1 : type == 1 ? 0 : 2
    }
    openList(data).then((res: any) => {
        console.log(res);
        if (type == 0) {
            OpHotList.value = [...OpHotList.value, ...res.data]
            HotNum.value.totalpage = res.totalPage
            useopfans.OpHotList = OpHotList.value
        } else if (type == 1) {
            OpnewList.value = [...OpnewList.value, ...res.data]
            newNum.value.totalpage = res.totalPage
            useopfans.OpnewList = OpnewList.value
        } else if (type == 2) {
            OpfowList.value = [...OpfowList.value, ...res.data]
            fowNum.value.totalpage = res.totalPage
            useopfans.OpfowList = OpfowList.value
        }


    }).catch(err => {
        console.log(err);

    })
}
const load = (type) => {
    if (type == 0) {
        if (HotNum.value.page < HotNum.value.totalpage) {
            HotLoad.value = false
            HotNum.value.page += 1
            getOpenList(0)
        } else {
            HotLoad.value = true
        }
    } else if (type == 1) {
        if (newNum.value.page < newNum.value.totalpage) {
            newLoad.value = false
            newNum.value.page += 1
            getOpenList(1)
        } else {
            newLoad.value = true
        }
    } else if (type == 2) {
        if (fowNum.value.page < fowNum.value.totalpage) {
            fowNum.value.page += 1
            getOpenList(2)
            fowLoad.value = false
        } else {
            fowLoad.value = true
        }
    }

}
const refresh = (type) => {
    if (type == 0) {
        HotLoad.value = false
        OpHotList.value = []
        HotNum.value.page = 1
    } else if (type == 1) {
        newLoad.value = false
        OpnewList.value = []
        newNum.value.page = 1
    } else if (type == 2) {
        fowLoad.value = false
        OpfowList.value = []
        fowNum.value.page = 1
    }
    onClickTab()
}
const onClickTab = () => {
    if (active.value == 0) {
        if (OpHotList.value.length == 0) {
            getOpenList(0)
        }
    } else if (active.value == 1) {
        if (OpnewList.value.length == 0) {
            getOpenList(1)
        }
    } else if (active.value == 2) {
        if (OpfowList.value.length == 0) {
            getOpenList(2)
        }
    }
}
onMounted(() => {
    onClickTab()
})
</script>
<style lang="scss" scoped></style>