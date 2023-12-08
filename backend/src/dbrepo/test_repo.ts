/* eslint-disable @typescript-eslint/no-unused-vars */
import { Car, CarLocation, Payment, Reservation, User} from '@/models';
import DatabaseRepository from './repository';
import { PaymentWithDetails } from '@/types';

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
            image_name: '',
            location_id: 1,
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
        if (email == 'invalidemail@wfr.loc') {
            return null;
        }
        return {
            id: "12345",
            email: email,
            password: 'testpassword',
            first_name: 'Bruce',
            last_name: 'Wayne',
            created_at: new Date(),
            updated_at: new Date(),
            access_level: 3
        };
    };


    const createUser = async (user: User) => {
        return user;
    };

    const createReservation = async (reservation: Reservation) => {
        return reservation;
    };

    const getUserReservations = async (userID: string) => {
        const reservations: Reservation[] = [];
        return userID ? reservations : null;
    };

    const getCarReservations = async (carID: string) => {
        const reservations: Reservation[] = [];
        return reservations;
    };

    const deleteReservation = async (reservationID: number) => {
        return reservationID ? true : false;
    };
    
    const deleteLocation = async (id: number): Promise<void> => {
        console.log(`Deleting location with id ${id}`);
    };

    const getLocations = async (): Promise<CarLocation[]> => {
        return [];
    };

    const getLocationByID = async (id: number): Promise<CarLocation | null> => {
        return {
            id: id,
            city: 'New York'
        };
    };

    const updateLocation =async (CarLocation: CarLocation): Promise<CarLocation[] | null> => {
        const location: CarLocation[] = [];
        return CarLocation ? location : null;
        
    };

    const createLocation =async (CarLocation: CarLocation): Promise<CarLocation[] | null> => {
        const location: CarLocation[] = [];
        return CarLocation ? location : null;
        
    };

    const createPayment = async (payment: Payment) => {
        return payment;
    };

    const getUserPayments = async (userID: string) => {
        const payments: PaymentWithDetails[] = [];
        return userID ? payments : null;
    };

    const getCarMakes = async (): Promise<string[]> => {
        return [];
    };

    const getCarMakeModels = async (make: string): Promise<string[]> => {
        return [];
    };

    const getCarColors = async (): Promise<string[]> => {
        return [];
    };

    return {
        getCars,
        getCarByID,
        createCar,
        updateCar,
        deleteCar,
        getUserByEmail,
        createUser,
        createReservation,
        getUserReservations,
        getCarReservations,
        deleteReservation,
        deleteLocation,
        getLocations,
        getLocationByID,
        updateLocation,
        createLocation,
        createPayment,
        getUserPayments,
        getCarMakes,
        getCarMakeModels,
        getCarColors
    };
};

export default NewTestRepo;
