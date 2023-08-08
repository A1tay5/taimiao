<template>
  <StudioIndex />
</template>
<script lang="ts" setup name="author">
import StudioIndex from '@/components/Studio/index.vue'
import { htmlLode } from '@/socket/VideoHtmlLode'
htmlLode.toUserIpType()
</script>
<style scoped lang="scss"></style>
@/utils/VideoHtmlLode