<template>
  <div class="home">
    <!-- <div @click="ls">打开文件</div> -->
    <div class="config-list">
      <NCard
        v-for="(config, configIdx) in configList"
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
  </div>
</template>

<script lang="ts" setup>
import parseSSHConfig, { ConfigItem } from '@/utils/parseSSHConfig'
import { NCard, NFormItem } from 'naive-ui'
import { ref } from 'vue'

const configList = ref<ConfigItem[]>([])
const readSSHConfig = () => {
  window.fs.readFile(
    window.env.USER_HOME + '/.ssh/config',
    { encoding: 'utf-8' },
    (error, data) => {
      if (error) {
        console.info('读取SSH配置文件失败')
        return
      }
      configList.value = parseSSHConfig(data)
    }
  )
}
readSSHConfig()

// const ls = async () => {
//   window.child_process.exec('ls', (error, stdout) => {
//     if (error) {
//       console.error('error: ' + error)
//       return
//     }
//     console.log('stdout: \n' + stdout)
//   })
// }
</script>

<style lang="scss">
.home {
  margin: 20px 10px;
}
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
