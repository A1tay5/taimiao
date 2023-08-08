<template>
    <div class="chat" ref="chat">
        <div id="cen">
            <div class="item_system">系统消息:直播若出现低俗，色情，喝酒，使用毒品等情况，将按平台规定受到违规处罚。在直播及观看直播过程中，请大家遵守规定，友好互动喲</div>
            <div class="item" v-for="item in 6">
                <span class="level_bg">
                    <span class="level"></span>
                    <span class="num">17</span>
                </span>
                <span class="nick_name">🐯™ъసืӨន้ণध™🐯:</span>
                <span class="message">@🍸YSH🥑❹➃❹🧁🦭，หนูชื่อน้องวายวุ่นครับ</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup name="StudioChat">
import { onMounted, ref, nextTick } from 'vue'
import $ from 'jquery'
const messageList = []
onMounted(() => {
    nextTick(() => {
        $('.chat').scrollTop($('.chat')[0].scrollHeight)
    })
})
</script>
<style scoped lang='scss'>
.chat {
    position: absolute;
    left: 0;
    z-index: 11;
    bottom: 100px;
    width: 73%;
    height: 300px;
    overflow: hidden;
    overflow-y: scroll;
    background-color: rgba(0, 0, 0, 0.2);

    #cen {
        .item_system {
            color: #ff5677;
            font-size: 24px;
            line-height: 30px;
        }

        .item {
            padding: 0 4px;

            .level_bg {
                display: inline-block;
                width: 60px;
                height: 34px;
                background-color: #1bc899;

                .num {
                    display: inline-block;
                    font-size: 16px;
                    color: #fff;
                    vertical-align: top;
                }

                .level,
                .level1,
                .level11,
                .level15,
                .level30,
                .level31,
                .level32,
                .level34,
                .level35,
                .level36,
                .level39 {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    vertical-align: top;
                }

                .level1 {
                    background: url('@/assets/level/level1.png') no-repeat;
                    background-size: cover;
                }

                .level11 {
                    background: url('@/assets/level/level11.png') no-repeat;
                    background-size: cover;
                }

                .level15 {
                    background: url('@/assets/level/level15.png') no-repeat;
                    background-size: cover;
                }

                .level30 {
                    background: url('@/assets/level/level30.png') no-repeat;
                    background-size: cover;
                }

                .level31 {
                    background: url('@/assets/level/level31.png') no-repeat;
                    background-size: cover;
                }

                .level32 {
                    background: url('@/assets/level/level32.png') no-repeat;
                    background-size: cover;
                }

                .level34 {
                    background: url('@/assets/level/level34.png') no-repeat;
                    background-size: cover;
                }

                .level35 {
                    background: url('@/assets/level/level35.png') no-repeat;
                    background-size: cover;
                }

                .level36 {
                    background: url('@/assets/level/level36.png') no-repeat;
                    background-size: cover;
                }

                .level39 {
                    background: url('@/assets/level/level39.png') no-repeat;
                    background-size: cover;
                }
            }

            .nick_name {
                color: #ffda77;
                font-size: 16px;
            }

            .message {
                margin-left: 8px;
                vertical-align: top;
                font-size: 16px;
                color: #fff;
            }
        }
    }

}
</style>