import { CarRepository, NewCarRepository } from './carHandlers';
import { UserRepository, NewUserRepository } from './userHandlers';
import { ReservationRepository, NewReservationRepository } from './reservationHandlers';
import { CarLocationRepository, NewCarLocationRepository } from './carLocationHandlers';
import Config from '@/config';
import { NewPaymentRepository, PaymentRepository } from './paymentHandlers';


// Export HTTP handlers here
interface Repository {
    CarLocation: CarLocationRepository;
    Car: CarRepository;
    User: UserRepository;
    Reservation: ReservationRepository;
    Payment: PaymentRepository
}

const NewRepository = (app: Config): Repository => {
    return {
        Car: NewCarRepository(app),
        User: NewUserRepository(app),
        Reservation: NewReservationRepository(app),
        CarLocation: NewCarLocationRepository(app),
        Payment: NewPaymentRepository(app)
    };
};

export { Repository, NewRepository };
