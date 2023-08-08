<template>
    <div class="swiper">
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide" v-for="(item, index) in opfansList" :key="index">
                <VIDEO :url="item.url" :id="index" v-if="index == id"></VIDEO>
            </div>
        </div>
    </div>
</template>
<script setup  lang="ts">
import { onMounted } from 'vue'
import VIDEO from './video/aliplayer.vue';
import Swiper from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
const opfansList = ref([
    { url: 'src/assets/demo.mp4' },
    { url: 'src/assets/demo.mp4' },
    { url: 'src/assets/demo.mp4' },
    { url: 'src/assets/demo.mp4' }
])
const id = ref(0)
onMounted(() => {
    const swiper: any = new Swiper('.swiper', {
        // Optional parameters
        direction: 'vertical',
        on: {
            init: function () {
                // id.value = swiper.activeIndex
            },
            slideChangeTransitionStart: function () {

            },
            slideChangeTransitionEnd: function () {
                id.value = swiper.activeIndex
            }
        }
    });
})

</script>
<style lang="scss" scoped>
.swiper {
    width: 100%;
    height: 100vh;
}
</style>