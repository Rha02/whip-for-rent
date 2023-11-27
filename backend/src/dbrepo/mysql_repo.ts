import { Car, Reservation, User, CarLocation } from '@/models';
import DatabaseRepository from './repository';
import { Connection, ResultSetHeader } from 'mysql2/promise';

// export function to create a new repository
const NewMySQLRepo = (db: Connection): DatabaseRepository => {
    db.ping();

    // Car Queries
    const getCars = async (): Promise<Car[]> => {
        // Run SQL query to get all cars
        const [ rows ] = await db.query('SELECT * FROM cars ORDER BY updated_at DESC');

        const cars = rows as Car[];

        return cars;
    };

    const getCarByID = async (id: string): Promise<Car | null> => {
        // Run SQL query to get a car by id
        const [ rows ] = await db.query('SELECT * FROM cars WHERE id = ?', [id]);

        const cars = rows as Car[];

        return cars[0] || null;
    };

    const createCar = async (car: Car): Promise<Car | null> => {
        // Run SQL query to create a new car
        await db.query(`
            INSERT INTO cars (id, make, model, year, color, price, image_name, location_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [car.id, car.make, car.model, car.year, car.color, car.price, car.image_name, car.location_id]);
        
        // Run SQL query to get the newly created car
        const [ rows ] = await db.query('SELECT * FROM cars WHERE id = ?', [car.id]);

        const cars = rows as Car[];

        return cars[0] || null;
    };

    const updateCar = async (car: Car): Promise<Car | null> => {
        // Run SQL query to update a car
        await db.query(`
            UPDATE cars
            SET make = ?, model = ?, year = ?, color = ?, price = ?, image_name = ?, location_id = ?, updated_at = NOW()
            WHERE id = ?
        `, [car.make, car.model, car.year, car.color, car.price, car.image_name, car.location_id, car.id]);

        // Run SQL query to get the updated car
        const [ rows ] = await db.query('SELECT * FROM cars WHERE id = ?', [car.id]);

        const cars = rows as Car[];

        return cars[0] || null;
    };

    const deleteCar = async (id: string): Promise<void> => {
        // Run SQL query to delete a car
        await db.query('DELETE FROM cars WHERE id = ?', [id]);
    };

    // User Queries
    const getUserByEmail = async (email: string) : Promise<User | null> => {
        // Run SQL query to get user by email
        const [ rows ] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        const users = rows as User[];

        return users[0] || null;
    };

    const createUser = async (user: User): Promise<User | null> => {
        // Run SQL query to create a new user
        await db.query(`INSERT INTO users (id, email, first_name, last_name, password, access_level)
                        VALUES (?, ?, ?, ?, ?, ?)
                        `, [user.id, user.email, user.first_name, user.last_name, user.password, user.access_level]);

        // Run SQL query to get the newly created user
        const [ rows ] = await db.query(`SELECT * FROM users WHERE id = ?`, [user.id]);

        const retrievedUser = rows as User[];

        return retrievedUser[0] || null;
    };

    // Reservation Queries
    const createReservation = async (reservation: Reservation): Promise<Reservation | null> => {
        // Run SQL query to create a new reservation 
        await db.query(`INSERT INTO reservations (user_id, car_id, start_date, end_date)
                        VALUES (?, ?, ?, ?)
                        `, [reservation.user_id, reservation.car_id, reservation.start_date, reservation.end_date]);
        
        // Run SQL query to get the newly created reservation
        const [ rows ] = await db.query(`SELECT * FROM reservations 
                                         WHERE user_id = ? AND car_id = ? AND start_date = ? AND end_date = ?
                                         `, [reservation.user_id, reservation.car_id, reservation.start_date, reservation.end_date]);

        const reservations = rows as Reservation[];

        return reservations[0] || null;
    };

    const getUserReservations = async (userID: string): Promise<Reservation[] | null> => {
        // Run SQL query to get reservations by user id
        const [ rows ] = await db.query(`SELECT * FROM reservations WHERE user_id = ?`, [userID]);
        
        const reservations = rows as Reservation[];

        return reservations || null;
    };

    const getCarReservations = async (carID: string): Promise<Reservation[]> => {
        // Run SQL query to get reservations by car id
        const [ rows ] = await db.query(`SELECT * FROM reservations WHERE car_id = ?`, [carID]);
        
        const reservations = rows as Reservation[];
        
        return reservations;
    };

    const deleteReservation = async (reservationID: number): Promise<boolean> => {
        // Run SQL query to delete a reservation
        const [ rows ] = await db.query(`DELETE FROM reservations WHERE id = ?`, reservationID);
        
        const { affectedRows } = rows as ResultSetHeader;

        return affectedRows === 1 ? true : false;
    };

    // Location Queries
    const getLocations = async (): Promise<CarLocation[]> => {
        // Run SQL query to get all locations
        const [ rows ] = await db.query('SELECT * FROM car_locations');

        const locations = rows as CarLocation[];

        return locations;
    };

    const getLocationByID = async (id: number): Promise<CarLocation | null> => {
        // Run SQL query to get a location by id
        const [ rows ] = await db.query('SELECT * FROM car_locations WHERE id = ?', [id]);

        const locations = rows as CarLocation[];

        return locations[0] || null;
    };
 
    const deleteLocation = async (id: number): Promise<void> => {
        // Delete all cars with the deleted location id
        await db.query('DELETE FROM cars WHERE location_id = ?', [id]);

        // Delete the location
        await db.query('DELETE FROM car_locations WHERE id = ?', [id]);
    };

    const updateLocation =async (CarLocation:CarLocation): Promise<CarLocation[] | null> => {
        await db.query('UPDATE car_locations SET city = ? WHERE id = ?', [CarLocation.city, CarLocation.id]);

        // Run SQL query to get the updated car
        const [ rows ] = await db.query('SELECT * FROM car_locations WHERE id = ?', [CarLocation.id]);

        const locations = rows as CarLocation[];

        return locations || null;
    };
    
    const createLocation = async (CarLocation:CarLocation): Promise<CarLocation[] | null> => {
        await db.query('INSERT INTO car_locations (city) VALUES (?)', [CarLocation.city]);
        
        // Run SQL query to get the updated car
        const [ rows ] = await db.query('SELECT * FROM car_locations WHERE city = ?', [CarLocation.city]);

        const locations = rows as CarLocation[];

        return locations || null;
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
        getLocations,
        getLocationByID,
        deleteLocation,
        updateLocation,
        createLocation
    };
};

export default NewMySQLRepo;
