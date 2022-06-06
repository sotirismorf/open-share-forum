import * as express from 'express'
import * as bodyParser from 'body-parser'

import { AppDataSource } from './AppDataSource'
import { appRoutes } from './routes/courseRoutes'

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
    AppDataSource.synchronize().then(() => {
      console.log('Data Source has been synchronized!')

      const app = express()
      app.use(bodyParser.json())

      for (const route of appRoutes) {
        app[route.method](route.path, route.action)
      }
      app.listen(3000)
    })
  })

  .catch((err) => {
    console.error('Error during Data Source synchronization', err)
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
