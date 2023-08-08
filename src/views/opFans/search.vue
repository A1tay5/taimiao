<template>
  <div class="searchs">
    <!-- 搜索 -->
    <form action="/">
      <van-search v-model="status.authorId" show-action placeholder="搜索" @search="onClickButton(1)"
        @click-right-icon="status.authorId = ''" @cancel="$router.go(-1)" background="#222">
        <template #action>
          <div class="search" @click="onClickButton(1)">搜索</div>
          <div class="no_ok" @click="$router.go(-1)">取消</div>
        </template>
      </van-search>
    </form>
    <!-- 搜索数据展示 -->
    <div v-if="status.opfansVideoList.length > 0">
      <Imgbox @refresh="onClickButton(1)" :type="5" @reload="reload()" :load="load" :List="status.opfansVideoList">
      </Imgbox>
    </div>
  </div>
</template>
<script lang="ts" setup name="search">
import { reactive, ref } from 'vue';
import { SearchVideoList } from '@/api/openfans'
import { useOpenfansStore } from '@/store/modules/opfans';
import Imgbox from '@/components/Imgbox/openfansbox.vue'
const useopfans = useOpenfansStore()

const status: any = reactive({
  authorId: '', //输入框输入得主播id
  opfansVideoList: [], //热门主播
});
const page1: any = ref(0)
const load = ref(false)
const reload = () => {
  onClickButton(null)
}
const onClickButton = (page) => {
  if (page) {
    status.opfansVideoList = []
    load.value = false
    page1.value = page
  } else {
    page1.value += 1
  }
  const data: any = {
    searchuseridx: status.authorId,
    page: page1.value,
    pagesize: 20,
    isMclip: 0
  }
  console.log(data);

  SearchVideoList(data).then((res) => {
    if (res.data) {
      status.opfansVideoList = [...status.opfansVideoList, ...res.data]
      useopfans.OpserlList = status.opfansVideoList
    } else {
      load.value = true
    }

  })
};  
</script>
<style scoped lang="scss">
:deep(.van-search) {
  height: 100px;
  // background: #222222;

  .van-search__content {
    height: 60px;
    background: #3a3a3a;

    .van-field__control {
      color: #fff;
    }
  }

  .van-search__action {
    display: flex;
    justify-content: space-between;
    padding: 0 80px 0 20px;

    color: #1f8705;
    font-size: 30px;

    .search {
      margin-right: 30px;
    }
  }
}

:deep(.van-cell-group) {
  background: transparent;
  border-bottom: 1px solid #ddd;

  .van-cell {
    background-color: transparent;
  }
}

.searchs {
  height: 100vh;
  background-color: #eee;
}

.author_detail {
  display: flex;
  align-items: center;

  .author_photo {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .author_content {
    margin-left: 10px;

    .nick_name {
      text-align: left;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
    }

    .open_fans {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;

      color: #999999;
    }
  }

  .live {
    width: 100px;
    height: 36px;
    margin-left: 90px;
    background: url('@/assets/search/icon_onlive.png') no-repeat;
    background-size: cover;
  }
}

.history {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px 0;

  .search_history {
    font-size: 30px;
    font-family: Helvetica;
    font-weight: 600;
    color: #967933;
  }

  .icon {
    width: 32px;
    height: 36px;
    background: url('@/assets/search/lajitong.png') no-repeat;
    background-size: cover;
  }
}

.record {
  width: 90%;
  margin: 0 auto;
  height: 300px;
  overflow-y: scroll;

  .content {
    display: flex;
    flex-wrap: wrap;

    .record_data {
      margin: 10px 10px 0 0;
      padding: 0 8px;
      height: 60px;
      color: #967933;
      background-color: #231e25;
      line-height: 60px;
      border-radius: 10px;
    }
  }
}

.no_record {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 300px;
  margin: 0 auto;

  img {
    width: 174px;
    height: 104px;
  }

  span {
    margin-top: 6px;
  }
}

.hot {
  width: 90%;
  margin: 0 auto;

  h3 {
    font-family: Helvetica;
    font-weight: 600;
    color: #967933;
    margin-bottom: 16px;
  }

  .hot_author {
    position: relative;
    width: 100%;
    height: 100%;

    .hot_photo {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      left: -14px;
      bottom: 0;
      width: 100%;
      color: white;
      font-size: 20px;
      transform: scale(0.8);

      .icon {
        width: 20px;
        height: 20px;
        margin-right: 20px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text_name {
        width: 190px;
        height: 40px;
        line-height: 46px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

:deep(.van-grid-item__content--center) {
  padding: 0;
}
</style>
  