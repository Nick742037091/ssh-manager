<template>
  <div class="home">
    <div v-if="isEdit">
      <n-button type="primary" style="margin-left: 10px" @click="toSave"
        >保存
      </n-button>
      <n-button style="margin-left: 10px" @click="toCancelEdit">取消</n-button>
    </div>
    <n-button v-else type="primary" style="margin-left: 10px" @click="toEdit"
      >编辑
    </n-button>
    <ConfigListEdit
      v-if="isEdit"
      :list="sshConfigList"
      ref="configListEdit"
      @update-config="onEditUpdate"
    />
    <ConfigList v-else :list="sshConfigList" />
  </div>
</template>

<script lang="ts" setup>
import parseSSHConfig, { ConfigItem } from '@/utils/parseSSHConfig'
import { NButton } from 'naive-ui'
import ConfigList from './components/ConfigList.vue'
import ConfigListEdit from './components/ConfigListEdit.vue'
import { nextTick, ref } from 'vue'
import { sshConfigPath } from './common'

const sshConfigList = ref<ConfigItem[]>([])
const readSSHConfig = () => {
  window.fs.readFile(sshConfigPath, { encoding: 'utf-8' }, (error, data) => {
    if (error) {
      console.info('读取SSH配置文件失败')
      return
    }
    sshConfigList.value = parseSSHConfig(data)
  })
}
readSSHConfig()
const configListEdit = ref<InstanceType<typeof ConfigListEdit>>()
const isEdit = ref(false)
const toEdit = () => {
  isEdit.value = true
  nextTick(() => {
    configListEdit?.value?.setData(sshConfigList.value)
  })
}
const toSave = () => {
  configListEdit.value?.save()
}
const toCancelEdit = () => {
  isEdit.value = false
}
const onEditUpdate = () => {
  readSSHConfig()
  isEdit.value = false
}

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
</style>
