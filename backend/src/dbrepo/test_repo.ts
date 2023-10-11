import { Car, User } from '@/models';
import DatabaseRepository from './repository';

// export function to create a new repository
const NewTestRepo = (): DatabaseRepository => {

    const getCars = async (): Promise<Car[]> => {
        return [];
    };

    const getCarByID = async (id: string): Promise<Car | null> => {
        return {
            id: id,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            color: 'White',
            price: 25000,
            image_url: '',
            createdAt: new Date(),
            updatedAt: new Date()
        };
    };

    const createCar = async (car: Car): Promise<Car | null> => {
        return car;
    };

    const getUserByID = async (id: number): Promise<User | null> => {
        return {
            id: id,
            email: 'bruce@wayne.loc',
            password: 'password',
            firstName: 'Bruce',
            lastName: 'Wayne',
            createdAt: new Date(),
            updatedAt: new Date()
        };
    };

    return {
        getCars,
        getCarByID,
        createCar,
        getUserByID
    };
};

export default NewTestRepo;
