<template>
  <RouterView v-slot="{ Component }">
    <keep-alive :include="keepAliveNameList2">
      <component :is="Component" :key="$route.path" />
    </keep-alive>
  </RouterView>
  <!-- <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" /> -->
  <nut-tabbar unactive-color="#364636" active-color="#1989fa" bottom v-model="activeTab" v-show="tabbarVisible"
    @tab-switch="tabSwitch">
    <nut-tabbar-item style="background:#222" v-for="item in tabItem" :key="item.key">
      <template #icon="props">
        <img :src="props.active ? item.icon.active : item.icon.unactive" alt="" />
      </template>
    </nut-tabbar-item>
  </nut-tabbar>
</template>

<script lang="ts" setup name="BasicLayoutPage">
import { useRouter } from 'vue-router';
const keepAliveNameList2 = ['home', 'focus', 'my']
const getImageURL = (name) => {
  return new URL(`/src/assets/icon/${name}`, import.meta.url).href;
}
const tabItem = [
  {
    key: 'home', icon: {
      unactive: new URL('/src/assets/icon/home.png', import.meta.url).href,
      active: new URL('/src/assets/icon/home_1.png', import.meta.url).href
    }
  },
  {
    key: 'focus', icon: {
      active: new URL('/src/assets/icon/follow_2.png', import.meta.url).href,
      unactive: new URL('/src/assets/icon/follow_1.png', import.meta.url).href
    }
  },
  {
    key: 'my', icon: {
      active: new URL('/src/assets/icon/user_1.png', import.meta.url).href,
      unactive: new URL('/src/assets/icon/user.png', import.meta.url).href
    }
  },
];

const router = useRouter();

const activeTab = ref(0);

const tabbarVisible = ref(true);

const showBorder = ref(true);

watch(
  () => router,
  () => {
    activeTab.value = tabItem.findIndex((item) => item.key === router.currentRoute.value.path.replace('/', ''));
  },
  { deep: true, immediate: true },
);

const tabSwitch = (_item, index) => {
  switch (index) {
    case 0:
      router.push('/home');
      break;
    case 1:
      router.push('/focus');
      break;
    case 2:
      router.push('/my');
      break;
  }
  activeTab.value = index;
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped lang="scss">
.nut-navbar {
  margin-bottom: 0;
}

// :deep(.nut-tabbar-item_icon-box_icon img) {
//   width: 70px;
//   height: 60px;
// }

.main-page {
  box-sizing: border-box;
  height: calc(100vh - 92px);
  overflow-y: scroll;
  overflow-x: hidden;
}

.tabbar {
  height: calc(100vh - 92px);
  padding-bottom: 100px;
}

.border {
  padding-left: 30px;
  padding-right: 30px;
}

:deep(.nut-tabbar-item):nth-child(1) {
  .nut-tabbar-item_icon-box_icon img {
    width: 60px;
    height: 60px;
  }
}

:deep(.nut-tabbar-item):nth-child(2) {
  .nut-tabbar-item_icon-box_icon img {
    width: 70px;
    height: 50px;
  }
}

:deep(.nut-tabbar-item):nth-child(3) {
  .nut-tabbar-item_icon-box_icon img {
    width: 50px;
    height: 60px;
  }
}
</style>
