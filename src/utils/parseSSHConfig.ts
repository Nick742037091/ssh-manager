export interface ConfigItem {
  Host?: string
  HostName?: string
  User?: string
  PreferredAuthentications?: string
  IdentityFile?: string
}

export default (strConfig: string): ConfigItem[] => {
  // TODO 判断配置文件出错
  const rowList = strConfig.split('\n').filter((row) => row.trim())
  const configList: ConfigItem[] = []
  let curConfig: ConfigItem = {}
  rowList.forEach((row, index) => {
    row = row.trim()
    if (!row) return
    const [key, value] = row.split(/[\s]+/g)
    if (key === 'Host') {
      if (curConfig.Host) {
        configList.push(curConfig)
      }
      curConfig = {}
    }
    curConfig[key as keyof ConfigItem] = value
    // 最后一行结束配置
    if (index === rowList.length - 1) {
      configList.push(curConfig)
    }
  })
  console.log(configList)
  return configList
}
