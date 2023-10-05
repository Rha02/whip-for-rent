import DatabaseRepository from './repository';
import { Connection } from 'mysql2/promise';

// export function to create a new repository
const NewMySQLRepo = (db: Connection): DatabaseRepository => {
    db.ping();
    return {
        getCarByID: async (id) => {
            const car = await db.query('SELECT * FROM cars WHERE id = ?', [id]);

            console.log(car);

            return {
                id: 1,
                make: 'Toyota',
                model: 'Camry',
                year: 2020,
                color: 'White',
                price: 25000,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        },
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
