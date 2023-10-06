import express from 'express';
import { NewRepository } from '@http/handlers';
import DatabaseRepository from '@dbrepo/repository';

const router = express.Router();

const NewRouter = (db: DatabaseRepository) => {
    const repo = NewRepository(db);

    // Attach User routes
    router.route('/users/login').post(repo.User.login);
    router.route('/users/register').post(repo.User.register);
    router.route('/users/checkauth').get(repo.User.checkAuth);

    // Attach Car routes
    router.route('/cars').get(repo.Car.getCar);
    router.route('/cars/:id').get(repo.Car.getCar);
    router.route('/cars').post(repo.Car.postCar);

    return router;
};

export { NewRouter };
