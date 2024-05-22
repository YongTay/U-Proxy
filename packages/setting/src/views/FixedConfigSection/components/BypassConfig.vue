<template>
  <el-input
    v-model="bypassList"
    resize="none"
    type="textarea"
    rows="8"
    :placeholder="comment"
    @change="onChange"
  />
</template>

<script setup>
import { saveFixedModeConfig, getFixedModeConfig } from '@uproxy/common/fixedMode.js'
const comment = `[
// "baidu.com",
// "apple.com"
// 不走代理的白名单地址往下填写，格式如上

]`
const bypassList = ref(comment)

const onChange = (config) => {
  saveFixedModeConfig({
    bypassList: config.trim()
  })
}

getFixedModeConfig(config => {
  if (config.bypassList) {
    bypassList.value = config.bypassList
  } else {
    bypassList.value = comment
  }
})
</script>

<style scoped>

</style>
