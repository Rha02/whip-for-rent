import DatabaseRepository from '@dbrepo/repository';
import { CarRepository, NewCarRepository } from './carHandlers';
import { UserRepository, NewUserRepository } from './userHandlers';
import { AuthTokenRepository } from '@/services/authrepo';

// Export HTTP handlers here
interface Repository {
    Car: CarRepository;
    User: UserRepository;
}

const NewRepository = (db: DatabaseRepository, authRepo: AuthTokenRepository): Repository => {
    return {
        Car: NewCarRepository(db, authRepo),
        User: NewUserRepository(db, authRepo)
    };
};

export { Repository, NewRepository };
