import express from 'express';
import { NewRepository } from '@http/handlers';
import DatabaseRepository from '@dbrepo/repository';

const router = express.Router();

const NewRouter = (db: DatabaseRepository) => {
    const repo = NewRepository(db);

    // Attach User routes
    router.route('/users/:id').get(repo.User.getUser);

    // Attach Car routes
    router.route('/cars').get(repo.Car.getCar);
    router.route('/cars/:id').get(repo.Car.getCar);
    router.route('/cars').post(repo.Car.postCar);
    router.route('/cars/:id').put(repo.Car.updateCar);
    router.route('/cars/:id').delete(repo.Car.deleteCar);

    return router;
};

export { NewRouter };
