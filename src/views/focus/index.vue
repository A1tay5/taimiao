<template>
  <div class="navbar">
    <div class="left">

    </div>
    <div class="center">
      <div class="logo">
        我的关注
      </div>
    </div>
    <div class="right">

      <div class="item">
        <img src="../../assets/icon/btn4.png" alt="">
      </div>
    </div>
  </div>
  <Imgbox @refresh="refresh()" @reload="load()" :load="PROload" :type="0" style="padding-top: 80px;padding-bottom: 80px;"
    :List="list" />
</template>

<script lang="ts" setup name="focus">
import { ref } from "vue";
const router = useRouter();
const list = ref([
  { PicUrl: 'https://img.winnine.com.au/pic/avator/2023-07/29/22/20230729221012_88295683_250.png', name: '🆗🌈ทราย🌻' },
  { PicUrl: 'https://img.winnine.com.au/pic/avator/2023-07/29/22/20230729221012_88295683_250.png', name: '🆗🌈ทราย🌻' },
  { PicUrl: 'https://img.winnine.com.au/pic/avator/2023-07/29/22/20230729221012_88295683_250.png', name: '🆗🌈ทราย🌻' },
  { PicUrl: 'https://img.winnine.com.au/pic/avator/2023-07/29/22/20230729221012_88295683_250.png', name: '🆗🌈ทราย🌻' },
  { PicUrl: 'https://img.winnine.com.au/pic/avator/2023-07/29/22/20230729221012_88295683_250.png', name: '🆗🌈ทราย🌻' },
  { PicUrl: 'https://img.winnine.com.au/pic/avator/2023-07/29/22/20230729221012_88295683_250.png', name: '🆗🌈ทราย🌻' },
  { PicUrl: 'https://img.winnine.com.au/pic/avator/2023-07/29/22/20230729221012_88295683_250.png', name: '🆗🌈ทราย🌻' },
  { PicUrl: 'https://img.winnine.com.au/pic/avator/2023-07/29/22/20230729221012_88295683_250.png', name: '🆗🌈ทราย🌻' },
]);
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  background-color: #222222;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  height: 100px;
  box-sizing: border-box;

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
    font-size: 35px;
    color: #967933;
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
        width: 55px;
      }
    }
  }
}
</style>
