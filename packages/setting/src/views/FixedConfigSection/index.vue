<template>
  <el-descriptions
    title="代理模式配置:"
    :column="1"
    direction="vertical"
    border
  >
    <el-descriptions-item label="代理地址(例如：127.0.0.1:1080)">
      <ProxyConfig />
    </el-descriptions-item>
    <el-descriptions-item label="白名单，不走代理">
      <BypassConfig />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import ProxyConfig from './components/ProxyConfig.vue'
import BypassConfig from './components/BypassConfig.vue'

</script>

<style scoped>

</style>
