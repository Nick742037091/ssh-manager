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
        <div class="status-bar">
          <NSpin v-if="config.status === 0" :size="18" class="status-icon" />
          <NIcon
            v-else-if="config.status === 1"
            :size="18"
            :component="CheckCircleFilled"
            class="status-icon"
            color="#18a058"
          />
          <NIcon
            v-else-if="config.status === 2"
            :size="18"
            :component="CloseCircleFilled"
            class="status-icon"
            color="#d03050"
          />
          <NButton @click="checkAgain(config)" :disabled="config.status === 0"
            >重新检测</NButton
          >
        </div>
        <NFormItem label="Host:" label-placement="left">
          {{ config.Host }}
        </NFormItem>
        <NFormItem label="HostName:" label-placement="left">
          {{ config.HostName }}
        </NFormItem>
        <NFormItem label="IdentityFile:" label-placement="left">
          {{ config.IdentityFile }}
        </NFormItem>
        <NFormItem label="@/utils/sshConfigns:" label-placement="left">
          {{ config.PreferredAuthentications }}
        </NFormItem>
        <NFormItem label="User:" label-placement="left">
          {{ config.User }}
        </NFormItem>
      </div>
    </NCard>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { ConfigItem, getSSHStatus } from '@/utils/sshConfig'
import { NButton, NCard, NFormItem, NIcon, NSpin } from 'naive-ui'
import CheckCircleFilled from '@vicons/antd/CheckCircleFilled'
import CloseCircleFilled from '@vicons/antd/CloseCircleFilled'

const props = defineProps({
  list: {
    type: Array as PropType<ConfigItem[]>,
    default: () => []
  }
})

const checkAgain = (config: ConfigItem) => {
  getSSHStatus(config)
}
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
  .status-bar {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .status-icon {
      margin-right: 10px;
    }
  }
}
</style>
