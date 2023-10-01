import { Car, User } from 'models';

interface DatabaseRepository {
    getCarByID: (id: string) => Promise<Car | null>;
    getUserByID: (id: string) => Promise<User | null>;
}

export default DatabaseRepository;
