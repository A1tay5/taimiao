<template>
    <div class="follow" v-if="state.followShow" @click.stop="state.followShow = false">
        <div class="followbody">
            <div class="content">
                <div class="photo">
                    <img src="https://img.winnine.com.au/pic/avator/2023-07/27/01/20230727010651_84269654_640.png" alt="">
                </div>
                <div class="name">C••l🧡น้ำมัน🐯</div>
                <div class="word">Follwing VJ not lost</div>
                <div class="follow_me">
                    <img src="@/assets/authorDetail/jiahao.png" alt="">
                    <span>Follow</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="FollowMe">
import { authorDetails } from '@/store/modules/authorDetail.ts'
const state = authorDetails()
</script>
<style scoped lang='scss'>
.follow {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgb(58 56 56 / 80%);

    .followbody {
        height: 350px;
        width: 100%;
        background: #000000;
        opacity: 0.9;
        position: absolute;
        left: 0;
        bottom: 0px;

        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 0%;
            top: -80px;
            width: 100%;
            height: 100%;

            .photo {
                box-sizing: border-box;
                position: relative;
                width: 150px;
                height: 150px;
                margin: 0 0 10px 0;

                img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 5px solid #fff;
                }
            }

            .name {
                margin-bottom: 10px;
                font-size: 30px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
            }

            .word {
                font-size: 22px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #B7B6B6;

            }

            .follow_me {
                margin-top: 20px;
                display: flex;

                justify-content: center;
                align-items: center;
                height: 70px;
                padding: 0 20px;
                background: #EC6B98;
                border-radius: 10px;

                img {
                    width: 32px;
                    height: 32px;
                    margin-right: 6px;
                }

                span {
                    font-size: 26px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                }
            }
        }
    }
}
</style>