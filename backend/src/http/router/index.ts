import express from 'express';
import { NewRepository } from '@http/handlers';
import Config from '@/config';
import { requiresAuth, requiresMod } from '../middleware';

const router = express.Router();

const NewRouter = (app: Config) => {
    const repo = NewRepository(app);

    // Initialize middleware functions
    const isMod = requiresMod(app);
    const isAuth = requiresAuth(app);

    // Attach User routes
    router.route('/users/login').post(repo.User.login);
    router.route('/users/register').post(repo.User.register);
    router.route('/users/checkauth').get(isAuth, repo.User.checkAuth);

    // Attach Car routes
    router.route('/cars').get(repo.Car.getCars);
    router.route('/cars/:id').get(repo.Car.getCar);
    router.route('/cars').post(isMod, repo.Car.postCar);
    router.route('/cars/:id').put(isMod, repo.Car.updateCar);
    router.route('/cars/:id').delete(isMod, repo.Car.deleteCar);

    // Attach Reservation routes
    router.route('/reservations').post(isAuth, repo.Reservation.reserve);
    router.route('/reservations/:id').post(isAuth, repo.Reservation.deleteReservation);
    router.route('/users/reservations').get(isAuth, repo.Reservation.getUserReservations);
    router.route('/cars/:id/reservations').get(repo.Reservation.getCarReservations);

    return router;
};

export { NewRouter };
