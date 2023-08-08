<template>
    <div class="myRank_con">
        <div class="content">
            <div class="ct_top">
                <div class="c_top1">
                    <div class="topbox">
                        <div class="topheand">
                            <img src="https://img.winnine.com.au/pic/avator/2021-05/11/18/20210511182022_62475796_250.png"
                                alt="">

                        </div>
                        <div class="heandking">
                            <img src="@/assets/my/one@2x.png" alt="">
                        </div>
                        <div class="topnum">
                            <img src="@/assets/my/1@2x.png" alt="">
                        </div>
                    </div>
                    <div class="txtbox">
                        <div class="in">
                            <span class="name">.记录李隆基考虑涂抹呜呜呜呜呜</span>
                            <img class="sex" :src="female" alt="">
                            <span>
                                <div class="the_level">
                                    <div class="level level1"></div>
                                    <div class="num bg1">28</div>
                                </div>
                            </span>
                        </div>
                        <div class="txt">Consume：610</div>
                    </div>
                </div>
                <div class="top">
                    <div class="c_top2">
                        <div class="topbox">
                            <div class="topheand">
                                <img src="https://img.winnine.com.au/pic/avator/2021-05/11/18/20210511182022_62475796_250.png"
                                    alt="">

                            </div>
                            <div class="heandking">
                                <img src="@/assets/my/two@2x.png" alt="">
                            </div>
                            <div class="topnum">
                                <img src="@/assets/my/2@2x.png" alt="">
                            </div>
                        </div>
                        <div class="txtbox">
                            <div class="in">
                                <span class="name">.记录李隆基考虑涂抹呜呜呜呜呜</span>
                                <img class="sex" :src="female" alt="">
                                <span>
                                    <div class="the_level">
                                        <div class="level level1"></div>
                                        <div class="num bg1">28</div>
                                    </div>
                                </span>
                            </div>
                            <div class="txt">Consume：610</div>
                        </div>
                    </div>
                    <div class="c_top3">
                        <div class="topbox">
                            <div class="topheand">
                                <img src="https://img.winnine.com.au/pic/avator/2021-05/11/18/20210511182022_62475796_250.png"
                                    alt="">

                            </div>
                            <div class="heandking">
                                <img src="@/assets/my/three@2x.png" alt="">
                            </div>
                            <div class="topnum">
                                <img src="@/assets/my/3@2x.png" alt="">
                            </div>
                        </div>
                        <div class="txtbox">
                            <div class="in">
                                <span class="name">.记录李隆基考虑涂抹呜呜呜呜呜</span>
                                <img class="sex" :src="female" alt="">
                                <span>
                                    <div class="the_level">
                                        <div class="level level1"></div>
                                        <div class="num bg1">28</div>
                                    </div>
                                </span>
                            </div>
                            <div class="txt">Consume：610</div>
                        </div>
                    </div>
                </div>
            </div>
            <van-list style="padding: 0 10px;" v-model:loading="loading" :finished="finished" :finished-text="false"
                @load="onLoad">
                <div class="eachitem" v-for="(i) in 7" :key="i">
                    <div class="ranknum">{{ i + 3 }}</div>

                    <img class="user"
                        src="https://img.winnine.com.au/pic/avator/2021-05/11/18/20210511182022_62475796_250.png" alt="">


                    <div class="txtbox">
                        <div class="in">
                            <span class="name">.记录李隆基考虑涂抹呜呜呜呜呜</span>
                            <img class="sex" :src="female" alt="">
                            <span>
                                <div class="the_level">
                                    <div class="level level1"></div>
                                    <div class="num bg1">28</div>
                                </div>
                            </span>
                        </div>
                        <div class="txt">Consume：610</div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>
<script setup  lang="ts">
import male from "@/assets/my/male@2x.png";
import female from "@/assets/my/female@2x.png";
import '@/assets/level/level.scss'
const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
};
</script>
<style lang="scss" scoped>
.myRank_con {
    width: 100%;
    padding: 20px 20px 200px;
    box-sizing: border-box;
    background-color: #f2f2f2;

    .content {
        border-radius: 15px;
        overflow: hidden;
        padding-bottom: 20px;
        background-color: #fff;

        .ct_top {
            width: 100%;
            height: 600px;
            background-image: url('@/assets/my/ct_top_bg.png');
            background-size: 100% 100%;
            padding: 0 20px;
            box-sizing: border-box;

            .c_top1 {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                flex-direction: column;
                padding: 80px 0 0;

                .topheand {
                    background-image: -webkit-linear-gradient(top, #fbf074, #ffb924);
                }
            }

            .top {
                display: flex;
                justify-content: space-between;

                .c_top2 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    flex-direction: column;

                    .topheand {
                        background-image: -webkit-linear-gradient(top, #cbe1f1, #74b5fd);
                    }
                }

                .c_top3 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    flex-direction: column;

                    .topheand {
                        background-image: -webkit-linear-gradient(top, #ffdd80, #ff9136);
                    }
                }
            }
        }



        .topbox {
            position: relative;

            .topheand {
                width: 140px;
                height: 140px;
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                img {
                    width: 90%;
                    height: 90%;
                    border-radius: 50%;
                }


            }

            .heandking {
                position: absolute;
                top: -48px;
                right: -20px;

                img {
                    width: 100px;
                }
            }

            .topnum {
                position: absolute;
                bottom: -25px;
                left: 33%;

                img {
                    width: 50px;
                }
            }
        }

        .txtbox {
            margin-top: 30px;
            width: 300px;

            .in {
                display: flex;
                align-items: center;
                justify-content: center;

                .name {
                    max-width: 50%;
                    overflow: hidden;
                    word-break: keep-all;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    vertical-align: top;
                    // display: inline-block;
                    font-size: 25px;
                }

                .sex {
                    width: 30px;
                }

                .the_level {
                    display: flex;
                    align-items: center;

                    .level {
                        width: 35px;
                        height: 35px;
                        background-size: 100% 100%;
                        z-index: 11;
                    }

                    .num {
                        width: 65px;
                        height: 25px;
                        background-size: 100% 100%;
                        margin-left: -15px;
                        display: flex;
                        color: #fff;
                        justify-content: center;
                        align-items: center;
                        font-size: 20px;
                    }
                }
            }

            .txt {
                font-size: 25px;
                color: #b2b0ad;
                text-align: center;
            }
        }

        .eachitem {
            width: 100%;
            height: 120px;
            display: flex;
            align-items: center;
            border-top: 1px solid #e0e0e0;

            .ranknum {
                font-size: 35px;
                color: #f06868;
                text-align: center;
                font-weight: bold;
                width: 100px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .user {
                border-radius: 50%;
                width: 80px;
                height: 80px;
            }

            .txtbox {
                justify-content: flex-start;
                margin-top: 0;

                .txt {
                    text-align: left;
                    margin-left: 200px0px;
                }
            }
        }
    }


}
</style>