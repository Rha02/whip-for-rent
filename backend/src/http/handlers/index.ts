import { CarRepository, NewCarRepository } from './carHandlers';
import { UserRepository, NewUserRepository } from './userHandlers';
import Config from '@/config';

// Export HTTP handlers here
interface Repository {
    Car: CarRepository;
    User: UserRepository;
}

const NewRepository = (app: Config): Repository => {
    return {
        Car: NewCarRepository(app),
        User: NewUserRepository(app)
    };
};

export { Repository, NewRepository };
