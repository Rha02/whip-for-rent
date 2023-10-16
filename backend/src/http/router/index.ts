import express from 'express';
import { NewRepository } from '@http/handlers';
import Config from '@/config';

const router = express.Router();

const NewRouter = (app: Config) => {
    const repo = NewRepository(app);

    // Attach User routes
    router.route('/users/login').post(repo.User.login);
    router.route('/users/register').post(repo.User.register);
    router.route('/users/checkauth').get(repo.User.checkAuth);

    // Attach Car routes
    router.route('/cars').get(repo.Car.getCars);
    router.route('/cars/:id').get(repo.Car.getCar);
    router.route('/cars').post(repo.Car.postCar);
    router.route('/cars/:id').put(repo.Car.updateCar);
    router.route('/cars/:id').delete(repo.Car.deleteCar);

    return router;
};

export { NewRouter };
