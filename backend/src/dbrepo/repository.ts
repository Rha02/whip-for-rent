import { Car, Reservation, User, car_location } from 'models';

interface DatabaseRepository {
    /**
    * getCars() returns a list of cars from the database
    * @returns {Promise<Car[]>} A list of cars
    */
    getCars: () => Promise<Car[]>;

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
    getCarReservations: (carID: string) => Promise<Reservation[] | null>;

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
     * createLocation() creates a new location in the database
     * @param location location object
     * @returns Reservation or null
     */
    // createLocation: (car_location: car_location) => Promise<car_location | null>;

     /**
     * getLocations() gets all locations
     * @returns locations
     */
     getLocations: () => Promise<car_location[]>;
}

export default DatabaseRepository;
