import express from 'express';
import { NewRepository } from '@http/handlers';
import Config from '@/config';
import { requiresAuth, requiresMod } from '../middleware';
import multer from 'multer';

const router = express.Router();

const NewRouter = (app: Config) => {
    const repo = NewRepository(app);

    // Initialize middleware functions
    const isMod = requiresMod(app);
    const isAuth = requiresAuth(app);

    // Create multer middleware for uploading files
    const inMemoryStorage = multer.memoryStorage();
    const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');

    // Attach User routes
    router.route('/users/login').post(repo.User.login);
    router.route('/users/register').post(repo.User.register);
    router.route('/users/checkauth').get(isAuth, repo.User.checkAuth);

    // Attach Car routes
    router.route('/cars').get(repo.Car.getCars);
    router.route('/cars/:id').get(repo.Car.getCar);
    router.route('/cars').post(isMod, uploadStrategy, repo.Car.postCar);
    router.route('/cars/:id').put(isMod, uploadStrategy, repo.Car.updateCar);
    router.route('/cars/:id').delete(isMod, repo.Car.deleteCar);

    // Attach Reservation routes
    router.route('/reservations').post(isAuth, repo.Reservation.reserve);
    router.route('/reservations/:id').post(isAuth, repo.Reservation.deleteReservation);
    router.route('/users/reservations').get(isAuth, repo.Reservation.getUserReservations);
    router.route('/cars/:id/reservations').get(repo.Reservation.getCarReservations);

    // Attach CarLocation routes
    router.route('/locations').post(repo.CarLocation.createLocation);
    router.route('/locations/:id').delete(repo.CarLocation.deleteLocation);
    router.route('/locations').get(repo.CarLocation.getLocations);
    router.route('/locations/:id').put(repo.CarLocation.updateLocation);

    return router;
};

export { NewRouter };
