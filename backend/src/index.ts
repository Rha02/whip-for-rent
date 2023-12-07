import express from 'express';
import dotenv from 'dotenv';
import { NewRouter } from '@http/router';
import { NewMySQLRepo } from '@/dbrepo';
import cors from 'cors';
import fs from 'fs';
import { connectMySQL } from '@/driver';
import { NewJWTAuthRepo } from '@/services/authrepo';
import { NewBCryptHashRepo } from '@/services/hashrepo';
import Config from './config';
import { NewAzureRepo } from '@/services/filestoragerepo';

const main = async () => {
    dotenv.config();

    const app = express();
    app.use(cors());
    app.use(express.json());

    const port = process.env.PORT || 8080;

    // Set up Config Variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET not set");
        process.exit(1);
    }

    const azureConn = process.env.AZURE_STORAGE_CONNECTION;
    if (!azureConn) {
        console.error("AZURE_STORAGE_CONNECTION not set");
        process.exit(1);
    }

    const conn = await connectMySQL({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: parseInt(process.env.MYSQL_PORT || '3306'),
        ssl: {
            ca: fs.readFileSync("./mysql-ca-master.crt.pem")
        }
    });
    
    // Set up App-wide Config
    const appConfig: Config = {
        db: NewMySQLRepo(conn.MySQL),
        authTokenRepo: NewJWTAuthRepo(jwtSecret),
        hashRepo: NewBCryptHashRepo(10),
        imageStorage: NewAzureRepo(azureConn)
    };

    const router = NewRouter(appConfig);

    app.use('/', router);

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
};

main();
