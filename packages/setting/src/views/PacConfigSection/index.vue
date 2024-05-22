<template>
  <el-descriptions
      title="PAC 模式配置:"
      :column="1"
      direction="vertical"
      border
  >
    <el-descriptions-item label="自定义PAC配置,多个域名使用英文分号(;)进行分割">
      <ProxyTag />
      <ProxyList />
    </el-descriptions-item>
    <el-descriptions-item label="在线URL">
      <div style="display: flex">
        <el-input v-model.trim="pacUrl" style="margin: 0 10px 10px 0;" @change="onChange" clearable />
        <el-button size="mini" type="primary" @click="onClick">在线下载</el-button>
      </div>
      <el-input v-model="pacScript" type="textarea" rows="10" resize="none" @change="onChange" />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { savePacModeConfig, getPacModeConfig } from '@uproxy/common/pacMode.js'
import ProxyTag from "./ProxyTag.vue";
import ProxyList from "./ProxyList.vue";

const pacUrl = ref('')
const pacScript = ref('')

const onChange = () => {
  console.log('pac', pacUrl.value)
  savePacModeConfig({
    url: pacUrl.value,
    script: pacScript.value
  })
}

const onClick = () => {
  let url = 'https://raw.githubusercontent.com/petronny/gfwlist2pac/master/gfwlist.pac'
  if (pacUrl.value) {
    if (!/^https?:\/\/.+/.test(pacUrl.value)) {
      ElMessage({
        message: '无效的url',
        type: 'warning'
      })
      return
    }
    url = pacUrl.value
  }
  fetch(url).then(res => res.text()).then(text => {
    pacScript.value = text
    onChange()
  })
}

getPacModeConfig(config => {
  console.log(config)
  if (config?.url) {
    pacUrl.value = config.url
  }
  if (config?.script) {
    pacScript.value = config.script
  }
})
</script>

<style scoped>

</style>
