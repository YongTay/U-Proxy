<template>
  <div class="flex gap-2">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="w-200"
      size="small"
      placeholder="SOCKS5 127.0.0.1:1080"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">
      + 代理地址
    </el-button>
  </div>
</template>

<script setup>
import { savePacModeConfig, getPacModeConfig } from '@uproxy/common/pacMode.js'
const inputValue = ref('SOCKS5')
const dynamicTags = ref([])
const inputVisible = ref(false)
const InputRef = ref()

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value?.input?.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = 'SOCKS5'
}

let configData = {}
getPacModeConfig(config => {
  dynamicTags.value = config?.customProxy || []
})

watch(() => dynamicTags.value, () => {
  savePacModeConfig({
    customProxy: dynamicTags.value
  })
}, { deep: true })

</script>

<style scoped>
.flex {
  display: flex;
  justify-content: flex-start;
}
.flex.gap-2 > *{
  margin-right: 5px;
}
.w-200 {
  width: 200px;
}
</style>
