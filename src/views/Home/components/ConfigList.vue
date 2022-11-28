<template>
  <div class="config-list">
    <NCard
      v-for="(config, configIdx) in props.list"
      :key="configIdx"
      :bordered="false"
      class="config-card"
      hoverable
      embedded
    >
      <div class="config-item">
        <n-form-item label="Host:" label-placement="left">
          {{ config.Host }}
        </n-form-item>
        <n-form-item label="HostName:" label-placement="left">
          {{ config.HostName }}
        </n-form-item>
        <n-form-item label="IdentityFile:" label-placement="left">
          {{ config.IdentityFile }}
        </n-form-item>
        <n-form-item label="PreferredAuthentications:" label-placement="left">
          {{ config.PreferredAuthentications }}
        </n-form-item>
        <n-form-item label="User:" label-placement="left">
          {{ config.User }}
        </n-form-item>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { ConfigItem } from '@/utils/parseSSHConfig'
import { NCard, NFormItem } from 'naive-ui'
const props = defineProps({
  list: {
    type: Array as PropType<ConfigItem[]>,
    default: () => []
  }
})
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
