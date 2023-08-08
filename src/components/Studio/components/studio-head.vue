<template>
    <div class="head">
        <div class="head_left">
            <div class="left_top">
                <div class="photo">
                    <img src="https://img.winnine.com.au/pic/avator/2023-07/18/09/20230718094938_84888344_640.png" alt="">
                </div>
                <div class="data">
                    <div class="name">[🆗]พีเคfadsfa </div>
                    <div class="num">234</div>
                </div>
                <div class="follow">Follow</div>
            </div>
            <div class="left_bottom">
                EXP:46.95k
                <div class="back"></div>
            </div>
        </div>
        <div class="head_right">
            <div class="home" @click="jump">首页</div>
            <div class="idx">IDX:84134175</div>
        </div>
    </div>
</template>
<script lang="ts" setup name="StudioHeader">
import { useRouter } from 'vue-router'
const router = useRouter()
// 跳转到首页 关闭socket
const jump = () => {
    router.go(-1)
}
</script>
<style scoped lang='scss'>
.head {
    position: relative;
    z-index: 12;
    display: flex;
    justify-content: space-between;
    padding: 10px 16px 0;

    .head_left {
        .left_top {
            display: flex;
            align-items: center;
            background-color: rgba(0, 0, 0, .2);
            border-radius: 40px;
            padding: 0 4px 0 2px;

            .photo {
                box-sizing: border-box;
                position: relative;
                width: 90px;
                height: 90px;
                margin-right: 10px;

                img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 5px solid #fff;
                }
            }

            .data {
                color: #fff;
                font-size: 24px;
                margin-right: 6px;

                .name {
                    width: 120px;
                    font-size: 30px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }

            .follow {
                padding: 0 10px;
                text-align: center;
                font-size: 30px;
                height: 60px;
                line-height: 60px;
                color: #fff;
                border-radius: 30px;
                background: #ff5677;
            }
        }

        .left_bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 200px;
            height: 36px;
            margin-top: 8px;

            background-color: rgba(0, 0, 0, .2);
            border-radius: 40px;
            padding: 0 4px;
            color: #fff;
            font-size: 26px;

            .back {
                width: 30px;
                height: 30px;
                margin-left: 6px;
                background: url('@/assets/authorDetail/youbian.png') no-repeat;
                background-size: cover;
            }
        }
    }

    .head_right {
        padding-top: 20px;

        .home {
            font-size: 26px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #fff;
            background: #ff5677;
            border-radius: 20px;
        }

        .idx {
            color: #fff;
            font-size: 24px;
        }
    }
}
</style>