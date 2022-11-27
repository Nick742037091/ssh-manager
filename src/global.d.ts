declare global {
  import type fs from 'fs'
  import type child_process from 'child_process'
  interface Window {
    fs: typeof fs
    env: {
      USER_HOME: string
    }
    child_process: typeof child_process
  }
}

export {}
