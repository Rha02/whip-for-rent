import { CarRepository, NewCarRepository } from './carHandlers';
import { UserRepository, NewUserRepository } from './userHandlers';
import { ReservationRepository, NewReservationRepository } from './reservationHandlers';
import Config from '@/config';

// Export HTTP handlers here
interface Repository {
    Car: CarRepository;
    User: UserRepository;
    Reservation: ReservationRepository;
}

const NewRepository = (app: Config): Repository => {
    return {
        Car: NewCarRepository(app),
        User: NewUserRepository(app),
        Reservation: NewReservationRepository(app)
    };
};

export { Repository, NewRepository };
