import express from 'express';
import dotenv from 'dotenv';
import { NewRouter } from './http/router';
import { NewTestRepo } from './dbrepo';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

const db = NewTestRepo();

const router = NewRouter(db);

app.use('/', router);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
