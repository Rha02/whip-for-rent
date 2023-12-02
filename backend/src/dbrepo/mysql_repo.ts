import { Car, Reservation, User, CarLocation, Payment } from '@/models';
import DatabaseRepository from './repository';
import { Connection, ResultSetHeader } from 'mysql2/promise';
import { GetCarsFilter, PaymentWithDetails } from '@/types';

// export function to create a new repository
const NewMySQLRepo = (db: Connection): DatabaseRepository => {
    db.ping();

    // Car Queries
    const getCars = async (filter?: GetCarsFilter): Promise<Car[]> => {
        // Build SQL query
        const conditions: string[] = [];
        if (filter?.make) {
            conditions.push(`make = '${filter.make}'`);
        }
        if (filter?.model) {
            conditions.push(`model = '${filter.model}'`);
        }
        if (filter?.color) {
            conditions.push(`color = '${filter.color}'`);
        }
        if (filter?.year) {
            conditions.push(`year = ${filter.year}`);
        }
        if (filter?.location) {
            conditions.push(`location_id = ${filter.location}`);
        }
        if (filter?.start_date && filter?.end_date) {
            const startDate = new Date(filter.start_date).toISOString().substring(0, 10);
            const endDate = new Date(filter.end_date).toISOString().substring(0, 10);
            conditions.push(`id NOT IN (SELECT car_id FROM reservations WHERE start_date BETWEEN '${startDate}' AND '${endDate}' OR end_date BETWEEN '${startDate}' AND '${endDate}')`);
        } else if (filter?.start_date) {
            const startDate = new Date(filter.start_date).toISOString().substring(0, 10);
            conditions.push(`id NOT IN (SELECT car_id FROM reservations WHERE start_date <= '${startDate}' AND end_date >= '${startDate}')`);
        } else if (filter?.end_date) {
            const endDate = new Date(filter.end_date).toISOString().substring(0, 10);
            conditions.push(`id NOT IN (SELECT car_id FROM reservations WHERE start_date <= '${endDate}' AND end_date >= '${endDate}')`);
        }

        let query = 'SELECT * FROM cars';
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        query += ' ORDER BY updated_at DESC';

        // Run SQL query to get all cars
        const [rows] = await db.query(query);

        const cars = rows as Car[];

        return cars;
    };

    const getCarByID = async (id: string): Promise<Car | null> => {
        // Run SQL query to get a car by id
        const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [id]);

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
        const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [car.id]);

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
        const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [car.id]);

        const cars = rows as Car[];

        return cars[0] || null;
    };

    const deleteCar = async (id: string): Promise<void> => {
        // Run SQL query to delete a car
        await db.query('DELETE FROM cars WHERE id = ?', [id]);
    };

    // User Queries
    const getUserByEmail = async (email: string): Promise<User | null> => {
        // Run SQL query to get user by email
        const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        const users = rows as User[];

        return users[0] || null;
    };

    const createUser = async (user: User): Promise<User | null> => {
        // Run SQL query to create a new user
        await db.query(`INSERT INTO users (id, email, first_name, last_name, password, access_level)
                        VALUES (?, ?, ?, ?, ?, ?)
                        `, [user.id, user.email, user.first_name, user.last_name, user.password, user.access_level]);

        // Run SQL query to get the newly created user
        const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [user.id]);

        const retrievedUser = rows as User[];

        return retrievedUser[0] || null;
    };

    // Reservation Queries
    const createReservation = async (reservation: Reservation): Promise<Reservation | null> => {
        // Run SQL query to create a new reservation 
        const res = await db.query(`
            INSERT INTO reservations (user_id, car_id, start_date, end_date) VALUES (?, ?, ?, ?)
            `, [reservation.user_id, reservation.car_id, reservation.start_date, reservation.end_date]);
        
        // Get the id of the newly created reservation
        const reservationID = (res[0] as ResultSetHeader).insertId;

        // Run SQL query to get the newly created reservation
        const [rows] = await db.query(`SELECT * FROM reservations WHERE id = ?`, [reservationID]);

        const reservations = rows as Reservation[];

        return reservations[0] || null;
    };

    const getUserReservations = async (userID: string): Promise<Reservation[] | null> => {
        // Run SQL query to get reservations by user id
        const [rows] = await db.query(`SELECT * FROM reservations WHERE user_id = ?`, [userID]);

        const reservations = rows as Reservation[];

        return reservations || null;
    };

    const getCarReservations = async (carID: string): Promise<Reservation[]> => {
        // Run SQL query to get reservations by car id
        const [rows] = await db.query(`SELECT * FROM reservations WHERE car_id = ?`, [carID]);

        const reservations = rows as Reservation[];

        return reservations;
    };

    const deleteReservation = async (reservationID: number): Promise<boolean> => {
        // Run SQL query to delete a reservation
        const [rows] = await db.query(`DELETE FROM reservations WHERE id = ?`, reservationID);

        const { affectedRows } = rows as ResultSetHeader;

        return affectedRows === 1 ? true : false;
    };

    // Location Queries
    const getLocations = async (): Promise<CarLocation[]> => {
        // Run SQL query to get all locations
        const [rows] = await db.query('SELECT * FROM car_locations');

        const locations = rows as CarLocation[];

        return locations;
    };

    const getLocationByID = async (id: number): Promise<CarLocation | null> => {
        // Run SQL query to get a location by id
        const [rows] = await db.query('SELECT * FROM car_locations WHERE id = ?', [id]);

        const locations = rows as CarLocation[];

        return locations[0] || null;
    };

    const deleteLocation = async (id: number): Promise<void> => {
        // Delete all cars with the deleted location id
        await db.query('DELETE FROM cars WHERE location_id = ?', [id]);

        // Delete the location
        await db.query('DELETE FROM car_locations WHERE id = ?', [id]);
    };

    const updateLocation = async (CarLocation: CarLocation): Promise<CarLocation[] | null> => {
        await db.query('UPDATE car_locations SET city = ? WHERE id = ?', [CarLocation.city, CarLocation.id]);

        // Run SQL query to get the updated car
        const [rows] = await db.query('SELECT * FROM car_locations WHERE id = ?', [CarLocation.id]);

        const locations = rows as CarLocation[];

        return locations || null;
    };

    const createLocation = async (CarLocation: CarLocation): Promise<CarLocation[] | null> => {
        await db.query('INSERT INTO car_locations (city) VALUES (?)', [CarLocation.city]);

        // Run SQL query to get the updated car
        const [rows] = await db.query('SELECT * FROM car_locations WHERE city = ?', [CarLocation.city]);

        const locations = rows as CarLocation[];

        return locations || null;
    };

    const createPayment = async (payment: Payment): Promise<Payment | null> => {
        // Run SQL query to create a new payment
        await db.query(`
            INSERT INTO payments (reservation_id, amount, due_date, status)
            VALUES (?, ?, ?, ?)
        `, [payment.reservation_id, payment.amount, payment.due_date, payment.status]);

        return payment;
    };

    const getUserPayments = async (userID: string): Promise<PaymentWithDetails[] | null> => {
        // Run SQL query to get payments by user id
        const [rows] = await db.query(
            `SELECT r.id, p.amount, p.status, p.due_date, r.car_id, r.start_date, r.end_date FROM payments p
            LEFT JOIN reservations r ON p.reservation_id = r.id
            WHERE r.user_id = ?`, 
            [userID]
        );

        const payments = rows as PaymentWithDetails[];

        return payments || null;
    };

    const getCarMakes = async (): Promise<string[]> => {
        // Run SQL query to get all car makes
        const [rows] = await db.query('SELECT DISTINCT make FROM cars');

        type Make = {
            make: string;
        }

        const carMakes = rows as Make[];

        return carMakes.map((carMake) => carMake.make);
    };

    const getCarMakeModels = async (make: string): Promise<string[]> => {
        // Run SQL query to get all car models by make
        const [rows] = await db.query('SELECT DISTINCT model FROM cars WHERE make = ?', [make]);

        type Model = {
            model: string;
        }

        const carModels = rows as Model[];

        return carModels.map((carModel) => carModel.model);
    };

    const getCarColors = async (): Promise<string[]> => {
        // Run SQL query to get all car colors
        const [rows] = await db.query('SELECT DISTINCT color FROM cars');

        type Color = {
            color: string;
        }

        const carColors = rows as Color[];

        return carColors.map((carColor) => carColor.color);
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
        createLocation,
        createPayment,
        getUserPayments,
        getCarMakes,
        getCarMakeModels,
        getCarColors
    };
};

export default NewMySQLRepo;
