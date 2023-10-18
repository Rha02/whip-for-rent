import { Car, User } from '@/models';
import DatabaseRepository from './repository';
import { Connection } from 'mysql2/promise';

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
            INSERT INTO cars (id, make, model, year, color, price, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [car.id, car.make, car.model, car.year, car.color, car.price, car.image_url]);
        
        // Run SQL query to get the newly created car
        const [ rows ] = await db.query('SELECT * FROM cars WHERE id = ?', [car.id]);

        const cars = rows as Car[];

        return cars[0] || null;
    };

    const updateCar = async (car: Car): Promise<Car | null> => {
        // Run SQL query to update a car
        await db.query(`
            UPDATE cars
            SET make = ?, model = ?, year = ?, color = ?, price = ?, image_url = ?, updated_at = NOW()
            WHERE id = ?
        `, [car.make, car.model, car.year, car.color, car.price, car.image_url, car.id]);

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
        const [ row ] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        const user = row as User[];

        return user[0] || null;
    };

    const createUser = async (user: User): Promise<User | null> => {
        // Run SQL query to create a new user
        await db.query(`INSERT INTO users (id, email, firstName, lastName, password, createdAt, updatedAt, access_level)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        `, [user.id, user.email, user.firstName, user.lastName, user.password, user.createdAt, user.updatedAt, user.access_level]);

        // Run SQL query to get the newly created user
        const [ row ] = await db.query(`SELECT * FROM users WHERE id = ?`, [user.id]);

        const retrievedUser = row as User[];

        return retrievedUser[0] || null;
    };

    return {
        getCars,
        getCarByID,
        createCar,
        updateCar,
        deleteCar,
        getUserByEmail,
        getUserByID: async (id) => {
            const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);

            console.log(user);

            return {
                id: 1,
                email: 'bruce@wayne.loc',
                password: 'password',
                firstName: 'Bruce',
                lastName: 'Wayne',
                createdAt: new Date(),
                updatedAt: new Date(),
                access_level: 3
            };
        },
        createUser
    };
};

export default NewMySQLRepo;
