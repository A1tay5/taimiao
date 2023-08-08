<template>
  <div class="topbar">
    <div class="navbar">
      <div class="left">
        <div class="item" @click="$router.push('/login')">
          <img src="../../assets/icon/btn1.png" alt="">
          <span>登录</span>
        </div>
        <div class="item">
          <img src="../../assets/icon/btn2.png" alt="">
          <span>添加</span>

        </div>
      </div>
      <div class="center">
        <div class="logo">
          <img src="../../assets/icon/mgloballogo.png" alt="">

        </div>
      </div>
      <div class="right">
        <div class="item">
          <img src="../../assets/icon/btn3.png" alt="">
          <span>充值</span>

        </div>
        <div class="item">
          <img src="../../assets/icon/btn4.png" alt="">
          <span>下载</span>

        </div>
      </div>
    </div>
    <van-search placeholder="搜索" @click="jump(1)" background="#222">
    </van-search>
  </div>

  <div class="iconlist">
    <div class="icon" v-for="(item, index) in IconList" :key="index" @click="tabIcon(item)">
      <img :src="item.tabImg" alt="" />
      <p>{{ item.tabName }}</p>
    </div>
  </div>
  <opfans style="padding-bottom: 80px;" v-if="activeIndex == 'Openfans'"></opfans>
  <Imgbox @refresh="refresh()" @reload="load()" :load="PROload" :type="0" style="padding-bottom: 80px;"
    v-if="activeIndex == 'PRO'" :List="PROList" />
  <Imgbox @refresh="refresh()" @reload="load()" :load="STARload" :type="1" style="padding-bottom: 80px;"
    v-if="activeIndex == 'STAR'" :List="STARList" />
  <Imgbox @refresh="refresh()" @reload="load()" :load="INTERload" :type="2" style="padding-bottom: 80px;"
    v-if="activeIndex == 'INTER'" :List="INTERList" />
  <div class="searchOpenFans" v-if="activeIndex == 'Openfans'" @click="jump(2)">
    <img src="../../assets/opfans/search.png" alt="">
  </div>
</template>

<script lang="ts" setup name="home">
import { useRouter } from 'vue-router';
import { homeTab, AnchorList } from '@/api/home'
import Imgbox from '@/components/Imgbox/index.vue';
import opfans from '@/components/opfans/index.vue';
import { useUserStore } from '@/store/modules/user';
import { authorDetails } from '@/store/modules/authorDetail';
const useUser = useUserStore()
const useauthor = authorDetails()
const router = useRouter();
const activeIndex = ref('PRO');
const PROList: any = ref([])
const STARList: any = ref([])
const INTERList: any = ref([])
const STARNum: any = ref({
  page: 0,
  totalpage: 0
})
const PRONum: any = ref({
  page: 0,
  totalpage: 0
})
const INTERNum: any = ref({
  page: 0,
  totalpage: 0
})
const PROload: any = ref(false)
const STARload: any = ref(false)
const INTERload: any = ref(false)
const IconList: any = ref([
]);
const getTabObj = () => {
  const index = IconList.value.findIndex(item =>
    item.tabName == activeIndex.value
  );
  return IconList.value[index]
}
const load = () => {
  const obj = getTabObj()
  getList(obj)
}
const refresh = () => {
  console.log('refresh');

  const obj = getTabObj()
  console.log(obj);

  if (obj.tabName == "PRO") {
    PROload.value = false
    PRONum.value.page = 0
    PROList.value = []
    getList(obj)

  } else if (obj.tabName == "STAR") {
    STARload.value = false
    STARNum.value.page = 0
    STARList.value = []
    getList(obj)

  } else if (obj.tabName == "INTER") {
    INTERload.value = false
    INTERNum.value.page = 0
    INTERList.value = []
    getList(obj)
  }
}
const getTabList = () => {
  homeTab().then(res => {
    console.log(res);
    IconList.value = res
    tabIcon(res[1])
  }).catch(err => {
    console.log(err);

  })
}
getTabList()
const getAnchorList = (obj, i) => {
  const data = {
    uidx: useUser.info.useridx,
    page: i,
    pageSize: 20,
    nType: obj.tabid
  }
  AnchorList(data).then((res: any) => {
    const a = JSON.parse(res.table)
    if (obj.tabName == "PRO") {
      if (PRONum.value.page == 1) {
        PROList.value = []
      }
      if (a.length < 20) {
        PROload.value = true
      }
      PROList.value = [...PROList.value, ...a];
      useauthor.authorProList = PROList.value
    } else if (obj.tabName == "STAR") {
      if (STARNum.value.page == 1) {
        STARList.value = []
      }
      if (a.length < 20) {
        STARload.value = true
      }
      STARList.value = [...STARList.value, ...a];
      useauthor.authorStarList = STARList.value

    } else if (obj.tabName == "INTER") {
      if (INTERNum.value.page == 1) {
        INTERList.value = []
      }
      if (a.length < 20) {
        INTERload.value = true
      }
      INTERList.value = [...INTERList.value, ...a];
      useauthor.authorInterList = INTERList.value
    }
  }).catch(err => {
    console.log(err);
  })
}
const getList = (obj) => {
  if (obj.tabName == "PRO") {
    PRONum.value.page += 1
    getAnchorList(obj, PRONum.value.page)
  } else if (obj.tabName == "STAR") {
    STARNum.value.page += 1
    getAnchorList(obj, STARNum.value.page)
  } else if (obj.tabName == "INTER") {
    INTERNum.value.page += 1
    getAnchorList(obj, INTERNum.value.page)
  }
}
const tabIcon = (obj) => {
  activeIndex.value = obj.tabName;
  if (obj.tabName == "PRO") {
    if (PRONum.value.page < 1) {
      PROList.value = []
      getList(obj)
    }
  } else if (obj.tabName == "STAR") {
    if (STARNum.value.page < 1) {
      STARList.value = []
      getList(obj)
    }
  } else if (obj.tabName == "INTER") {
    if (INTERNum.value.page < 1) {
      INTERList.value = []
      getList(obj)
    }
  }
};
const jump = (index) => {
  if (index == 1) {
    router.push('/search');

  } else if (index == 2) {
    router.push('/opsearch');
  }
};
onMounted(() => {
  // getAnchorList()
})
</script>
<style lang="scss">
.van-search__content {
  height: 60px;
  background: #3a3a3a;

  .van-field__control {
    color: #fff;
  }
}

.topbar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}

.searchOpenFans {
  position: fixed;
  right: 30px;
  top: 70%;
}

.navbar {
  display: flex;
  background-color: #222222;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  height: 70px;

  .left {
    display: flex;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #967933;
      margin: 0 10px;

      span {
        margin-top: 5px;
      }

      img {
        width: 45px;
      }
    }
  }

  .logo {
    img {
      width: 170px;
    }
  }

  .right {
    display: flex;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #967933;
      margin: 0 10px;

      span {
        margin-top: 5px;
      }

      img {
        width: 45px;
      }
    }
  }
}

/* 隐藏滚动条但保留滚动功能 */
.iconlist {
  margin-top: 210px;
  padding: 10px;
  display: flex;
  overflow: scroll;
  /* 这将始终显示滚动条，但内容不足时隐藏它 */
  scrollbar-width: none;

  /* 隐藏滚动条宽度，适用于大多数浏览器 */
  .icon {
    width: 110px;
    margin: 10px 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 150px;

    img {
      width: 100px;
      height: 100px;
    }

    p {
      margin-top: 10px;
      font-size: 28px;
    }
  }
}

/* 为 Webkit 浏览器（如 Chrome 和 Safari）添加特定样式来隐藏滚动条 */
.iconlist::-webkit-scrollbar {
  display: none;
}
</style>
