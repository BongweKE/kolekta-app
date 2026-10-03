import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '998ifqep',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
  }
})
