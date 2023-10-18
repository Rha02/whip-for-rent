import { Car, User } from 'models';

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

    getUserByID: (id: number) => Promise<User | null>;

    /**
     * createUser() creates a new user in the database
     * @param user User object
     * @returns User or null
     */
    createUser: (user: User) => Promise<User | null>;
}

export default DatabaseRepository;
