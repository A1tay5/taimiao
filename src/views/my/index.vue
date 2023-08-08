<template>
  <div style="background: #f2f2f2;min-height: 100vh;">
    <div class="background">
      <img src="https://img.winnine.co.th/pic/avator/2021-06/25/11/20210625115924_63037325_640.png" alt="">
      <div class="shadow">
        <div class="myname">asda</div>
        <div class="myid">
          <span>1231222</span>
          <div class="data">编辑</div>
        </div>
        <div class="signTxt">this guy is lazy,nothing here</div>
      </div>
    </div>
    <div class="follow">
      <div class="txt">
        关注 <span>66</span>|
        粉丝 <span>642</span>
      </div>
      <div class="kingicon">
        <img src="http://test.mliveh5.com/images/level/level39.png" alt="">
      </div>
    </div>
    <van-cell :title="item.title" :is-link="item.left" :value="item.value" v-for="(item, index) in List" :key="index"
      @click="MyRouter(item, index)">
      <template #icon>
        <img :src="item.icon" class="icon" alt="">
      </template>
    </van-cell>
    <div class="exit" @click="goLogin">
      登出
    </div>
    <div style="width: 100%;height: 100px;;"></div>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script lang="ts" setup name="my">
// import { useUserStore } from '@/store/modules/user';
import router from "@/router/index";
// import { Dongdong } from '@nutui/icons-vue';
const getImageURL = (name) => {
  return new URL(`/src/assets/my/${name}`, import.meta.url).href;
}
const List: any = ref([
  { title: '我们的贡献', icon: getImageURL('paihangbang.png'), left: true, value: null },
  { title: '我的喵币', icon: getImageURL('qianbao.png'), left: true, value: 612312 },
  { title: '我的票据', icon: getImageURL('Ticketlogo.png'), left: true, value: 0 },
  { title: 'Expense Details', icon: getImageURL('Expense-Details.png'), left: true, value: null },
  { title: 'My Collection', icon: getImageURL('My-Collection.png'), left: true, value: null },
  { title: 'My Purchases', icon: getImageURL('My-Purchases.png'), left: true, value: null },
  { title: '用户协议', icon: getImageURL('jieshao.png'), left: true, value: null },
  { title: '系统语言', icon: getImageURL('System-Language.png'), left: false, value: 'Language' },
])
const columns = [
  { text: 'English', value: 'English' },
  { text: 'ภาษาไทย', value: 'ภาษาไทย' },
  { text: 'español', value: 'español' },
  { text: '中文简体', value: '中文简体' },
  { text: 'にほんご', value: 'にほんご' },
  { text: 'Tiếng Việt', value: 'Tiếng Việt' },
  { text: '한국어', value: '한국어' },
];
const fieldValue = ref('');
const showPicker = ref(false);

const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  fieldValue.value = selectedOptions[0].text;
};
const goLogin = () => {
  router.push('/login');
};
const MyRouter = (item,) => {
  switch (item.title) {
    case '我们的贡献':
      router.push('/rank')
      break;
    case '我的喵币':
      window.open('https://www.mlive.in.th/mlive/topup/topup.php')
      break;
    case '我的票据':
      window.open('https://www.mlive.la/ticket/')
      break;
    case 'Expense Details':
      window.open('https://www.mlive.la/openfans/')
      break;
    case 'My Collection':
      router.push({
        path: '/mycol',
        query: {
          type: 'My Collection'
        }
      })
      break;
    case 'My Purchases':
      router.push({
        path: '/mycol',
        query: {
          type: 'My Purchases'
        }
      })
      break;
    case '用户协议':
      router.push('/Agreement')
      break;
    case '系统语言':
      showPicker.value = true
      break;
    default:
      break;
  }
}
</script>

<style lang="scss">
.background {
  width: 100%;
  height: 450px;
  overflow: hidden;

  .shadow {
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0rem;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    box-sizing: border-box;
    font-size: 30px;
    -webkit-text-fill-color: #e8931b;
    font-weight: bold;

    .myname {}

    .myid {
      display: flex;
      justify-content: space-between;
    }

    .data {
      width: 7rem;
      height: 2.5rem;
      background: #967933;
      -webkit-text-fill-color: #fff !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.follow {
  background-color: #000;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  box-sizing: border-box;

  .txt {
    color: #8f8e8e;
    font-size: 30px;

    span {
      color: #1F8705
    }
  }

  .kingicon {
    img {
      width: 60px;
    }
  }
}

.icon {
  width: 35px;
  height: 35px;
  margin-right: 20px;
}

.exit {
  margin: 30px 0;
  display: flex;
  padding: 20px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  color: #967933;
  font-size: 35px;
}
</style>
