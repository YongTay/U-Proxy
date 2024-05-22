<template>
  <div style="margin-top: 10px">
    <div v-for="(c, i) in configList" :key="i" style="display: flex; margin-top: 10px">
      <el-input v-model.trim="c.domain" placeholder='多个域名使用英文分号(";")进行分割(ps: baidu.com;google.com)'/>
      <el-select v-model="c.proxy" style="max-width: 300px; margin: 0 10px">
        <el-option value="DIRECT" label="直连模式" />
        <el-option v-for="i in proxyList" :key="i" :label="i" :value="i" />
      </el-select>
      <el-button :icon="CirclePlus" type="primary" @click="onAdd" />
      <el-button :disabled="i === 0" :icon="CircleClose" type="danger" @click="onRemove(c)"/>
    </div>
  </div>
</template>

<script setup>
import { CirclePlus, CircleClose } from '@element-plus/icons-vue'

import { savePacModeConfig, getPacModeConfig } from '@uproxy/common/pacMode.js'

const createDefaultConfig = (options = { proxy: '', domain: '' }) => {
  return {
    createTime: Date.now(),
    domain: options.domain,
    proxy: options.proxy
  }
}
const configList = ref([createDefaultConfig()])

const proxyList = ref([])

const onAdd = () => {
  configList.value.push(createDefaultConfig())
}

const onRemove = (c) => {
  configList.value = configList.value.filter(i => i !== c)
}

getPacModeConfig(config => {
  proxyList.value = config?.customProxy || []
  configList.value = config?.customsRules
  if (configList.value.length === 0) {
    configList.value = [createDefaultConfig()]
  }
})

watch(() => configList.value, () => {
  savePacModeConfig({
    customsRules: configList.value
  })
}, { deep: true })

</script>

<style scoped>

</style>
