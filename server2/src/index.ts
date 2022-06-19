import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';

import { AppDataSource } from './AppDataSource';
import { appRoutes } from './routes/courseRoutes';
import { fileRoutes } from './routes/fileRoutes';
import { userRoutes } from './routes/userRoutes';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    AppDataSource.synchronize().then(() => {
      console.log('Data Source has been synchronized!');

      const app = express();
      app.use(bodyParser.json());
      app.use(cors());
      app.use(
        fileUpload({
          limits: { fileSize: 50 * 1024 * 1024 },
        })
      );

      const routes = [...appRoutes, ...fileRoutes, ...userRoutes];

      for (const route of routes) {
        app[route.method](route.path, route.action);
      }

      app.listen(4000);
    });
  })

  .catch((err) => {
    console.error('Error during Data Source synchronization', err);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
