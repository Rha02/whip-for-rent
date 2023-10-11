import { Car } from '@/models';
import DatabaseRepository from './repository';
import { Connection } from 'mysql2/promise';

// export function to create a new repository
const NewMySQLRepo = (db: Connection): DatabaseRepository => {
    db.ping();

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

    return {
        getCars,
        getCarByID,
        createCar,
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
                updatedAt: new Date()
            };
        }
    };
};

export default NewMySQLRepo;
