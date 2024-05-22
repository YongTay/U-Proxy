<template>
    <el-form>
        <el-form-item label="SOCKS5">
            <el-input
                v-model.trim="socks5"
                clearable
                style="max-width: 500px"
                @change="handleChange"
            />
        </el-form-item>
    </el-form>
</template>

<script setup>
import { saveFixedModeConfig, getFixedModeConfig } from '@uproxy/common/fixedMode.js'

const socks5 = ref('');

getFixedModeConfig((config) => {
  console.log('setting getFixedModeConfig', config)
  socks5.value = config.socks5
})

const handleChange = (val) => {
    if (!socks5.value) {
        socks5.value = val;
    }
  saveFixedModeConfig({
        socks5: socks5.value,
    });
};
</script>

<style scoped></style>
