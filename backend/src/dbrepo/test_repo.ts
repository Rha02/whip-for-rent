import DatabaseRepository from './repository';

// export function to create a new repository
const NewTestRepo = (): DatabaseRepository => {
    return {
        getCarByID: async (id) => {
            console.log("The id is" + id);
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
            console.log("The id is" + id);
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

export default NewTestRepo;
