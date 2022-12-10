export interface ConfigItem {
  status?: number
  Host?: string
  HostName?: string
  User?: string
  PreferredAuthentications?: string
  IdentityFile?: string
}

export const parseSSHConfig = (strConfig: string): ConfigItem[] => {
  // TODO 判断配置文件出错
  const rowList = strConfig.split('\n').filter((row) => row.trim())
  const configList: ConfigItem[] = []
  let curConfig: ConfigItem = {}
  rowList.forEach((row, index) => {
    row = row.trim()
    if (!row) return
    const splitResult = row.split(/[\s]+/g)
    const key = splitResult[0] as keyof ConfigItem
    const value = splitResult[1]
    if (key === 'Host') {
      if (curConfig.Host) {
        configList.push(curConfig)
      }
      curConfig = {
        status: 0
      }
    }
    if (key !== 'status') {
      curConfig[key] = value
    }
    // 最后一行结束配置
    if (index === rowList.length - 1) {
      configList.push(curConfig)
    }
  })
  // console.log(configList)
  return configList
}

export const getSSHStatus = (config: ConfigItem): Promise<number> => {
  return new Promise((resolve) => {
    // 超时时间3秒
    const command = `ssh -o ConnectTimeout=3 -T git@${config.HostName} `
    config.status = 0
    window.child_process.exec(command, (error, stdout) => {
      if (error) {
        // 包含successfully authenticated为验证成功
        if (error.message.includes('successfully authenticated')) {
          console.info(`${command}: `, error.message)
          config.status = 1
        } else {
          console.error(`${command}: `, error.message)
          config.status = 2
        }
      } else {
        console.info(`${command}: `, stdout)
        config.status = 1
      }
      resolve(config.status)
    })
  })
}
