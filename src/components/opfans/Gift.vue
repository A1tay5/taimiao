<template>
    <div class="gift" @click.stop>
        <!-- 礼物分类 -->
        <div class="gift_list">
            <div :class="['gift_item', { active: targetIndex == index }]" v-for="(item, index) in 5"
                @click="changeGift(index)">Hot</div>
        </div>
        <!-- 礼物种类 -->
        <div class="gift_data"></div>
        <!-- 送礼物底部 -->
        <div class="send_money">
            <div class="send_left">
                <img src="@/assets/authorDetail/coin42.png" alt="">
                <span>495013</span>
                <div class="jump">Topup ></div>
            </div>
            <div class="send_right">
                <span>发送</span>
                <div class="name">C••l🧡น้ำมัน🐯</div>
                <div class="send_g">Send</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="GiftOpenfans">
import { ref } from 'vue'
import { authorDetails } from '@/store/modules/authorDetail'
const state = authorDetails()
const targetIndex: number = ref(0)
// 切换礼物种类
const changeGift = (index: any) => {
    targetIndex.value = index
}
</script>
<style scoped lang='scss'>
.gift {

    background-color: rgba(0, 0, 0, .8);
    overflow: hidden;
    font-family: Helvetica, STHeiti, Droid Sans Fallback;
    width: 100vw;

    .gift_list {
        display: flex;
        width: 100%;
        height: 60px;
        line-height: 60px;

        .gift_item {
            width: 20%;
            color: #b2b2b2;
            font-size: 24px;
            text-align: center;


        }

        .gift_item:hover {
            color: #ffa200;
            border-bottom: 1px solid #ffa200;
        }

        .active {
            color: #ffa200;
            border-bottom: 1px solid #ffa200;
        }
    }

    .gift_data {
        height: 220px;
        margin: 50px 0 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }

    .send_money {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 10px;

        .send_left {
            display: flex;
            align-items: center;
            color: #ffa200;
            font-size: 24px;

            img {
                width: 42px;
                height: 42px;
                margin-right: 4px;
            }

            span {
                margin-right: 6px;
            }

            .jump {}
        }

        .send_right {
            display: flex;
            align-items: center;
            font-size: 24px;

            span {
                color: #fff;
            }

            .name {
                width: 150px;
                color: #ffa200;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .send_g {
                text-align: center;
                height: 70px;
                line-height: 70px;
                background-color: #ff5677;
                padding: 0 30px;
                color: rgba(255, 255, 255, 1);
                border-radius: 20px;
            }
        }
    }
}
</style>