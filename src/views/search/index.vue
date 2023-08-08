<template>
  <div class="searchs">
    <!-- 搜索 -->
    <form action="/">
      <van-search v-model="status.authorId" show-action placeholder="搜索" @search="onSearch" @cancel="onCancel"
        background="#222">
        <template #action>
          <div class="search" @click="onClickButton">搜索</div>
          <div class="no_ok" @click="$router.go(-1)">取消</div>
        </template>
      </van-search>
    </form>
    <!-- 搜索数据展示 -->
    <div v-if="status.hotAuthorList.length > 0">
      <van-cell-group>
        <van-cell>
          <template #default>
            <div class="author_detail">
              <div class="author_photo">
                <img src="@/assets/search/author.png" alt="" />
              </div>
              <div class="author_content">
                <div class="nick_name">[LUX]RedRose🌹</div>
                <div class="open_fans">Openfans.la 👈🏼ID 85834084</div>
              </div>
              <div class="live"></div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div v-else>
      <!-- 搜索历史记录 -->
      <div class="history">
        <div class="search_history">搜索历史</div>
        <div class="icon"></div>
      </div>
      <!-- 有记录时 -->
      <div class="record" v-if="status.historyList.length > 0">
        <div class="content">
          <div class="record_data" v-for="item in status.historyList">{{ item }}</div>
        </div>
      </div>
      <!-- 没有记录时 -->
      <div class="no_record" v-else>
        <img src="@/assets/search/cat.png" alt="" />
        <span>没有搜索结果</span>
      </div>
      <!-- 热门主播 -->
      <div class="hot">
        <h3>热门主播</h3>
        <van-grid :column-num="3" square :gutter="8">
          <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字">
            <template #default>
              <div class="hot_author">
                <div class="hot_photo">
                  <img src="https://img.winnine.co.th/pic/avator/2018-05/23/16/20180523162644_60060089_640.png" alt="" />
                </div>
                <div class="text">
                  <div class="icon">
                    <img src="@/assets/search/wode.png" alt="" />
                  </div>
                  <div class="text_name">Line@GoldMan89</div>
                </div>
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="search">
import { reactive } from 'vue';
const status = reactive({
  authorId: '', //输入框输入得主播id
  historyList: [], //搜索历史
  hotAuthorList: [], //热门主播
});
const onSearch = (val) => Toast(val);
const onCancel = () => Toast('取消');
const onClickButton = (val: any) => {
  console.log(val);
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
