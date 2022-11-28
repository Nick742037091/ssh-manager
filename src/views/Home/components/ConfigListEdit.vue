<template>
  <div class="config-list">
    <NCard
      v-for="(config, configIdx) in list"
      :key="configIdx"
      :bordered="false"
      class="config-card"
      hoverable
      embedded
    >
      <div class="config-item">
        <n-form-item label="Host:" label-placement="left">
          <NInput v-model:value="config.Host" />
        </n-form-item>
        <n-form-item label="HostName:" label-placement="left">
          <NInput v-model:value="config.HostName" />
        </n-form-item>
        <n-form-item label="IdentityFile:" label-placement="left">
          <NInput v-model:value="config.IdentityFile" />
        </n-form-item>
        <n-form-item label="PreferredAuthentications:" label-placement="left">
          <NInput v-model:value="config.PreferredAuthentications" />
        </n-form-item>
        <n-form-item label="User:" label-placement="left">
          <NInput v-model:value="config.User" />
        </n-form-item>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { ConfigItem } from '@/utils/parseSSHConfig'
import { NCard, NFormItem, NInput } from 'naive-ui'
import { cloneDeep } from 'lodash'
const list = ref<ConfigItem[]>()
const setData = (_list: ConfigItem[]) => {
  list.value = cloneDeep(_list)
}
defineExpose({ setData })
</script>

<style scoped lang="scss">
.config-list {
  display: flex;
  flex-wrap: wrap;
}
.config-card {
  width: calc(50% - 20px);
  margin: 10px;
}
.config-item {
  display: flex;
  flex-direction: column;
}
</style>
