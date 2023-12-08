import express from 'express';
import cors from 'cors';
import Config from '@/config';
import { NewTestRepo } from '@/dbrepo';
import { NewTestAuthRepo } from '@/services/authrepo';
import { NewTestHashRepo } from '@/services/hashrepo';
import { NewTestFileStorageRepo } from '@/services/filestoragerepo';
import { NewRouter } from '@http/router';

// Set up the express app
const app = express();
app.use(cors());
app.use(express.json());

// Set up the app-wide config
const appConfig: Config = {
    db: NewTestRepo(),
    authTokenRepo: NewTestAuthRepo(),
    hashRepo: NewTestHashRepo(),
    imageStorage: NewTestFileStorageRepo(),
};

// Set up the router
const router = NewRouter(appConfig);
app.use('/', router);

export default app;