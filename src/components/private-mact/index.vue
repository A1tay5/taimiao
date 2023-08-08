<template>
    <!-- 私密聊天 -->
    <div class="private_mact" @click.stop v-if="state.privateMactShow">
        <!-- 私聊列表 -->
        <div v-if="state.privateToggle">
            <h3>全部忽略</h3>
            <div class="private_list" @click.stop="mactItem">
                <div class="photo">
                    <img src="https://img.winnine.com.au/pic/avator/2023-07/18/09/20230718094938_84888344_640.png" alt="">
                </div>
                <div class="private_name">
                    <div class="names">8❽8ใบตวยหมวย</div>
                    <div class="level">
                        25
                        <div class="levels"></div>
                    </div>
                </div>
                <!-- <div class="private">私聊</div> -->
                <div class="time">2023-8-2</div>
            </div>
        </div>
        <!-- 私聊信息 -->
        <div v-else>
            <div class="tab_bar">
                <div class="back" @click.stop="state.privateToggle = true"></div>
                <div class="title">8❽8ใบตวยหมวย</div>
                <div class="close" @click.stop="closeMact"></div>
            </div>
            <div class="like">
                <span>Like the anchor to pay attention to she</span>
                <div class="hear"></div>
            </div>
            <!-- 聊天内容 -->
            <div class="msg_body">
                <div class="my_msg" v-for="item in 4">
                    <div class="msg_box">你好你好你好你好你好你好你好</div>
                    <div class="sj"></div>
                    <div class="aricle">
                        <div class="photo">
                            <img src="https://img.winnine.com.au/pic/avator/2023-07/18/09/20230718094938_84888344_640.png"
                                alt="">
                        </div>
                    </div>
                </div>
                <div class="you_msg">
                    <div class="aricle">
                        <div class="photo">
                            <img src="https://img.winnine.com.au/pic/avator/2023-07/18/09/20230718094938_84888344_640.png"
                                alt="">
                        </div>
                    </div>
                    <div class="sjs"></div>
                    <div class="msg_box">你好</div>
                </div>
            </div>
            <!-- 输入框 -->
            <div class="msg_content">
                <input type="text">
                <div class="msg_send">Send</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="PrivateMact">
import { reactive, onMounted, nextTick } from 'vue'
import { authorDetails } from '@/store/modules/authorDetail'
import $ from 'jquery'
const state = authorDetails()
const statu: any = reactive({
    // privateToggle: true,//私聊列表和私聊得切换
})
// 跳转到对应得聊天面板
const mactItem = () => {
    state.privateToggle = false
    scrollMact()
}
// 关闭聊天页面
const closeMact = () => {
    state.$patch({
        privateMactShow: false,
        name: 'author-details'
    })
    state.privateToggle = true
}
// 聊天滚动到最底部
const scrollMact = () => {
    nextTick(() => {
        $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight)
    })
}
onMounted(() => {
})
</script>
<style scoped lang='scss'>
.private_mact {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    z-index: 12;
    width: 100%;
    height: 500px;
    padding-top: 20px;
    background-color: rgb(17 16 16 / 80%);

    h3 {
        margin-bottom: 10px;
        padding-right: 10px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFEFE;
        text-align: right;
    }

    .private_list {
        display: flex;
        padding: 10px 0 10px 8px;
        border-top: 2px solid #988888;
        border-bottom: 2px solid #988888;

        .photo {
            box-sizing: border-box;
            position: relative;
            width: 90px;
            height: 90px;
            margin-right: 40px;

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

        .private_name {
            display: flex;


            .names {
                vertical-align: top;
                font-size: 26px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFEFE;
            }

            .level {
                position: relative;
                top: 4px;
                width: 60px;
                height: 30px;
                margin-left: 10px;
                background-color: #1bc899;
                text-align: center;
                color: #FFF;
                font-size: 24px;
                line-height: 32px;
                vertical-align: top;

                .levels {
                    position: absolute;
                    left: -10px;
                    top: 0;
                    width: 30px;
                    height: 30px;
                    background: url('@/assets/level/level1.png') no-repeat;
                    background-size: cover;
                }
            }
        }

        .private,
        .time {
            height: 60px;
            margin-left: 230px;
            padding: 0 26px;
            background: #FF5656;
            border-radius: 20px;
            line-height: 56px;
            text-align: center;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFEFE;
        }

        .time {
            width: 180px;
            margin-left: 130px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFEFE;
            background-color: transparent;
            font-size: 20px;
            opacity: 0.4;
        }
    }

    .tab_bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;

        .back {
            width: 31px;
            height: 31px;
            background: url('@/assets/authorDetail/back.png') no-repeat;
            background-size: cover;
        }

        .title {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 800;
            color: #FFFEFE;
        }

        .close {
            width: 31px;
            height: 31px;
            background: url('@/assets/authorDetail/close.png');
            background-size: cover;
        }
    }

    .like {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        padding: 6px 10px;
        background-color: rgb(255, 255, 255, 0.2);

        span {
            width: 80%;
            height: 40px;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFEFE;
            line-height: 40px;
            opacity: 0.6;

        }

        .hear {
            width: 104px;
            height: 50px;
            background: url('@/assets/authorDetail/follow.png') no-repeat;
            background-size: cover;
        }
    }

    .msg_body {
        overflow: scroll;
        width: 100%;
        height: 268px;

        .my_msg,
        .you_msg {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: end;
            width: 100%;
            margin: 30px 0;
            padding-right: 30px;

            .msg_box {
                height: 60px;
                line-height: 60px;
                padding: 0 10px;
                background-color: rgba(255, 255, 255, 0.2);
                font-size: 26px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFEFE;
            }

            .sj {
                width: 0px;
                height: 0px;
                margin-right: 20px;
                border-bottom: 20px solid transparent;
                border-top: 20px solid transparent;
                border-left: 20px solid rgba(255, 255, 255, 0.2);
            }

            .aricle {

                .photo {
                    box-sizing: border-box;
                    position: relative;
                    width: 90px;
                    height: 90px;

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
            }
        }

        .you_msg {
            justify-content: start;
            padding-left: 30px;

            .sjs {
                margin: 0;
                margin-left: 0px;
                width: 0px;
                height: 0px;
                border-bottom: 20px solid transparent;
                border-top: 20px solid transparent;
                border-right: 20px solid rgba(255, 255, 255, 0.2);
            }
        }


    }

    .msg_content {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        padding: 0 6px;

        input {
            display: block;
            width: 79%;
            height: 60px;
            color: white;
            font-size: 30px;
            background-color: rgba(255, 255, 255, 0.3);
            border: 0px
        }

        .msg_send {
            height: 60px;
            padding: 0 30px;
            background: #FF567A;
            border-radius: 30px;
            text-align: center;
            margin-left: 10px;
            line-height: 60px;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
        }
    }
}
</style>