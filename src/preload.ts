import { contextBridge } from 'electron'
import fs from 'fs'
import child_process from 'child_process'
// 当前用户主目录
const USER_HOME = process.env.HOME || process.env.USERPROFILE

contextBridge.exposeInMainWorld('fs', fs)
contextBridge.exposeInMainWorld('env', { USER_HOME })
contextBridge.exposeInMainWorld('child_process', child_process)
