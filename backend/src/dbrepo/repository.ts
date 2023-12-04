import { GetCarsFilter, PaymentWithDetails } from '@/types';
import { Car, Reservation, User, CarLocation, Payment } from 'models';

interface DatabaseRepository {
    /**
    * getCars() returns a list of cars from the database
    * @returns {Promise<Car[]>} A list of cars
    */
    getCars: (filter?: GetCarsFilter) => Promise<Car[]>;

    /**
     * getCarByID() returns a car by ID (License Plate)
     * @param id string
     * @returns Car or null
     */
    getCarByID: (id: string) => Promise<Car | null>;

    /**
     * createCar() creates a new car in the database
     * @param car Car object
     * @returns Car or null
     */
    createCar: (car: Car) => Promise<Car | null>;

    /**
     * updateCar() updates a car in the database
     * @param car Car object
     * @returns Car or null
     */
    updateCar: (car: Car) => Promise<Car | null>;

    /**
     * deleteCar() deletes a car from the database
     * @param id string
     * @returns void
     */
    deleteCar: (id: string) => Promise<void>;

    /**
     * getUserByEmail() gets a user by email
     * @param email string
     * @returns User or null
     */
    getUserByEmail: (email: string) => Promise<User | null>;

    /**
     * createUser() creates a new user in the database
     * @param user User object
     * @returns User or null
     */
    createUser: (user: User) => Promise<User | null>;

    /**
     * createReservation() creates a new reservation in the database
     * @param reservation Reservation object
     * @returns Reservation or null
     */
    createReservation: (reservation: Reservation) => Promise<Reservation | null>;

    /**
     * getUserReservations() gets all reservations of a user 
     * @param userID number
     * @returns Reservation[] by user id
     */
    getUserReservations: (userID: string) => Promise<Reservation[] | null>;

    /**
     * getCarReservations() gets all reservations of a car
     * @param carID string
     * @returns Reservation[] by car id
     */
    getCarReservations: (carID: string) => Promise<Reservation[]>;

    /**
     * deleteReservation() deletes a reservation from database
     * @param reservationID string
     * @returns true or false
     */
    deleteReservation: (reservationID: number) => Promise<boolean>;

    /**
     * deleteReservation() deletes a location from database
     * @param id number
     * @returns void
     */
    deleteLocation: (id: number) => Promise<void>;

    /**
    * getLocations() gets all locations
    * @returns locations
    */
    getLocations: () => Promise<CarLocation[]>;

    /**
     * getLocationByID() gets a location by ID
     * @param id number
     * @returns location or null
     */
    getLocationByID: (id: number) => Promise<CarLocation | null>;

    /**
    * updateLocation() updates a location in the database
    * @param carLocation location object
    * @returns updated location
    */
    updateLocation: (carLocation: CarLocation) => Promise<CarLocation[] | null>;


    /**
    * createLocation() updates a location in the database
    * @param carLocation Location object
    * @returns created location
    */
    createLocation: (carLocation: CarLocation) => Promise<CarLocation[] | null>;

    /**
     * createPayment() creates a new payment in the database
     */
    createPayment: (payment: Payment) => Promise<Payment | null>;

    /**
     * getUserPayments() gets all payments of a user
     * @param userID string
     * @returns Payment[] by user id
     */
    getUserPayments: (userID: string) => Promise<PaymentWithDetails[] | null>;

    /**
     * getCarMakes() gets all car makes
     * @returns string[] of car makes
     */
    getCarMakes: () => Promise<string[]>;

    /**
     * getCarMakeModels() gets all car models by make
     * @param make string
     * @returns string[] of car models
     */
    getCarMakeModels: (make: string) => Promise<string[]>;

    /**
     * getCarColors() gets all car colors
     * @returns string[] of car colors
     */
    getCarColors: () => Promise<string[]>;
}

export default DatabaseRepository;
