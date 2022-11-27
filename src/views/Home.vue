<template>
  <div class="home">
    <!-- <div @click="ls">打开文件</div> -->
  </div>
</template>

<script lang="ts" setup>
import parseSSHConfig from '@/utils/parseSSHConfig'
const readSSHConfig = () => {
  window.fs.readFile(
    window.env.USER_HOME + '/.ssh/config',
    { encoding: 'utf-8' },
    (error, data) => {
      if (error) {
        console.info('读取SSH配置文件失败')
        return
      }
      parseSSHConfig(data)
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
