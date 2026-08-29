import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'pg78qsiy',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
  }
})
