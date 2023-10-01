import DatabaseRepository from '@dbrepo/repository';
import { CarRepository, NewCarRepository } from './carHandlers';
import { UserRepository, NewUserRepository } from './userHandlers';

// Export HTTP handlers here
interface Repository {
    Car: CarRepository;
    User: UserRepository;
}

const NewRepository = (db: DatabaseRepository): Repository => {
    return {
        Car: NewCarRepository(db),
        User: NewUserRepository(db)
    };
};

export { Repository, NewRepository };
