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

    const updateCar = async (car: Car): Promise<Car | null> => {
        return car;
    };

    const deleteCar = async (id: string): Promise<void> => {
        console.log(`Deleting car with id ${id}`);
    };

    const getUserByEmail= async (email: string): Promise<User | null> => {
        return {
            id: 12345,
            email: email,
            password: 'password',
            firstName: 'Bruce',
            lastName: 'Wayne',
            createdAt: new Date(),
            updatedAt: new Date(),
            access_level: 3
        };
    };


    const getUserByID = async (id: number): Promise<User | null> => {
        return {
            id: id,
            email: 'bruce@wayne.loc',
            password: 'password',
            firstName: 'Bruce',
            lastName: 'Wayne',
            createdAt: new Date(),
            updatedAt: new Date(),
            access_level: 3
        };
    };

    const createUser = async (user: User) => {
        return user;
    };

    return {
        getCars,
        getCarByID,
        createCar,
        updateCar,
        deleteCar,
        getUserByEmail,
        getUserByID,
        createUser
    };
};

export default NewTestRepo;
